import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserScheam = Schema(
  {
    name: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    tweets: [Schema.Types.ObjectId]
  },
  { timestamps: true }
);

export default mongoose.model("User", UserScheam);
