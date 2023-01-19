import _ from 'lodash';
import jwt from 'jsonwebtoken';
import {Request, Response} from 'express'
import bcrypt from 'bcrypt';
import { transporter, mailGenerator } from '../config/mailer.config';
import userService from '../services/user.service';
import {userModel, IUser} from '../models/user.model';

const secret = process.env.TOKEN_SECRET || ''
class UserController {
  async create(req: Request, res: Response) {
    const data: IUser = {
      email: req.body.email.toLowerCase(),
      password: bcrypt.hashSync(req.body.password, 10),
      username: req.body.lastname
    };

    const user = await userService.findByEmail(data.email);
    if (!_.isEmpty(user)) {
      return res.status(400).send({
        success: false,
        message: 'User already exists'
      });
    }
    if (!(data.email || data.username || data.password)) {
      res.status(404).send({
        success: false,
        message: 'must supply email, password, firstname and lastname'
      });
    }
    const newUser = await userService.create(data);
  //@ts-ignore
    const verificationToken = newUser.generateToken();

    const url = `${process.env.APP_URL}users/verify/${verificationToken}`;

    const response = {
      body: {
        name: `${data.username}`,
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
      from: 'TO-DO <enere0115@gmail.com>',
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

  async loginUser(req: Request, res: Response) {
    const user = await userService.findByEmail(req.body.email);
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

    const token = jwt.sign({ _id: user._id, email: user.email }, secret, { expiresIn: '20h', algorithm: 'HS512' });
    return res.status(200).send({
      success: true,
      body: {
        message: 'user logged in successfully',
        token,
        data: user
      }
    });
  }

  async paginated(req: Request, res: Response) {
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

  async verify(req: Request, res: Response) {
    const { token } = req.params;
    // Check we have an id
    if (!token) {
      return res.status(422).send({
        message: 'Missing Token'
      });
    }

    const decoded = jwt.verify(
      token,
      secret
    );
    // @ts-ignore
    const user = await userModel.findOne({ _id: decoded._id });
    if (!user) {
      return res.status(404).send({
        message: 'User does not  exist'
      });
    }

    user.verified = true;
    await user.save();

    return res.status(200).send({
      message: 'Account Verified'
    });
  }

  async forgotPassword(req: Request, res: Response) {
    const { newPassword } = req.body;

    const user = await userService.findByEmail(req.body.email);
    if (_.isEmpty(user)) {
      return res.status(404).send({
        success: false,
        message: 'user does not exist'
      });
    }
    if (user) {
      const hash = bcrypt.hashSync(newPassword, 10);

      await user.updateOne({ password: hash });
    }

    const response = {
      body: {
        name: `${user.username}`,
        intro: 'Password Reset Successfully.',
        outre: 'If you did not initiate this reset please contact our customer support.'

      }
    };

    const mail = mailGenerator.generate(response);

    const message = {
      from: 'TO DO LIST <enere0115@gmail.com>',
      to: user.email,
      subject: 'Password reset success',
      html: mail
    };

    await transporter.sendMail(message);

    return res.status(201).send({
      message: `Password changed successfully. Confirmation email sent to  ${user.email}`
    });
  }
}

export default new UserController();
