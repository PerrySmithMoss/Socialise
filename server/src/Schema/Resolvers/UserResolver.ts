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
import { getConnection, Like, Not } from "typeorm";
import { createAccessKey, createRefreshKey } from "../../auth/auth";
import { isAuth } from "../../auth/middleware/isAuth";
import { sendRefreshKey } from "../../auth/sendRefreshKey";
import { Profile } from "../../Entities/Profile";
import { Users } from "../../Entities/Users";
import { MyContext } from "../../Types/MyContext";
import { GraphQLUpload, FileUpload } from "graphql-upload";
import { Following } from "../../Entities/Following";
import { validateEmail } from "../../utils/validateEmail";

@InputType()
class ProfileUpdateInput {
  @Field(() => String, { nullable: true })
  bio?: string;

  @Field(() => String, { nullable: true })
  location?: string;

  @Field(() => String, { nullable: true })
  website?: string;

  // @Field(() => String, { nullable: true })
  // avatar?: string;
}

@ObjectType()
class LoginResponse {
  @Field()
  accessToken!: string;
  @Field(() => Users)
  user!: Users;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => LoginResponse, { nullable: true })
  data?: LoginResponse;
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
    return `Your user ID is: ${payload!.userId}`;
  }

  @Query(() => [Users])
  async getAllUsers() {
    return await Users.find({ relations: ["profile"] });
  }

  @Query(() => [Users])
  async getUsersTheLoggedInUserMayKnow(
    @Arg("userId", () => Int, { nullable: true }) userId?: number
  ) {
    if(userId) {
      return await Users.find({
        relations: ["profile"],
        where: { id: Not(userId) },
        order: { dateRegistered: "DESC" },
        take: 5,
      });
    } else {
      return await Users.find({
        relations: ["profile"],
        order: { dateRegistered: "DESC" },
        take: 5,
      });
    }
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

    if (!authorization) {
      console.log("You're not authorized");
      return null;
    }

    try {
      const token = authorization.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_KEY!);

      return await Users.findOne(payload.userId, {
        relations: ["profile", "following", "follower"],
      });
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  @Mutation(() => Boolean)
  async updateProfile(
    @Arg("userId", () => Int) userId: number,
    @Arg("bio", () => String) bio: string,
    @Arg("location", () => String) location: string,
    @Arg("website", () => String) website: string
    // @Arg("input", () => ProfileUpdateInput) input: ProfileUpdateInput
  ) {
    try {
      const user = await Users.findOneOrFail(userId, {
        relations: ["profile"],
      });

      const update = await Profile.update(
        { id: user.profileId },
        { bio, location, website }
      );

      if (!update) {
        return false;
      }

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  // @Mutation(() => ImageUploadResponse)
  // async uploadUserImage(
  //   @Arg("userId", () => Int) userId: number,
  //   @Arg("file", () => GraphQLUpload) file: FileUpload
  // ) {
  //   try {
  //     const { createReadStream, filename } = file;

  //     const { ext } = path.parse(filename);
  //     const randomString = crypto.randomBytes(20).toString("hex") + ext;

  //     const stream = createReadStream();

  //     const pathNameForServer = path.join(
  //       __dirname,
  //       `../../../public/images/${randomString}`
  //     );
  //     const pathNameForClient = `${process.env.SERVER_URL}/images/${randomString}`;
  //     stream.pipe(fs.createWriteStream(pathNameForServer));

  //     const user = await Users.findOneOrFail(userId, {
  //       relations: ["profile"],
  //     });

  //     await Profile.update(user.profileId, { avatar: pathNameForClient });

  //     return {
  //       url: `${process.env.SERVER_URL}/images/${filename}`,
  //     };
  //   } catch (err) {
  //     return {
  //       url: err,
  //     };
  //   }
  // }

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

  @Mutation(() => UserResponse)
  async loginUser(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req, res }: MyContext
  ): Promise<UserResponse> {
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return {
        errors: [
          {
            field: "email/password",
            message: "Could not find a user with that email/password.",
          },
        ],
      };
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      return {
        errors: [
          {
            field: "email/password",
            message: "Could not find a user with that email/password.",
          },
        ],
      };
    }

    // Login successful
    sendRefreshKey(res, createRefreshKey(user));

    return {
      data: {
        accessToken: createAccessKey(user),
        user,
      },
    };
  }

  @Mutation(() => UserResponse)
  async registerUser(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("username") username: string,
    @Arg("email") email: string,
    @Arg("dateRegistered") dateRegistered: string,
    @Arg("password") password: string,
    @Ctx() { req, res }: MyContext
  ): Promise<UserResponse> {
    if (validateEmail(email) === false) {
      return {
        errors: [
          {
            field: "email",
            message: "Email provided is not valid.",
          },
        ],
      };
    }

    if (password.length < 8) {
      return {
        errors: [
          {
            field: "password",
            message: "Password must be 8 characters or greater.",
          },
        ],
      };
    }

    const checkIfUserNameExists = await Users.findOne({
      where: { username: username },
    });
    if (checkIfUserNameExists) {
      return {
        errors: [
          {
            field: "username",
            message:
              "A user with this username already exists, please choose another one.",
          },
        ],
      };
    }

    const checkIfEmailExists = await Users.findOne({
      where: { email: email },
    });
    if (checkIfEmailExists) {
      return {
        errors: [
          {
            field: "email",
            message:
              "A user with this email already exists, please choose another one.",
          },
        ],
      };
    }

    try {
      const hashedPassword = await hash(password, 13);

      const profile = Profile.create();

      await profile.save();

      await Users.insert({
        firstName,
        lastName,
        username,
        email,
        dateRegistered,
        password: hashedPassword,
        profileId: profile.id,
      });

      const user = await Users.findOne({ where: { email } });

      if (!user) {
        return {
          errors: [
            {
              field: "email",
              message: "Could not find user.",
            },
          ],
        };
      }

      sendRefreshKey(res, createRefreshKey(user));

      // Login successful
      return {
        data: {
          accessToken: createAccessKey(user),
          user,
        },
      };
    } catch (err) {
      console.log("fail", err);
      return {
        errors: [
          {
            field: "user",
            message: "This was an error while trying to register user.",
          },
        ],
      };
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async followUserV2(
    @Arg("username", () => String) username: string,
    @Arg("followingId", () => Int) followingId: number,
    @Ctx() context: MyContext
  ) {
    const authorization = context.req.headers["authorization"];
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

      const realValue = isFollowing ? 1 : -1;

      const followedUser = await Following.findOne({
        where: { followingId: followingId, followerId: userId },
      });

      // Unfollowing a user
      if (followedUser) {
        await getConnection().transaction(async (trns) => {
          await trns.query(
            `
            DELETE FROM following
            WHERE "followingId" = ${followingId} AND "followerId" = ${userId}
            `
          );
          // Decrement the user's followersCount of the user to be un-followed
          await trns.query(
            `
            UPDATE users
            SET "followersCount" = "followersCount" - 1
            WHERE "id" = ${followingId}
            `
          );
          // Decrement the user's followingCount of the user who is un-following
          await trns.query(
            `
            UPDATE users
            SET "followingCount" = "followersCount" - 1
            WHERE "id" = ${userId}
            `
          );
        });
      } else if (!followedUser) {
        // Following a user
        await getConnection().transaction(async (trns) => {
          await trns.query(
            `
            INSERT INTO following ("username", "followingId", "followerId", "value")
            VALUES ('${username}', ${followingId}, ${userId}, ${realValue});
            `
          );
          // Increment the user's followersCount of the user to be followed
          await trns.query(
            `
            UPDATE users 
            SET "followersCount" = "followersCount" + ${realValue}
            WHERE "id" = ${followingId};
            `
          );
          // Increment the user's followingCount of the user who is following
          await trns.query(
            `
            UPDATE users 
            SET "followingCount" = "followingCount" + ${realValue}
            WHERE "id" = ${userId};
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

  @Query(() => [Users])
  async searchUsers(@Arg("username", () => String) username: string) {
    return await Users.find({
      relations: ["profile", "following", "follower"],
      where: { username: Like(`%${username}%`) },
    });
  }
}
