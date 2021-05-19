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
import { getRepository, In, Not } from "typeorm";
import { isAuth } from "../../auth/middleware/isAuth";

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

      const allUserMessages = await Message.find({
        relations: ["from", "from.profile", "to", "to.profile"],
        where: [
          {
            toId: userId,
          },
          {
            fromId: userId,
          },
        ],
        order: {
          dateSent: "DESC",
        },
        // take: 1
      });

      // let fromIds = allUserMessages.map((o) => o.fromId);
      // console.log(fromIds);

      let toIds = allUserMessages.map((o) => o.toId);
      // console.log(toIds);

      // 1. Loops through allUserMessages
      // 2. Starting from the 2nd element in the toIds array
      // 3. Checks if current message.fromId is NOT in the array of remaining toIds
      // 5. If true then remove the message, if false leave the message in array

      // Array.filter() removes all duplicate objects by checking if the previously mapped 
      // id-array includes the current id ({id} destructs the object into only its id). 
      // To only filter out actual duplicates, it is using Array.includes()'s second parameter 
      // fromIndex with index + 1 which will ignore the current object and all previous.
      let filtered = allUserMessages.filter(
        (message, index) => !toIds.includes(message.fromId, index + 1)
      );

      return filtered;
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

      const sentMessage = await Message.create({
        fromId: userId,
        toId: toId,
        dateSent: dateSent,
        content: content,
      }).save();

      // console.log(sentMessage)
      pubsub.publish("NEW_MESSAGE", sentMessage);

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
