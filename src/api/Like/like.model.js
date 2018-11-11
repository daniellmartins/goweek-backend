import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LikeScheam = Schema(
  {
    tweetId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    }
  },
  { timestamps: true }
);

export default { like: mongoose.model("Like", LikeScheam) };
