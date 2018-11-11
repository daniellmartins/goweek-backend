export default {
  Query: {
    likes: async (_, args, { models: { like } }) => {
      return await like.find({ tweetId }).sort("-createdAt");
    }
  },
  Mutation: {
    addLikeToTweet: async (_, { tweetId }, { models, userId, pubSub }) => {
      const tweet = await models.tweet.findById(tweetId);
      if (!tweet && !tweet._id) throw new Error("No found tweet");
      const like = await models.like.create({ tweetId: tweet._id, userId });
      await pubSub.publish("TWEET", {
        tweetSubscription: { mutation: "UPDATED", node: tweet }
      });
      return true;
    },
    deleteLikeFromTweet: async (_, { tweetId }, { models, userId, pubSub }) => {
      const like = await models.like.findOneAndDelete({ tweetId, userId });
      const tweet = await models.tweet.findById(tweetId);
      await pubSub.publish("TWEET", {
        tweetSubscription: { mutation: "UPDATED", node: tweet }
      });
      return true;
    }
  },
  Like: {
    user: async ({ userId }, args, { models: { user } }) => {
      return await user.findById(userId);
    }
  }
};
