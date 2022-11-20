import * as crypto from "crypto";
import validator from "validator";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const trueFalseSchema = new mongoose.Schema({
  topicName: {
    type: String,
    require: [true, "Please provide topidName"],
  },
  imagePath: {
    type: String,
    require: [true, "Please provide imagePath"],
  },
  question: {
    type: String,
    require: [true, "Please provide your question"],
  },
  bool: {
    type: Boolean,
    require: [true, "Please provide your answer"],
  },
});

// userSchema.pre("save", async function (next) {});

const TrueFalseGame = mongoose.model("TrueFalseGame", trueFalseSchema);

export default TrueFalseGame;
