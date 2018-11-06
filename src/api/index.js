import { merge } from "lodash";

import User from "./User";
import Tweet from "./Tweet";

export const typeDefs = [User.typeDefs, Tweet.typeDefs].join(" ");
export const resolvers = merge({}, User.resolvers, Tweet.resolvers);
export const context = req => ({
  ...req,
  model: {
    user: User.model,
    tweet: Tweet.model
  }
});
