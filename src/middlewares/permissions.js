import { verify } from "jsonwebtoken";

import { APP_SECRET } from "../config";

const isAuthenticated = async (resolve, _, args, ctx, info) => {
  let authorized;
  if (info.operation.operation === "subscription") {
    authorized = ctx.connection.context.Authorization;
  } else {
    authorized = ctx.request.get("Authorization");
  }

  if (!authorized) throw new Error("Not authorized");

  const token = authorized.replace("Bearer ", "");
  const verifiedToken = verify(token, APP_SECRET);
  if (!verifiedToken && !verifiedToken.userId)
    throw new Error("Token is invalid");

  ctx.userId = verifiedToken.userId;
  return resolve();
};

export const permissions = {
  Query: {
    me: isAuthenticated,
    tweets: isAuthenticated
  },
  Mutation: {
    createTweet: isAuthenticated,
    addLikeToTweet: isAuthenticated,
    removeLikeFromTweet: isAuthenticated
  },
  Subscription: {
    tweetSubscription: isAuthenticated
  }
};
