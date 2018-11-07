export default {
  Query: {
    tweets: async (_, args, { model: { tweet } }) => {
      return await tweet.find();
    }
  },
  Mutation: {
    createTweet: async (_, { input }, { model, userId, pubSub }) => {
      const tweet = await model.tweet.create({ ...input, author: userId });
      await pubSub.publish("TWEET", {
        tweetSubscription: { mutation: "CREATED", node: tweet }
      });
      return tweet;
    },
    addLikeToTweet: async (_, { tweetId }, { model, userId, pubSub }) => {
      const tweet = await model.tweet.findByIdAndUpdate(
        tweetId,
        { $addToSet: { likes: userId } },
        { new: true }
      );
      await pubSub.publish("TWEET", {
        tweetSubscription: { mutation: "UPDATED", node: tweet }
      });
      return tweet;
    },
    removeLikeFromTweet: async (_, { tweetId }, { model, userId, pubSub }) => {
      const tweet = await model.tweet.findByIdAndUpdate(
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
    author: async ({ author }, args, { model: { user } }) => {
      return await user.findById(author);
    },
    likes: async ({ likes }, args, { model: { user } }) => {
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
