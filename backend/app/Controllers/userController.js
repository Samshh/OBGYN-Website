// Simulate a database with an array
const users = [];

// Get all users
exports.getUsers = (req, res) => {
  res.json(users);
};

// Create a new user
exports.createUser = (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
};