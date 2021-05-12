import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../../Types/MyContext";
import { verify } from "jsonwebtoken";
import { Users } from "../../Entities/Users";
import { Message } from "../../Entities/Message";
import { In, Not } from "typeorm";

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
      });

      // users = users.map(otherUser => {
      //   const latestMessage = allUserMessages.find(
      //     m => m.fromId === otherUser.id || m.to === otherUser.id
      //   )
      //   otherUser
      // })
      // console.log(messagesFromUser);

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
          dateSent: "DESC",
        },
      });

      return messages;
    } catch (err) {
      console.log(err);
    }
  }

  @Mutation(() => Boolean)
  // @UseMiddleware(isAuth)
  async sendMessage(
    @Arg("toId", () => Int) toId: number,
    // @Arg("fromId", () => Int) fromId: number,
    @Arg("dateSent") dateSent: Date,
    @Arg("content", () => String) content: string
    // @Ctx() context: MyContext
  ) {
    // const authorization = context.req.headers["authorization"];
    // console.log(authorization);

    try {
      // const token = authorization!.split(" ")[1];
      // const payload: any = verify(token, process.env.ACCESS_KEY!);
      // const userId = payload.userId;
      // console.log("Your user id is:" + payload.userId);

      const recipient = await Users.findOne({ where: { id: toId } });

      if (!recipient) {
        throw new Error("User not found...");
      }
      // else if(recipient.id === 18) {
      //   throw new Error("You cannot message yourself")
      // }

      if (content.trim() === "") {
        throw new Error("Message is empty...");
      }

      await Message.insert({
        fromId: 17,
        toId: toId,
        dateSent: dateSent,
        content: content,
      });
    } catch (err) {
      console.log(err);
    }
    return true;
  }
}
