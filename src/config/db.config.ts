import mongoose from "mongoose";
import './env.config'
class Database {
  private readonly URI: string;

  constructor() {
    this.URI =
      process.env.MONGO_URI || "your mongo url";
    this.connect();
  }

  private async connect() {
    try {
      await mongoose.connect(this.URI);
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Database connection failed");
    }
  }
}
export default Database;
