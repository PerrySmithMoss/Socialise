import { verify } from "jsonwebtoken";
import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { isAuth } from "../../auth/middleware/isAuth";
import { LikedPost } from "../../Entities/LikedPost";
import { Post } from "../../Entities/Post";
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

    if (!authorization) {
      console.log("You're not authorized");
      return null;
    }

    try {
      const token = authorization!.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_KEY!);
      const userId = payload.userId;

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

  @Query(() => Post)
  async getPostById(@Arg("postId", () => Int) postId: number) {
    try {
      const post = await Post.findOne({
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
          id: postId,
        },
      });

      if (!post) {
        return null;
      }

      return post;
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
    @Arg("datePublished") datePublished: string
  ) {
    const authorization = context.req.headers["authorization"];

    try {
      const token = authorization!.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_KEY!);
      const userId = payload.userId;

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

    try {
      const token = authorization!.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_KEY!);
      const userId = payload.userId;

      const isLiked = value !== -1;

      const realValue = isLiked ? 1 : -1;

      const likedPost = await LikedPost.findOne({
        where: { postId, userId },
      });

      // the user has liked the post before
      if (likedPost) {
        await getConnection().transaction(async (trns) => {
          await trns.query(
            `
            DELETE FROM liked_posts
            WHERE "postId" = ${postId} AND "userId" = ${userId}
            `
          );
          await trns.query(
            `
            UPDATE posts
            SET "points" = "points" - 1
            WHERE "id" = ${postId}
            `
          );
        });
      } else if (!likedPost) {
        // user has not liked post
        await getConnection().transaction(async (trns) => {
          await trns.query(
            `
            INSERT INTO liked_posts ("userId", "postId", "value")
            VALUES (${userId}, ${postId}, ${realValue});
            `
          );
          await trns.query(
            `
            UPDATE posts 
            SET "points" = "points" + ${realValue}
            WHERE "id" = ${postId};
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

    try {
      const token = authorization!.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_KEY!);
      const userId = payload.userId;

      const isLiked = value !== -1;
      const realValue = isLiked ? 1 : -1;

      const likedPost = await RetweetPost.findOne({
        where: { postId, userId },
      });

      // the user has retweeted the post before
      if (likedPost) {
        await getConnection().transaction(async (trns) => {
          await trns.query(
            `
            DELETE FROM retweets
            WHERE "postId" = ${postId} AND "userId" = ${userId}
            `
          );
          await trns.query(
            `
            UPDATE posts
            SET "retweetsCount" = "retweetsCount" - 1
            WHERE "id" = ${postId}
            `
          );
        });
      } else if (!likedPost) {
        // user has not retweeted post
        await getConnection().transaction(async (trns) => {
          await trns.query(
            `
            INSERT INTO retweets ("userId", "postId", "value")
            VALUES (${userId}, ${postId}, ${realValue});
            `
          );
          await trns.query(
            `
            UPDATE posts 
            SET "retweetsCount" = "retweetsCount" + ${realValue}
            WHERE "id" = ${postId};
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
    @Arg("datePublished") datePublished: string,
    @Ctx() context: MyContext
  ) {
    const authorization = context.req.headers["authorization"];

    try {
      const token = authorization!.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_KEY!);
      const userId = payload.userId;

      await Comment.insert({
        userId: userId,
        postId: postId,
        comment: comment,
        datePublished: datePublished,
      });

      await getConnection().query(
        `
          UPDATE posts 
          SET "commentsCount" = "commentsCount" + 1
          WHERE "id" = ${postId};
          `
      );
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}
