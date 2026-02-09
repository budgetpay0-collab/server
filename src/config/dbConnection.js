import mongoose from "mongoose";

 export const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://budgetpay0_db_user:RwY8CA3DHOxxs8MW@cluster0.exldhis.mongodb.net/budget_pay?appName=Cluster0", {
      // These options are safe defaults
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
    });

    console.log(
      `✅ MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`
    );
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1); // stop server if DB fails
  }
};

 
