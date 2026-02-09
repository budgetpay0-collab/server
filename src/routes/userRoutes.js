import express from "express";
import {fetchUserDetailsByID, loginUser, signUpUser, updateUser} from '../controller/userController.js'
const router = express.Router();

// GET /api/
router.get("/user/:id", fetchUserDetailsByID);

// GET /api/health
router.post("/user/login", loginUser);

// POST /api/echo
router.post("/user/signup", signUpUser);
router.post("/user/update" , updateUser)
export default router;
