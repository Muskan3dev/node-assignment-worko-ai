const userDao = require("../daos/userDao");

exports.listUsers = async () => {
  return await userDao.listUsers();
};

exports.getUser = async (userId) => {
  return await userDao.getUser(userId);
};

exports.createUser = async (userData) => {
  return await userDao.createUser(userData);
};

exports.updateUser = async (userId, userData) => {
  return await userDao.updateUser(userId.userData);
};

exports.deleteUser = async (userId) => {
  return await userDao.deleteUser(userId);
};
