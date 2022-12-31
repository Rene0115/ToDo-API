/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { transporter, mailGenerator } from '../config/mailer.config.js';
import userService from '../services/user.service.js';

class UserController {
  async create(req, res) {
    const user = await userService.findByEmail(req.body);
    if (!_.isEmpty(user)) {
      return res.status(400).send({
        success: false,
        message: 'User already exists'
      });
    }
    const data = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      firstname: req.body.firstname,
      lastname: req.body.lastname
    };
    if (!(data.email || data.firstname || data.lastname || data.password)) {
      res.status(404).send({
        success: false,
        message: 'must supply email, password, firstname and lastname'
      });
    }
    const newUser = await userService.create(data);

    const verificationToken = newUser.generateToken();

    const url = `${process.env.APP_URL}/users/verify/${verificationToken}`;

    const response = {
      body: {
        name: `${req.body.firstname} ${req.body.lastname}`,
        intro: 'Email Verification Link',
        action: {
          instructions:
              'If you did not request for this mail, Please Ignore it. To Verify your Email password, click on the link below:',
          button: {
            text: 'Verify Email',
            link: url
          }
        },
        outro: 'Do not share this link with anyone.'
      }
    };

    const mail = mailGenerator.generate(response);

    const message = {
      from: 'Nacoss-Blog <nacossblogapp@gmail.com>',
      to: req.body.email,
      subject: 'Verify Your Email',
      html: mail
    };

    await transporter.sendMail(message);

    return res.status(201).send({
      message: `Sent a verification email to ${req.body.email}`,
      data: newUser
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

  async deleteUser(req, res) {
    const posts = await userService.delete(req.params.id);
    if (_.isEmpty(posts)) {
      return res.status(404).send({
        success: false,
        message: 'user does not exist'
      });
    }

    return res.status(200).send({
      success: true,
      message: 'user deleted successfully'
    });
  }

  async paginated(req, res) {
    if (!(req.query?.page && req.query?.size)) {
      const users = await userService.getAllUsers();
      if (!users) {
        return res.status(400).send({
          success: false,
          message: 'no users exist in the database'
        });
      }
    }
    const page = req.query?.page;
    const size = req.query?.size;
    const data = { page, size };

    const users = await userService.getUserByPage(data);
    if (!users) {
      return res.status(400).send({
        success: false,
        message: 'no users exist in the database'
      });
    }
    return res.status(200).send({
      success: true,
      data: users
    });
  }
}

export default new UserController();
