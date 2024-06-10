import express from "express";
import {
  deleteUser,
  getAllUsers,
  register,
  updateUser,
  login,
  getMe,
} from "../controllers/user.js";
import isAuthenticated from "../midelw/isAuthenticated.js";

const userRouter = express.Router();

// Route for user registration
userRouter.post("/register", register);

// Route for user login
userRouter.post("/login", login);

// Route to get all users (admin only)
userRouter.get("/", getAllUsers);

// Route to get current user profile
userRouter.get("/me", isAuthenticated, getMe);

// Route to update current user profile
userRouter.put("/", isAuthenticated, updateUser);

// Route to delete current user profile
userRouter.delete("/", isAuthenticated, deleteUser);

export default userRouter;
