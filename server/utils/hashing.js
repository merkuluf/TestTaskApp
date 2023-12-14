const bcrypt = require('bcrypt');
const saltRounds = 10; 

exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

exports.comparePassword = async (password, hashedPassword) => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};