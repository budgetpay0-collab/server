import express from "express";
import {
  createTransaction,
  deleteTransaction,
  updateTransaction,
  getUserTransactions,
} from "../controller/transactionController.js";

const router = express.Router();

router.post("/create-transaction/:userId", createTransaction);
router.get("/fetch-transactions/:userId", getUserTransactions);
router.put("/update-transaction/:userId/:id", updateTransaction);
router.delete("/delete-transaction/:userId/:id", deleteTransaction);

export default router;
