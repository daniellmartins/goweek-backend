export default {
  Query: {
    tweets: async (_, args, { models: { tweet } }) => {
      return await tweet.find().sort("-createdAt");
    }
  },
  Mutation: {
    createTweet: async (_, { input }, { models, userId, pubSub }) => {
      const tweet = await models.tweet.create({ ...input, author: userId });
      await pubSub.publish("TWEET", {
        tweetSubscription: { mutation: "CREATED", node: tweet }
      });
      return tweet;
    }
  },
  Tweet: {
    author: async ({ author }, args, { models: { user } }) => {
      return await user.findById(author);
    },
    likes: async ({ _id }, args, { models: { like } }) => {
      return await like.count({ tweetId: _id });
    },
    iliked: async ({ _id }, args, { models: { like }, userId }) => {
      return (await like.findOne({ tweetId: _id, userId })) ? true : false;
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
