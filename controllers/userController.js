const User = require("../models/userModel");
const userService = require("../services/userService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const dotenv = require("dotenv");

dotenv.config();

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  age: Joi.number().required(),
  city: Joi.string().required(),
  zipCode: Joi.string().required(),
  password: Joi.string().optional(),
});

exports.listUsers = async (req, res) => {
  try {
    const users = await userService.listUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await userService.getUser(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { email, name, age, city, zipCode, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userService.createUser({
      email,
      name,
      age,
      city,
      zipCode,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  // Create a copy of the request body without the password field for validation
  const updateData = { ...req.body };
  delete updateData.password;

  const { error } = userSchema.validate(updateData, { abortEarly: false });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Pass clean data to the service
    const user = await userService.updateUser(req.params.userId, req.body);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
