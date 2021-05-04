import { compare, hash } from "bcryptjs";
import { verify } from "jsonwebtoken";
import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { createAccessKey, createRefreshKey } from "../../auth/auth";
import { isAuth } from "../../auth/middleware/isAuth";
import { sendRefreshKey } from "../../auth/sendRefreshKey";
import { Post } from "../../Entities/Post";
import { Users } from "../../Entities/Users";
import { MyContext } from "../../Types/MyContext";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  getAllPosts() {
    return Post.find({
      order: {
        datePublished: "DESC",
      },
    });
  }

  @Query(() => [Post])
  async getAllUserPosts(@Ctx() context: MyContext) {
    const authorization = context.req.headers["authorization"];
    console.log(authorization);

    if (!authorization) {
      console.log("You're not authorized");
      return null;
    }

    try {
      const token = authorization!.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_KEY!);
      const userId = payload.userId
      console.log("Your user id is:" + payload.userId);

      const qb = getConnection()
        .getRepository(Post)
        .createQueryBuilder("p")
        .innerJoinAndSelect("p.user", "u", "u.id = p.userID")
        .where("p.userID = :id", { id: payload.userId })
        .orderBy("p.datePublished", "DESC")
        
        const posts = await qb.getMany();
        return posts
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  @Mutation(() => Boolean)
  async createPost(
    @Ctx() context: MyContext,
    @Arg("content") content: string,
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("userName") userName: string,
    @Arg("datePublished") datePublished: Date
  ) {
    const authorization = context.req.headers["authorization"];
    console.log(authorization);

    try {
      const token = authorization!.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_KEY!);
      const userId = payload.userId
      console.log("Your user id is:" + payload.userId);
      // const firstName = payload?.
      // const lastName = payload?.userId
      // const userName = payload?.userId
      await Post.insert({
        userId: userId,
        content,
        firstName,
        lastName,
        userName,
        datePublished,
      });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePost(@Arg("postID", () => Int) postID: number) {
    await getConnection().getRepository(Post).delete({ postID: postID });
    return true;
  }
}
