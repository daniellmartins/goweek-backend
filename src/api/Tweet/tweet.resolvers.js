export default {
  Query: {
    tweets: async (_, args, { models: { tweet } }) => {
      return await tweet.find();
    }
  },
  Mutation: {
    createTweet: async (_, { input }, { models, userId, pubSub }) => {
      const tweet = await models.tweet.create({ ...input, author: userId });
      await pubSub.publish("TWEET", {
        tweetSubscription: { mutation: "CREATED", node: tweet }
      });
      return tweet;
    },
    addLikeToTweet: async (_, { tweetId }, { models, userId, pubSub }) => {
      const tweet = await models.tweet.findByIdAndUpdate(
        tweetId,
        { $addToSet: { likes: userId } },
        { new: true }
      );
      await pubSub.publish("TWEET", {
        tweetSubscription: { mutation: "UPDATED", node: tweet }
      });
      return tweet;
    },
    removeLikeFromTweet: async (_, { tweetId }, { models, userId, pubSub }) => {
      const tweet = await models.tweet.findByIdAndUpdate(
        tweetId,
        { $pull: { likes: userId } },
        { new: true }
      );
      await pubSub.publish("TWEET", {
        tweetSubscription: { mutation: "UPDATED", node: tweet }
      });
      return tweet;
    }
  },
  Tweet: {
    author: async ({ author }, args, { models: { user } }) => {
      return await user.findById(author);
    },
    likes: async ({ likes }, args, { models: { user } }) => {
      return await user.find({ _id: { $in: likes } }).sort("-createdAt");
    },
    likesCount: async ({ likes }) => {
      return await likes.length;
    }
  },
  Subscription: {
    tweetSubscription: {
      subscribe(_, args, { pubSub }) {
        return pubSub.asyncIterator("TWEET");
      }
    }
  }
};
