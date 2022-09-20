/* eslint-disable no-underscore-dangle */
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
      message: 'user created successfully',
      body: data
    });
  }

  async loginUser(req, res) {
    const user = await userService.findByEmail(req.body);
    if (_.isEmpty(user)) {
      return res.status(404).send({
        success: false,
        message: 'user does not exist, create a user before attempting to login'
      });
    }
    const verifyPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!verifyPassword) {
      return res.status(404).send({
        success: false,
        message: 'email or password is invalid'
      });
    }
    const token = jwt.sign({ _id: user._id, email: user.email }, process.env.TOKEN_SECRET, { expiresIn: '20h', algorithm: 'HS512' });
    return res.status(200).send({
      success: true,
      body: {
        message: 'user logged in successfully',
        token,
        data: user
      }
    });
  }

  async fetchUsers(req, res) {
    const users = await userService.getAllUsers();
    return res.status(200).send({
      success: true,
      data: { ...users }
    });
  }

  async getUserbyEmail(req, res) {
    const users = await userService.findByEmail(req.body);
    if (_.isEmpty(users)) {
      return res.status(200).send({
        success: true,
        message: 'No user with this email exits'
      });
    }
    return res.status(200).send({
      success: true,
      data: users
    });
  }

  async getUserById(req, res) {
    const user = await userService.getUserById(req.params.id);
    if (_.isEmpty(user)) {
      return res.status(200).send({
        success: true,
        message: 'No user with this id exits'
      });
    }
    return res.status(200).send({
      success: true,
      data: user
    });
  }
}

export default new UserController();
