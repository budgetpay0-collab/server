import express from "express";
import cors from "cors";
 
import userRoutes from "./routes/userRoutes.js"
import { connectDB } from "./config/dbConnection.js";
 
const app = express();
const PORT = 8080;
 
app.use(cors());
app.use(express.json());
connectDB()
// Mount router

app.use("/" , userRoutes)

app.get("/", (req, res) => {
  res.json({ message: "🚀 Budget server running on port 8080" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
