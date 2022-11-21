import validator from "validator";
import mongoose from "mongoose";

const dragAndDropSchema = new mongoose.Schema({
  topicName: {
    type: String,
    require: [true, "Please provide topidName"],
  },
  name: {
    type: String,
    require: [true, "Please provide topidName"],
  },
  imagePath: {
    type: String,
    require: [true, "Please provide imagePath"],
  },
  value: {
    type: String,
    require: [true, "Please provide your question"],
  },
});

// userSchema.pre("save", async function (next) {});

const DragAndDrop = mongoose.model("DragAndDrop", dragAndDropSchema);

export default DragAndDrop;
