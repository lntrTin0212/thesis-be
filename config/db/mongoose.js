import { connect as _connect } from "mongoose";

const connectDB = async () => {
  try {
    await _connect("mongodb://localhost:27017/fishdoctor_admin", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).finally();
    console.log("connect success");
  } catch (error) {
    console.log("connect fail");
  }
};
export default connectDB;
