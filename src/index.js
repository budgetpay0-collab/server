import express from "express";
import cors from "cors";
 
import userRoutes from "./routes/userRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import { connectDB } from "./config/dbConnection.js";
 import transactionRoutes from "./routes/transactionRoutes.js";
const app = express();
const PORT = 8080;
 
app.use(cors());
app.use(express.json());
connectDB()
// Mount router

app.use("/" , userRoutes)
app.use("/" , categoryRoutes) 
app.use("/" , transactionRoutes)
app.get("/", (req, res) => {
  res.json({ message: "🚀 Budget server running on port 8080" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
