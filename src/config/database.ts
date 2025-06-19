
import mongoose from "mongoose";
const uri = "mongodb+srv://HiFiTest:root@cluster0.m3m5sfk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


 export async function databaseConnection() {
  try {
    await mongoose.connect(uri);
    if (mongoose.connection.db) {
      await mongoose.connection.db.admin().command({ ping: 1 });
    }
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    await mongoose.disconnect();
  }
}


