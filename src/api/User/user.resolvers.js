export default {
  Query: {
    user: async (_, { _id }, { model: { user } }) => {
      return await user.findById(_id);
    }
  },
  User: {
    tweets: async ({ _id }, args, { model: { tweet } }) => {
      return await tweet.find({ author: _id }).sort("-createdAt");
    }
  }
};
