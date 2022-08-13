/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userService from '../services/user.service.js';

class UserController {
  async createUser(req, res) {
    const data = { email: req.body.email, password: bcrypt.hashSync(req.body.password, 8) };
    await userService.create(data);
    if (_.isEmpty(data)) {
      return res.status(404).send({
        success: false,
        message: 'User cannot be created without an email and a password'
      });
    }

    return res.status(201).send({
      success: true,
      message: 'user created successfully'
    });
  }
  async loginUser(req, res) {
    
  }
}

export default new UserController();
