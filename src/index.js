import { GraphQLServer } from "graphql-yoga";
import mongoose from "mongoose";

import { PORT, MONGO } from "./config";
import { middlewares } from "./middlewares";
import { typeDefs, resolvers, context } from "./api";

mongoose.Promise = global.Promise;
mongoose.connect(
  MONGO,
  { useNewUrlParser: true }
);
const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function() {
  return this.toString();
};

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
