import authResolvers from "./auth.resolvers";
import { loadGQLFile } from "../../utils/load-gql-file";

export default {
  resolvers: authResolvers,
  typeDefs: loadGQLFile("Auth/auth.graphql")
};
