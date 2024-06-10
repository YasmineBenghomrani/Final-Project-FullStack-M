import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://yasminebenghomrani:zmy021734610@atlascluster.fs7q2wo.mongodb.net/manil?retryWrites=true&w=majority"
    );
    console.log("MongoDB Connected with success");
  } catch (error) {
    console.log("Error in MongoDB Connection");
  }
}

export default connectDB;
