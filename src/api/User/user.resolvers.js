export default {
  Query: {
    user: async (_, { _id }, { models: { user } }) => {
      return await user.findById(_id);
    }
  },
  User: {
    tweets: async ({ _id }, args, { models: { tweet } }) => {
      return await tweet.find({ author: _id }).sort("-createdAt");
    }
  }
};
