export default {
  Query: {
    tweets: async (_, args, { model: { tweet } }) => {
      return await tweet.find();
    }
  },
  Mutation: {
    createTweet: async (_, { input }, { model: { tweet }, userId }) => {
      return await tweet.create({ ...input, author: userId });
    },
    addLikeToTweet: async (_, { tweetId }, { model: { tweet }, userId }) => {
      return await tweet.findByIdAndUpdate(
        tweetId,
        { $addToSet: { likes: userId } },
        { new: true }
      );
    },
    removeLikeFromTweet: async (
      _,
      { tweetId },
      { model: { tweet }, userId }
    ) => {
      return await tweet.findByIdAndUpdate(
        tweetId,
        { $pull: { likes: userId } },
        { new: true }
      );
    }
  },
  Tweet: {
    author: async ({ author }, args, { model: { user } }) => {
      return await user.findById(author);
    },
    likes: async ({ likes }, args, { model: { user } }) => {
      return await user.find({ _id: { $in: likes } }).sort("-createdAt");
    },
    likesCount: async ({ likes }) => {
      return await likes.length;
    }
  }
};
