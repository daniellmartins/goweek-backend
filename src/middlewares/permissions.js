import { rule, shield } from "graphql-shield";

import { getUserId } from "../utils/getUserId";

const rules = {
  isAuthenticated: rule()(async (_, args, ctx) => {
    const userId = getUserId(ctx);
    ctx.userId = userId;
    return !!userId;
  })
};

export const permissions = shield({
  Query: {
    tweets: rules.isAuthenticated
  }
});
