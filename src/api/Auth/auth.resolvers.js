import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { APP_SECRET } from "../../config";

export default {
  Query: {
    me: async (_, args, { models: { user }, userId }) => {
      return await user.findById(userId);
    }
  },
  Mutation: {
    signin: async (_, { input }, { models }) => {
      const user = await models.user.findOne({ email: input.email });
      if (!user) throw new Error("No such a user!");

      const matched = await compare(input.password, user.password);
      if (!matched) throw new Error("Invalid password!");

      const token = sign({ userId: user._id }, APP_SECRET, {
        expiresIn: 86400
      });

      return { token, user };
    },
    signup: async (_, { input }, { models }) => {
      const encryptedPassword = await hash(input.password, 10);
      const user = models.user.create({
        ...input,
        password: encryptedPassword
      });

      const token = sign({ userId: user._id }, APP_SECRET, {
        expiresIn: 86400
      });
      return { token, user };
    }
  }
};
