const jwt = require('jsonwebtoken');

const jwtSecret = "Task1";

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (token) {
    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
        console.log("token expired");
        return res.sendStatus(403);
      }

      console.log("authentication is okay");
      req.user = user;
      next();
    });
  } else {
    console.log("toekn expired in 403");
    res.sendStatus(401);
  }
};


const generateToken = (userId) => {
    return jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' });
  };

module.exports = { authenticateJWT ,generateToken};
