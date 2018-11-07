import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { APP_SECRET } from "../../config";

export default {
  Mutation: {
    signin: async (_, { input }, { model }) => {
      const user = await model.user.findOne({ email: input.email });
      if (!user) throw new Error("No such a user!");

      const matched = await compare(input.password, user.password);
      if (!matched) throw new Error("Invalid password!");

      const token = sign({ userId: user._id }, APP_SECRET, {
        expiresIn: 86400
      });

      return { token, user };
    },
    signup: async (_, { input }, { model: { user } }) => {
      const encryptedPassword = await hash(input.password, 10);
      return await user.create({
        ...input,
        password: encryptedPassword
      });
    }
  }
};
