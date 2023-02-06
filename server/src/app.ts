import express, { Request, Response, Application } from "express";
import { createConnection } from "typeorm";
import cors from "cors";
import "dotenv/config";
import { Users } from "./Entities/Users";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./Schema/Resolvers/UserResolver";
import { MessageResolver } from "./Schema/Resolvers/MessageReslolver";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { createAccessKey, createRefreshKey } from "./auth/auth";
import { sendRefreshKey } from "./auth/sendRefreshKey";
import { Post } from "./Entities/Post";
import { PostResolver } from "./Schema/Resolvers/PostResolver";
import { Profile } from "./Entities/Profile";
import { graphqlUploadExpress } from "graphql-upload";
import { LikedPost } from "./Entities/LikedPost";
import { Comment } from "./Entities/Comment";
import { Message } from "./Entities/Message";

import http from "http";
import { Following } from "./Entities/Following";
import { RetweetPost } from "./Entities/RetweetPost";

const main = async () => {
  const app: Application = express();
  app.use(
    cors({
      origin: process.env.SERVER_URL,
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.static("public"));
  // Might need next line in prod
  // app.set("trust proxy", 1)
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));

  await createConnection({
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    schema: process.env.DB_SCHEMA,
    database: process.env.DB_DATABASE,
    entities: [
      Users,
      Post,
      Profile,
      LikedPost,
      Comment,
      Message,
      Following,
      RetweetPost,
    ],
  });

  app.post("/refresh_token", async (req: Request, res: Response) => {
    const token = req.cookies.habit;
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_KEY!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: "" });
    }

    // Token is valid
    // We can send back a fresh access key
    const user = await Users.findOne({ id: payload.userId });

    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }

    sendRefreshKey(res, createRefreshKey(user));

    return res.send({ ok: true, accessToken: createAccessKey(user) });
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, PostResolver, MessageResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
    subscriptions: {
      path: "/subscriptions",
      onConnect: () => console.log("✅  Client connected for subscriptions"),
      onDisconnect: () =>
        console.log("❌  Client disconnected from subscriptions"),
    },
    uploads: false,
  });

  const httpServer = http.createServer(app);

  apolloServer.applyMiddleware({ app, cors: false });
  apolloServer.installSubscriptionHandlers(httpServer);

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello");
  });

  httpServer.listen(() => {
    console.log(`🚀 Server running on ${process.env.SERVER_URL}`);
    console.log(
      `🚀  Subscriptions ready at ws://${process.env.SERVER_DOMAIN}:${apolloServer.subscriptionsPath}`
    );
  });
};

main().catch((err) => {
  console.log(err);
});
