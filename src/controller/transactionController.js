
import Category from "../models/categoryModel.js";
import Transaction  from "../models/transactionModel.js";

/* ================= CREATE ================= */

export const createTransaction = async (req, res) => {
  try {
    const { userId } = req.params;
    const { amount, category, transactionName, dateOfTransaction } = req.body;

    if (!amount || !category || !transactionName) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const transaction = await Transaction.create({
      amount,
      category,
      transactionName,
      dateOfTransaction: dateOfTransaction || Date.now(),
      userId,
    });

    // 🔥 Increase spent in category
    await Category.findOneAndUpdate(
      { userId, id: category },
      { $inc: { spent: amount } }
    );

    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    console.error("Create Transaction Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
/* ================= DELETE ================= */

export const deleteTransaction = async (req, res) => {
  try {
    const { userId, id } = req.params;

    const transaction = await Transaction.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    // 🔥 Reduce spent
    await Category.findOneAndUpdate(
      { userId, id: transaction.category },
      { $inc: { spent: -transaction.amount } }
    );

    return res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    console.error("Delete Transaction Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
/* ================= UPDATE ================= */

export const updateTransaction = async (req, res) => {
  try {
    const { userId, id } = req.params;
    const { amount, category, transactionName, dateOfTransaction } = req.body;

    const oldTransaction = await Transaction.findOne({
      _id: id,
      userId,
    });

    if (!oldTransaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    // 🔥 Remove old amount from old category
    await Category.findOneAndUpdate(
      { userId, id: oldTransaction.category },
      { $inc: { spent: -oldTransaction.amount } }
    );

    // 🔥 Add new amount to new category
    await Category.findOneAndUpdate(
      { userId, id: category },
      { $inc: { spent: amount } }
    );

    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: id, userId },
      {
        amount,
        category,
        transactionName,
        ...(dateOfTransaction && { dateOfTransaction }),
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: updatedTransaction,
    });
  } catch (error) {
    console.error("Update Transaction Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


/* ================= FETCH ALL ================= */

export const getUserTransactions = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Fetching transactions for userId:", userId);
    const transactions = await Transaction.find({ userId })
      .sort({ createdAt: -1 }); // newest first

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    console.error("Fetch Transactions Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
