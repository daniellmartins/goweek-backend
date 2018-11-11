import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TweetScheam = Schema(
  {
    content: {
      type: String,
      required: true
    },
    author: Schema.Types.ObjectId
  },
  { timestamps: true }
);

export default { tweet: mongoose.model("Tweet", TweetScheam) };
