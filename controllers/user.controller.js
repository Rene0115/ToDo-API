/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userService from '../services/user.service.js';

class UserController {
  async createUser(req, res) {
    const user = await userService.findByEmail(req.body);
    if (!_.isEmpty(user)) {
      return res.status(400).send({
        success: false,
        message: 'User already exists'
      });
    }
    const data = { email: req.body.email, password: bcrypt.hashSync(req.body.password, 8) };
    if (_.isEmpty(data)) {
      return res.status(404).send({
        success: false,
        message: 'User cannot be created without an email and a password'
      });
    }
    await userService.create(data);

    return res.status(201).send({
      success: true,
      message: 'user created successfully'
    });
  }

  async loginUser(req, res) {

  }
}

export default new UserController();
