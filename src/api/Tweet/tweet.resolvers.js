export default {
  Query: {
    async tweets(_, args, ctx) {
      return await ctx.model.tweet.find();
    }
  },
  Tweet: {
    async author({ _id }, args, ctx) {
      return await ctx.model.user.findById(_id);
    }
  }
};
