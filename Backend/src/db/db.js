import mongoose from "mongoose";

function connectToDatabase() {
  mongoose
    .connect("mongodb://localhost:27017/n22-music-project")
    .then(() => {
      console.log("Connected to Mongodb successfully");
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB:", error);
    });
}

export default connectToDatabase;
