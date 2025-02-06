import mongoose from "mongoose";
class Database {
  private readonly URI: string;

  constructor() {
    this.URI =
      process.env.MONGO_URI || "mongodb+srv://sunnykumar232327zz7JuKTlw0LAJWm:7zz7JuKTlw0LAJWm@cluster0.9w00dzc.mongodb.net/";
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
