import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
  PubSubEngine,
  PubSub,
  UseMiddleware,
  Root,
  ObjectType,
  Field,
} from "type-graphql";
import { MyContext } from "../../Types/MyContext";
import { verify } from "jsonwebtoken";
import { Users } from "../../Entities/Users";
import { Message } from "../../Entities/Message";
import { getManager, In } from "typeorm";
import { isAuth } from "../../auth/middleware/isAuth";

@ObjectType()
class allUserMessages {
  @Field(() => Int)
  id: number

  @Field(() => String)
  content: string

  @Field(() => String)
  dateSent: string

  @Field(() => Int)
  fromId: number

  @Field(() => Int)
  toId: number

  @Field(() => String)
  sender_firstName: string

  @Field(() => String)
  sender_lastName: string

  @Field(() => String)
  sender_username: string

  @Field(() => String)
  receiver_firstName: string

  @Field(() => String)
  receiver_lastName: string

  @Field(() => String)
  receiver_username: string

  @Field(() => String)
  sender_avatar: string

  @Field(() => String)
  receiver_avatar: string
}

@Resolver()
export class MessageResolver {
  @Query(() => [allUserMessages])
  async getAllUserMessages(@Ctx() context: MyContext) {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
      return null;
    }

    try {
      const token = authorization!.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_KEY!);
      const userId = payload.userId;

      const entityManager = getManager();

      const query = await entityManager.query(`
              SELECT  
              m.*,     
              s."firstName" AS "sender_firstName", 
              s."lastName" AS "sender_lastName",
              s."username" AS "sender_username",
              r."firstName" AS "receiver_firstName", 
              r."lastName" AS "receiver_lastName",
              r."username" AS "receiver_username",
              sp."avatar" AS "sender_avatar",
              rp."avatar" AS "receiver_avatar"
              FROM "messages" m
              INNER JOIN "users" s ON s."id" = m."fromId"
              INNER JOIN "users" r ON r."id" = m."toId"
              INNER JOIN "profile" sp ON sp."id" = m."fromId"
              INNER JOIN "profile" rp ON rp."id" = m."toId"
              JOIN (SELECT CASE WHEN "fromId" = ${userId}
              THEN "toId" ELSE "fromId" END AS "other", MAX("dateSent") AS "latest"
              FROM "messages"
              WHERE "fromId" = ${userId} OR "toId" = ${userId}
              GROUP BY "other") a
              ON (m."fromId" = ${userId} AND m."toId" = a."other" OR m."toId" = ${userId}
              AND m."fromId" = a."other") AND m."dateSent" = a."latest"
              ORDER BY "dateSent" DESC;
      `);

      return query;
    } catch (err) {
      console.log(err);
    }
  }

  @Query(() => [Message])
  async getAllMessagesFromUser(
    @Ctx() context: MyContext,
    @Arg("fromId", () => Int) fromId: number
  ) {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
      // console.log("You're not authorized");
      return null;
    }

    try {
      const token = authorization!.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_KEY!);
      const userId = payload.userId;

      const otherUser = await Users.findOne({
        where: { id: fromId },
      });

      if (!otherUser) {
        throw new Error("User not found");
      }

      const messages = await Message.find({
        where: [
          {
            fromId: In([userId, fromId]),
            toId: In([userId, fromId]),
          },
        ],
        relations: ["from", "from.profile", "to", "to.profile"],
        order: {
          dateSent: "ASC",
        },
      });

      return messages;
    } catch (err) {
      console.log(err);
    }
  }

  @Mutation(() => Message)
  @UseMiddleware(isAuth)
  async sendMessage(
    @Arg("toId", () => Int) toId: number,
    @Arg("dateSent", () => String) dateSent: string,
    @Arg("content", () => String) content: string,
    // @PubSub() pubsub: PubSubEngine,
    @Ctx() context: MyContext
  ) {
    const authorization = context.req.headers["authorization"];
    try {
      const token = authorization!.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_KEY!);
      const userId = payload.userId;

      const recipient = await Users.findOne({ where: { id: toId } });

      if (!recipient) {
        throw new Error("User not found...");
      }

      if (content.trim() === "") {
        throw new Error("Message is empty...");
      }

      const sentMessage = await Message.create({
        fromId: userId,
        toId: toId,
        dateSent: dateSent,
        content: content,
      }).save();

      // console.log(sentMessage)
      // pubsub.publish("NEW_MESSAGE", sentMessage);

      return sentMessage;
    } catch (err) {
      console.log(err);
    }
    // return true;
  }

  @Subscription({
    topics: "NEW_MESSAGE",
    // filter: ({payload, args}) => payload.toId === args.toId ? true : false
  })
  newMessage(@Root() sentMessage: Message): Message {
    return sentMessage;
  }
}
