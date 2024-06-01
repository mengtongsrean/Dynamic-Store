// models/userModel.js
const { getDB } = require('../config/db');

const getUserCollection = () => {
  const db = getDB();
  return db.collection('users');
};

module.exports = { getUserCollection };
