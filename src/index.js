import { GraphQLServer } from "graphql-yoga";
import "./database";

import { PORT } from "./config";
import { middlewares } from "./middlewares";
import { typeDefs, resolvers, context } from "./api";

const opts = { debug: true, port: PORT };

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  middlewares,
  context
});

server.start(opts, ({ port }) =>
  console.log(`Server is running on http://localhost:${port}`)
);
