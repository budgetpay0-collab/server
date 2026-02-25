import express from "express";
import { addCategory, deleteCategory, editCategory, getAllCategories } from "../controller/categoryController.js";
const router = express.Router();

router.get("/categories/:userId", getAllCategories);
router.post("/category/add", addCategory);
router.post("/category/edit", editCategory);
router.post("/category/delete", deleteCategory);

export default router;