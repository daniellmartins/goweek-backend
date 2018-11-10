import mongoose from "mongoose";

import { MONGO_DB } from "../config";

mongoose.Promise = global.Promise;
mongoose.connect(
  MONGO_DB,
  { useNewUrlParser: true }
);
const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function() {
  return this.toString();
};
