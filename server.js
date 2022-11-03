import app from "./app.js";
import connectDB from "./config/db/mongoose.js";

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

connectDB();

export default server;
