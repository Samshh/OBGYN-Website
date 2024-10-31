const jwt = require("jsonwebtoken");

const secret = "123";

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403);
    if (user.table !== "Admin" && user.table !== "Patient") return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
