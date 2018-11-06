import { GraphQLServer } from "graphql-yoga";
import mongoose from "mongoose";

import { PORT } from "./config";

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://goweek:goweek123@ds013941.mlab.com:13941/goweek-backend",
  { useNewUrlParser: true }
);

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}!`
  }
};

const opts = {
  port: PORT
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(opts, ({ port }) =>
  console.log(`Server is running on http://localhost:${port}`)
);
