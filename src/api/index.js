import { join } from "path";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import { PubSub } from "graphql-yoga";

const pubSub = new PubSub();
const models = mergeResolvers(fileLoader(join(__dirname, "./**/*.model.*")));

export const typeDefs = mergeTypes(
  fileLoader(join(__dirname, "./**/*.graphql"))
);

export const resolvers = mergeResolvers(
  fileLoader(join(__dirname, "./**/*.resolvers.*"))
);

export const context = req => ({
  ...req,
  models,
  pubSub
});
