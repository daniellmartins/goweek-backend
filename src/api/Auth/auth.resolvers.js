import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { APP_SECRET } from "../../config";

export default {
  Mutation: {
    async signin(_, { input }, ctx) {
      const user = await ctx.model.user.findOne({ email: input.email });
      if (!user) throw new Error("No such a user!");

      const matched = await compare(input.password, user.password);
      if (!matched) throw new Error("Invalid password!");

      const token = sign({ userId: user._id }, APP_SECRET, {
        expiresIn: 86400
      });

      return { token, user };
    },
    async signup(_, { input }, ctx) {
      const encryptedPassword = await hash(input.password, 10);
      return await ctx.model.user.create({
        ...input,
        password: encryptedPassword
      });
    }
  }
};
