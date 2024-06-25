const userDao = require("../daos/userDao");
const User = require("../models/userModel");

exports.listUsers = async () => {
  const users = await User.find({ isDeleted: false });
  console.log(users);
  return users;
};

exports.getUser = async (userId) => {
  return await userDao.getUser(userId);
};

exports.createUser = async (userData) => {
  return await userDao.createUser(userData);
};

exports.updateUser = async (userId, userData) => {
  try {
    // Remove fields that should not be updated directly
    if (userData.password) {
      delete userData.password; // Assuming password should not be updated here
    }

    // Log the incoming data to debug
    console.log("Updating user with data:", userData);

    const user = await User.findByIdAndUpdate(userId, userData, { new: true });
    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

exports.deleteUser = async (userId) => {
  return await userDao.deleteUser(userId);
};
