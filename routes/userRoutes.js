const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const validationMiddleware = require("../middlewares/validationMiddleware");

const router = express.Router();

router.get("/user", authMiddleware.authenticate, userController.listUsers);
router.get(
  "/user/:userId",
  authMiddleware.authenticate,
  userController.getUser
);
router.post("/user", userController.createUser);
router.put(
  "/user/:userId",
  [authMiddleware.authenticate, validationMiddleware.validateUser],
  userController.updateUser
);
router.delete(
  "/user/:userId",
  authMiddleware.authenticate,
  userController.deleteUser
);

module.exports = router;
