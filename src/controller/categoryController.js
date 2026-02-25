import mongoose from "mongoose";
import Category from "../models/categoryModel.js";

/* =========================================================
   1️⃣ FETCH ALL CATEGORIES
   GET /categories/:userId
========================================================= */

export const getAllCategories = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Fetching categories for userId:", userId);
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid or missing userId" });
    }

    const categories = await Category.find({ userId, isActive: true })
      .sort({ createdAt: -1 });

    return res.status(200).json(categories);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};


/* =========================================================
   2️⃣ ADD CATEGORY
   POST /category/add
========================================================= */

export const addCategory = async (req, res) => {
  try {
    const { userId, id, name, allocated, spent, color, icon } = req.body;

    if (!userId || !id || !name || !color || !icon) {
      return res.status(400).json({
        message: "userId, id, name, color and icon are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const newCategory = new Category({
      userId,
      id,
      name,
      allocated: allocated || 0,
      spent: spent || 0,
      color,
      icon,
    });

    await newCategory.save();

    return res.status(201).json({
      message: "Category created successfully",
      data: newCategory,
    });

  } catch (err) {
    console.error(err);

    if (err.code === 11000) {
      return res.status(409).json({
        message: "Category with same name or id already exists for this user",
      });
    }

    return res.status(500).json({ message: "Server Error" });
  }
};


/* =========================================================
   3️⃣ EDIT CATEGORY (Partial Update)
   POST /category/edit
========================================================= */

export const editCategory = async (req, res) => {
  try {
    const { userId, name, ...updates } = req.body;

    if (!userId || !name) {
      return res.status(400).json({
        message: "userId and name are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    delete updates.userId; // prevent accidental overwrite

    const updatedCategory = await Category.findOneAndUpdate(
      { userId, name },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        message: "Category not found for this user",
      });
    }

    return res.status(200).json({
      message: "Category updated successfully",
      data: updatedCategory,
    });

  } catch (err) {
    console.error(err);

    if (err.code === 11000) {
      return res.status(409).json({
        message: "Duplicate name or id for this user",
      });
    }

    return res.status(500).json({ message: "Server Error" });
  }
};


/* =========================================================
   4️⃣ DELETE CATEGORY
   POST /category/delete
========================================================= */

export const deleteCategory = async (req, res) => {
  try {
    const { userId, name } = req.body;

    if (!userId || !name) {
      return res.status(400).json({
        message: "userId and name are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const deletedCategory = await Category.findOneAndDelete({
      userId,
      name,
    });

    if (!deletedCategory) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    return res.status(200).json({
      message: "Category deleted successfully",
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
