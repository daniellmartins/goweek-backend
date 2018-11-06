import tweetModel from "./tweet.model";
import tweetResolvers from "./tweet.resolvers";
import { loadGQLFile } from "../../utils/load-gql-file";

export default {
  model: tweetModel,
  resolvers: tweetResolvers,
  typeDefs: loadGQLFile("Tweet/tweet.graphql")
};
