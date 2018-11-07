import { rule, shield } from "graphql-shield";

import { getUserId } from "../utils/getUserId";

const rules = {
  isAuthenticated: rule()(async (_, args, ctx, info) => {
    const userId = getUserId(ctx, info);
    ctx.userId = userId;
    return !!userId;
  })
};

export const permissions = shield({
  Query: {
    tweets: rules.isAuthenticated
  },
  Mutation: {
    createTweet: rules.isAuthenticated,
    addLikeToTweet: rules.isAuthenticated,
    removeLikeFromTweet: rules.isAuthenticated
  },
  Subscription: {
    tweetSubscription: rules.isAuthenticated
  }
});
