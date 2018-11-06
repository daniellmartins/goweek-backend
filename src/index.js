import { GraphQLServer } from "graphql-yoga";
import mongoose from "mongoose";

import { PORT } from "./config";
import { typeDefs, resolvers, context } from "./api";

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://goweek:goweek123@ds013941.mlab.com:13941/goweek-backend",
  { useNewUrlParser: true }
);
const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function() {
  return this.toString();
};

const opts = {
  debug: true,
  port: PORT
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context
});

server.start(opts, ({ port }) =>
  console.log(`Server is running on http://localhost:${port}`)
);
