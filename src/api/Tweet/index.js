import tweetModel from "./tweet.model";
import tweetResolvers from "./tweet.resolvers";
import { loadGQLFile } from "../../utils/loadGQLFile";

export default {
  model: tweetModel,
  resolvers: tweetResolvers,
  typeDefs: loadGQLFile("Tweet/tweet.graphql")
};
