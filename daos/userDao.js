import { User } from "../models/userModel";

exports.listUsers = async () => {
  return await User.find({ isDeleted: false });
};

exports.getUser = async (userId) => {
  return await User.findById(userId);
};

exports.createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

exports.updateUser = async (userId, userData) => {
  return await User.findByIdAndUpdate(userId, userData, { new: true });
};

exports.deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};
