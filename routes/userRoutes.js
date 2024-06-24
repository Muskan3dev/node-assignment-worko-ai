const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const validationMiddleware = require("../middlewares/validationMiddleware");

const router = express.Router();

router.get("/user", authMiddleware.authenticate, userController.listUsers);
