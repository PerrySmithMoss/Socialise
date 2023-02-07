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

const app: Application = express();
const httpServer = http.createServer(app);

const main = async () => {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.static("public"));
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));

  // Might need next line in prod
  // app.set("trust proxy", 1)
  

  await createConnection({
    type: "postgres",
    host: `${process.env.DB_HOST}`,
    port: parseInt(`${process.env.DB_PORT}`),
    username: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_DATABASE}`,
    // synchronize: true,
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

  app.get("/health-check", (req: Request, res: Response) => {
    const healthcheck = {
      uptime: process.uptime(),
      response_time: process.hrtime(),
      message: "OK",
      timestamp: Date.now(),
    };
    try {
      res.send(healthcheck);
    } catch (error: any) {
      healthcheck.message = error;
      res.status(503).send(healthcheck);
    }
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

  apolloServer.applyMiddleware({ app, cors: false });
  apolloServer.installSubscriptionHandlers(httpServer);

  httpServer.listen(5000, () => {
    console.log(`🚀 Server running on ${process.env.SERVER_URL}`);
    console.log(
      `🚀  Subscriptions ready at ws://${process.env.SERVER_DOMAIN}:${apolloServer.subscriptionsPath}`
    );
  });
};

main().catch((err) => {
  console.log(err);
});
