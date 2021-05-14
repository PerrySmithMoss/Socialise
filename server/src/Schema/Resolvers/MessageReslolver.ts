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
} from "type-graphql";
import { MyContext } from "../../Types/MyContext";
import { verify } from "jsonwebtoken";
import { Users } from "../../Entities/Users";
import { Message } from "../../Entities/Message";
import { In, Not } from "typeorm";
import { isAuth } from "../../auth/middleware/isAuth";

// import { PubSub } from "apollo-server-express";

// const pubsub = new PubSub();

@Resolver()
export class MessageResolver {
  @Query(() => [Message])
  async getAllUserMessages(@Ctx() context: MyContext) {
    const authorization = context.req.headers["authorization"];
    console.log(authorization);

    if (!authorization) {
      console.log("You're not authorized");
      return null;
    }

    try {
      const token = authorization!.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_KEY!);
      const userId = payload.userId;
      console.log("Your user id is:" + payload.userId);

      // let users = await Users.find({
      //   where: { id: Not(userId) }
      // })

      const allUserMessages = await Message.find({
        relations: ["from", "from.profile", "to", "to.profile"],
        where: [
          {
            toId: userId,
          },
        ],
        order: {
          dateSent: "DESC",
        },
        take: 1
      });

      return allUserMessages;
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
    console.log(authorization);

    if (!authorization) {
      console.log("You're not authorized");
      return null;
    }

    try {
      const token = authorization!.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_KEY!);
      const userId = payload.userId;
      console.log("Your user ID is:" + payload.userId);
      console.log("From ID is:" + fromId);

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
          },
          {
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
    @Arg("dateSent") dateSent: Date,
    @Arg("content", () => String) content: string,
    @PubSub() pubsub: PubSubEngine,
    @Ctx() context: MyContext
  ) {
    const authorization = context.req.headers["authorization"];
    console.log(authorization);
    try {
      const token = authorization!.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_KEY!);
      const userId = payload.userId;
      console.log("Your user id is:" + payload.userId);

      const recipient = await Users.findOne({ where: { id: toId } });

      if (!recipient) {
        throw new Error("User not found...");
      }

      if (content.trim() === "") {
        throw new Error("Message is empty...");
      }

      const sentMessage = await Message.create
      ({
        fromId: userId,
        toId: toId,
        dateSent: dateSent,
        content: content,
      }).save();
      
      // console.log(sentMessage)
      pubsub.publish("NEW_MESSAGE", sentMessage );

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
