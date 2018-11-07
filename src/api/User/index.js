import userModel from "./user.model";
import userResolvers from "./user.resolvers";
import { loadGQLFile } from "../../utils/loadGQLFile";

export default {
  model: userModel,
  resolvers: userResolvers,
  typeDefs: loadGQLFile("User/user.graphql")
};
