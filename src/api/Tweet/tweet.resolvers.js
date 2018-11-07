export default {
  Query: {
    tweets: async (_, args, { model: { tweet } }) => {
      return await tweet.find();
    }
  },
  Mutation: {
    createTweet: async (_, { input }, { model: { tweet }, userId }) => {
      return await tweet.create({ ...input, author: userId });
    }
  },
  Tweet: {
    author: async ({ author }, args, { model: { user } }) => {
      return await user.findById(author);
    }
  }
};
