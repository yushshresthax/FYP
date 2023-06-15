const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')

const { SECRET_KEY } = require('./constants');
const { User } = require('./database/modal');
const authenticateAPI = async (req, res, next) => {
  const header = req.headers['authorization'];
  if (header == undefined || header == null) {
    return res.status(401).send({ message: 'No token provided' });
  }
  const token = header.split(' ')[1];

  if (!token) {
    return res.status(401).send({ message: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Token is invalid' });
    }

    const user = await User.findById(decoded.userID);

    if (!user) {
      return res.status(401).send({ message: 'User not found' });
    }
    req.user_id = decoded.userId;
    req.user = user;
    next();
  });
};

const authenticate = async (req, res, next) => {
  if (process.env.MODE == "local") {
    next();

  } else {
    const token = req.session.token;
    if (!token) {
      res.redirect('/dashboard/login');
    } else {

      jwt.verify(token, SECRET_KEY, async (err, decoded) => {
        if (err) {
          console.log(err);
          res.redirect('/dashboard/login');
          return;
        }


        const user = await User.findById(decoded.userId);
        if (user == null) {
          res.redirect('/dashboard/login');
        } else {

          req.user_id = decoded.userId;
          req.user = user;
          next();
        }
      });
    }
  }
};


module.exports = {
  authenticate,
  authenticateAPI
};