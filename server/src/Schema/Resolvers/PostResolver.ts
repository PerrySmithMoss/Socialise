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
import { isAuth } from "../../auth/middleware/isAuth";
import { sendRefreshKey } from "../../auth/sendRefreshKey";
import { LikedPost } from "../../Entities/LikedPost";
import { Post } from "../../Entities/Post";
import { Users } from "../../Entities/Users";
import { MyContext } from "../../Types/MyContext";
import { Comment } from "../../Entities/Comment";
import { RetweetPost } from "../../Entities/RetweetPost";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async getAllPosts() {
    const posts = await Post.find({
      relations: [
        "likes",
        "retweets",
        "user",
        "user.profile",
        "comments",
        "comments.user",
        "comments.user.profile",
      ],
      order: {
        datePublished: "DESC",
      },
    });
    // console.log(posts)
    return posts;
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

      // const qb = getConnection()
      //   .getRepository(Post)
      //   .createQueryBuilder("p")
      //   .innerJoinAndSelect("p.user", "u", "u.id = p.userID")
      //   .where("p.userID = :id", { id: payload.userId })
      //   .orderBy("p.datePublished", "DESC");

      // const posts = await qb.getMany();
      const userPosts = await Post.find({
        relations: [
          "likes",
          "retweets",
          "user",
          "user.profile",
          "comments",
          "comments.user",
          "comments.user.profile",
        ],
        where: {
          userId: userId,
        },
        order: {
          datePublished: "DESC",
        },
      });
      console.log(userPosts);

      return userPosts;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  @Query(() => [Post])
  async getAllSpecificUserPosts(@Arg("userId", () => Int) userId: number) {
    try {
      const userPosts = await Post.find({
        relations: [
          "likes",
          "retweets",
          "user",
          "user.profile",
          "comments",
          "comments.user",
          "comments.user.profile",
        ],
        where: {
          userId: userId,
        },
        order: {
          datePublished: "DESC",
        },
      });

      return userPosts;
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
        console.log("User has already liked the post before");
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
          console.log("User has not liked the post before");
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
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async retweetPost(
    @Arg("postId", () => Int) postId: number,
    @Arg("value", () => Int) value: number,
    @Ctx() context: MyContext
  ) {
    const authorization = context.req.headers["authorization"];
    console.log(authorization);

    try {
      const token = authorization!.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_KEY!);
      const userId = payload.userId;
      console.log("Your user id is:" + payload.userId);

      const isLiked = value !== -1;
      console.log("isLiked: ", isLiked);
      const realValue = isLiked ? 1 : -1;
      console.log("realValue: ", realValue);

      const likedPost = await RetweetPost.findOne({
        where: { postId, userId },
      });

      // the user has retweeted the post before
      if (likedPost) {
        console.log("User has already retweeted the post before");
        await getConnection().transaction(async (trns) => {
          await trns.query(
            `
            DELETE FROM retweets
            WHERE postId = ${postId} AND userId = ${userId}
            `
          );
          await trns.query(
            `
            UPDATE posts
            SET retweetsCount = retweetsCount - 1
            WHERE id = ${postId}
            `
          );
        });
      } else if (!likedPost) {
        // user has not retweeted post
        await getConnection().transaction(async (trns) => {
          console.log("User has not retweeted the post before");
          await trns.query(
            `
            INSERT INTO retweets (userId, postId, value)
            VALUES (${userId}, ${postId}, ${realValue});
            `
          );
          await trns.query(
            `
            UPDATE posts 
            SET retweetsCount = retweetsCount + ${realValue}
            WHERE id = ${postId};
            `
          );
        });
      }
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async commentOnPost(
    @Arg("postId", () => Int) postId: number,
    @Arg("comment", () => String) comment: string,
    @Arg("datePublished") datePublished: Date,
    @Ctx() context: MyContext
  ) {
    const authorization = context.req.headers["authorization"];
    console.log(authorization);

    try {
      const token = authorization!.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_KEY!);
      const userId = payload.userId;
      console.log("Your user id is:" + payload.userId);

      //   await getConnection().transaction(async (trns) => {
      //       await trns.query(
      //         `
      //         INSERT INTO comments (userId, postId, comment)
      //         VALUES (${userId}, ${postId}, ${comment});
      //         `
      //       );
      //       await trns.query(
      //         `
      //         UPDATE posts
      //         SET commentsCount = commentsCount + 1
      //         WHERE id = ${postId};
      //         `
      //       );
      // });

      // const post = await Post.findOne({
      //   where: { postId },
      // });
      // await Post.update({id: postId}, commen)

      await Comment.insert({
        userId: userId,
        postId: postId,
        comment: comment,
        datePublished: datePublished,
      });

      await getConnection().query(
        `
          UPDATE posts 
          SET commentsCount = commentsCount + 1
          WHERE id = ${postId};
          `
      );
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}
