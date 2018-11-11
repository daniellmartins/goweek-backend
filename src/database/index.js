import mongoose from "mongoose";

import { DEBUG, MONGO_DB } from "../config";

mongoose.Promise = global.Promise;
mongoose.connect(
  MONGO_DB,
  { useNewUrlParser: true }
);
mongoose.set("debug", DEBUG);
const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function() {
  return this.toString();
};
