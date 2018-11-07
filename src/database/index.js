import mongoose from "mongoose";

import { MONGO } from "../config";

mongoose.Promise = global.Promise;
mongoose.connect(
  MONGO,
  { useNewUrlParser: true }
);
const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function() {
  return this.toString();
};
