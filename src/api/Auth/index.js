import authResolvers from "./auth.resolvers";
import { loadGQLFile } from "../../utils/loadGQLFile";

export default {
  resolvers: authResolvers,
  typeDefs: loadGQLFile("Auth/auth.graphql")
};
