/* eslint-disable consistent-return */
import Jwt from 'jsonwebtoken';

const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(' ')[1];

  Jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({ status: false, message: 'forbidden' });
    }
    req.user = user;
    next();
  });
};

export default authentication;
