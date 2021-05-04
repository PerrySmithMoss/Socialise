import express, { Request, Response, Application } from "express";
import { createConnection } from "typeorm";
import cors from "cors";
import "dotenv/config";
import { Users } from "./Entities/Users";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./Schema/Resolvers/UserResolver";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { createAccessKey, createRefreshKey } from "./auth/auth";
import { sendRefreshKey } from "./auth/sendRefreshKey";
import { Post } from "./Entities/Post";
import { PostResolver } from "./Schema/Resolvers/PostResolver";
import { Profile } from "./Entities/Profile";
import { graphqlUploadExpress } from "graphql-upload";

const main = async () => {
  const app: Application = express();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.static('public'));
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));

  await createConnection({
    type: "mysql",
    host: `${process.env.HOST}`,
    port: parseInt(`${process.env.DATABASE_PORT}`),
    database: `${process.env.DATABASE}`,
    socketPath: `${process.env.SOCKET_PATH}`,
    username: `${process.env.USERNAME}`,
    password: `${process.env.PASSWORD}`,
    logging: true,
    synchronize: false,
    entities: [Users, Post, Profile],
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
      resolvers: [UserResolver, PostResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
    uploads: false
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello");
  });

  const PORT = process.env.APP_PORT || 5000;
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
};

main().catch((err) => {
  console.log(err);
});
