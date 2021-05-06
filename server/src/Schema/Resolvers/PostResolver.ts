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
import { createQueryBuilder, getConnection } from "typeorm";
import { createAccessKey, createRefreshKey } from "../../auth/auth";
import { isAuth } from "../../auth/middleware/isAuth";
import { sendRefreshKey } from "../../auth/sendRefreshKey";
import { LikedPost } from "../../Entities/LikedPost";
import { Post } from "../../Entities/Post";
import { Users } from "../../Entities/Users";
import { MyContext } from "../../Types/MyContext";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async getAllPosts() {
    const posts = await Post.find({relations: ['likes'],
      order: {
        datePublished: "DESC",
      },
    });

    console.log(posts)
    return posts
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
      const userId = payload.userId;
      console.log("Your user id is:" + payload.userId);

      const qb = getConnection()
        .getRepository(Post)
        .createQueryBuilder("p")
        .innerJoinAndSelect("p.user", "u", "u.id = p.userID")
        .where("p.userID = :id", { id: payload.userId })
        .orderBy("p.datePublished", "DESC");

      const posts = await qb.getMany();
      return posts;
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
      const userId = payload.userId;
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
    await getConnection().getRepository(Post).delete({ id: postID });
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async likePost(
    @Arg("postId", () => Int) postId: number,
    @Arg("value", () => Int) value: number,
    @Ctx() context: MyContext
  ) {
    const authorization = context.req.headers["authorization"];
    // console.log(authorization);

    try {
      const token = authorization!.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_KEY!);
      const userId = payload.userId;
      console.log("Your user id is:" + payload.userId);

      const isLiked = value !== -1;
      console.log("isLiked: ", isLiked);
      const realValue = isLiked ? 1 : -1;
      console.log("realValue: ", realValue);

      const likedPost = await LikedPost.findOne({
        where: { postId, userId },
      });

      // the user has liked the post before
      if (likedPost) {
        console.log("User has already liked the post before")
        await getConnection().transaction(async (trns) => {
          await trns.query(
            `
            DELETE FROM liked_posts
            WHERE postId = ${postId} AND userId = ${userId}
            `
          );
          await trns.query(
            `
            UPDATE posts
            SET points = points - 1
            WHERE id = ${postId}
            `
          );
        });
      } else if (!likedPost) {
        // user has not liked post
        await getConnection().transaction(async (trns) => {
        console.log("User has not liked the post before")
          await trns.query(
            `
            INSERT INTO liked_posts (userId, postId, value)
            VALUES (${userId}, ${postId}, ${realValue});
            `
          );
          await trns.query(
            `
            UPDATE posts 
            SET points = points + ${realValue}
            WHERE id = ${postId};
            `
          );
        });
      }

      // await getConnection().query(
      //   `
      //   START TRANSACTION

      //   INSERT INTO liked_posts (userId, postId, value)
      //   VALUES (${17}, ${postId}, ${realValue});

      //   UPDATE posts
      //   SET points = points + ${realValue}
      //   WHERE id = ${postId};

      //   COMMIT
      //   `
      // )
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}
