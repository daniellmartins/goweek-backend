import { verify } from "jsonwebtoken";

import { APP_SECRET } from "../config";

export const getUserId = (ctx, info) => {
  let Authorization;
  if (info.operation.operation === "subscription") {
    Authorization = ctx.connection.context.Authorization;
  } else {
    Authorization = ctx.request.get("Authorization");
  }
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const verifiedToken = verify(token, APP_SECRET);
    return verifiedToken && verifiedToken.userId;
  }
};
