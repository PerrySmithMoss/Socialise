import { compare, hash } from "bcryptjs";
import { verify } from "jsonwebtoken";
import crypto from "crypto";
import path from "path";
import fs from "fs";
import {
  Arg,
  Ctx,
  Field,
  InputType,
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
import { Profile } from "../../Entities/Profile";
import { Users } from "../../Entities/Users";
import { MyContext } from "../../Types/MyContext";
import { GraphQLUpload, FileUpload } from "graphql-upload";
import { Following } from "../../Entities/Following";

@InputType()
class ProfileUpdateInput {
  @Field(() => String, { nullable: true })
  bio?: string;

  @Field(() => String, { nullable: true })
  location?: string;

  @Field(() => String, { nullable: true })
  website?: string;

  @Field(() => String, { nullable: true })
  avatar?: string;
}

@ObjectType()
class LoginResponse {
  @Field()
  accessToken!: string;
  @Field(() => Users)
  user!: Users;
}

@ObjectType()
class ImageUploadResponse {
  @Field()
  url!: string;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return "Hello!";
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: MyContext) {
    console.log("Payload:" + payload);
    return `Your user ID is: ${payload!.userId}`;
  }

  @Query(() => [Users])
  async getAllUsers() {
    return await Users.find({ relations: ["profile"] });
  }

  @Query(() => Users)
  // @UseMiddleware(isAuth)
  async getSpecificUserInfo(@Arg("userId", () => Int) userId: number) {
    return await Users.findOne(userId, {
      relations: ["profile", "following", "follower"],
    });
  }

  @Query(() => Users, { nullable: true })
  async getCurrentUser(@Ctx() context: MyContext) {
    const authorization = context.req.headers["authorization"];
    console.log(authorization);

    if (!authorization) {
      console.log("You're not authorized");
      return null;
    }

    try {
      const token = authorization.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_KEY!);
      console.log("Your payload is:" + payload);

      // const user = await Users.findOne(16, {relations: ["profile"]})
      // console.log(user)
      return await Users.findOne(payload.userId, {
        relations: ["profile", "following", "follower"],
      });

      // const qb = getConnection()
      // .getRepository(Users)
      // .createQueryBuilder("user")
      // .leftJoinAndSelect("user.profile", "profile", "profile.id = profile.userId")
      // .where("user.id = :id", { id: payload.userId })

      // const user = await qb.getOneOrFail();
      // console.log(user)
      // return user
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  @Mutation(() => Boolean)
  async updateProfile(
    @Arg("userId", () => Int) userId: number,
    @Arg("input", () => ProfileUpdateInput) input: ProfileUpdateInput
  ) {
    try {
      const user = await Users.findOneOrFail(userId, {
        relations: ["profile"],
      });

      await Profile.update({ id: user.profileId }, input);
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }

  @Mutation(() => ImageUploadResponse)
  async uploadUserImage(
    @Arg("userId", () => Int) userId: number,
    @Arg("file", () => GraphQLUpload) file: FileUpload
  ) {
    try {
      const { createReadStream, filename } = file;

      const { ext } = path.parse(filename);
      const randomString = crypto.randomBytes(20).toString("hex") + ext;

      const stream = createReadStream();
      console.log("Directory: ", __dirname);
      const pathNameForServer = path.join(
        __dirname,
        `../../../public/images/${randomString}`
      );
      const pathNameForClient = `http://localhost:5000/images/${randomString}`;
      stream.pipe(fs.createWriteStream(pathNameForServer));

      const user = await Users.findOneOrFail(userId, {
        relations: ["profile"],
      });

      await Profile.update(user.profileId, { avatar: pathNameForClient });

      return {
        url: `http://localhost:5000/images/${filename}`,
      };
    } catch (err) {
      return {
        url: err,
      };
      // return false;
    }
  }

  @Mutation(() => Boolean)
  async logUserOut(@Ctx() { res }: MyContext) {
    sendRefreshKey(res, "");
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteUser(@Arg("userId", () => Int) userId: number) {
    await getConnection().getRepository(Users).delete({ id: userId });
    return true;
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(@Arg("userId", () => Int) userId: number) {
    await getConnection()
      .getRepository(Users)
      .increment({ id: userId }, "tokenVersion", 1);

    return true;
  }

  @Mutation(() => LoginResponse)
  async loginUser(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req, res }: MyContext
  ): Promise<LoginResponse> {
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      throw new Error("Could not find user...");
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error("Passwords did not match...");
    }

    // Login successful
    sendRefreshKey(res, createRefreshKey(user));

    return {
      accessToken: createAccessKey(user),
      user,
    };
  }

  @Mutation(() => Boolean)
  async registerUser(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("username") username: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const hashedPassword = await hash(password, 13);
    const profile = Profile.create();
    await profile.save();
    console.log("Profile: ", profile);
    try {
      const user = await Users.insert({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
        profileId: profile.id,
      });

      console.log("User: ", user);
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async followUserV2(
    @Arg("username", () => String) username: string,
    @Arg("followingId", () => Int) followingId: number,
    @Ctx() context: MyContext
  ) {
    const authorization = context.req.headers["authorization"];
    console.log(authorization);
    try {
      const token = authorization!.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_KEY!);
      const userId = payload.userId;

      const userToFollow = await Users.findOne({ where: { id: followingId } });

      if (!userToFollow) {
        throw new Error("User not found to follow...");
      }

      await Following.insert({
        username: username,
        followingId: followingId,
        followerId: userId,
      });

      // console.log(sentMessage)

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async followUser(
    @Arg("username", () => String) username: string,
    @Arg("followingId", () => Int) followingId: number,
    @Arg("value", () => Int) value: number,
    @Ctx() context: MyContext
  ) {
    const authorization = context.req.headers["authorization"];

    try {
      const token = authorization!.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_KEY!);
      const userId = payload.userId;

      const isFollowing = value !== -1;
      console.log("isFollowing: ", isFollowing);
      const realValue = isFollowing ? 1 : -1;
      console.log("realValue: ", realValue);

      const followedUser = await Following.findOne({
        where: { followingId: followingId, followerId: userId },
      });

      // Unfollowing a user
      if (followedUser) {
        console.log("User has already followed the user before");
        await getConnection().transaction(async (trns) => {
          await trns.query(
            `
            DELETE FROM following
            WHERE followingId = ${followingId} AND followerId = ${userId}
            `
          );
          // Decrement the user's followersCount of the user to be un-followed
          await trns.query(
            `
            UPDATE users
            SET followersCount = followersCount - 1
            WHERE id = ${followingId}
            `
          );
          // Decrement the user's followingCount of the user who is un-following
          await trns.query(
            `
            UPDATE users
            SET followingCount = followersCount - 1
            WHERE id = ${userId}
            `
          );
        });
      } else if (!followedUser) {
        // Following a user
        await getConnection().transaction(async (trns) => {
          console.log("User has not followed the user before");
          await trns.query(
            `
            INSERT INTO following (username, followingId, followerId, value)
            VALUES ("${username}", ${followingId}, ${userId}, ${realValue});
            `
          );
          // Increment the user's followersCount of the user to be followed
          await trns.query(
            `
            UPDATE users 
            SET followersCount = followersCount + ${realValue}
            WHERE id = ${followingId};
            `
          );
          // Increment the user's followingCount of the user who is following
          await trns.query(
            `
            UPDATE users 
            SET followingCount = followingCount + ${realValue}
            WHERE id = ${userId};
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
}
