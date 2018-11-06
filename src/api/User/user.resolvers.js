export default {
  Query: {
    async user(_, { _id }, ctx) {
      return await ctx.model.user.findById(_id);
    }
  }
};
