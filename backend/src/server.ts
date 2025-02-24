import { ApolloServer } from "@apollo/server";
import { expressMiddleware as apolloMiddleware } from "@apollo/server/express4";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import { readFile } from "node:fs/promises";
import { authMiddleware, handleLogin } from "./auth.js";
import { getContext, resolvers } from "./resolvers.js";
dotenv.config();

const PORT = process.env.PORT || 3333;
const app = express();

const typeDefs = await readFile("./schema.graphql", "utf8");
const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();

app.use(cors(), express.json(), authMiddleware);
app.use("/graphql", apolloMiddleware(apolloServer, { context: getContext }));

app.post("/login", handleLogin);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});
