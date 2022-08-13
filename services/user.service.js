/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import userModel from '../models/user.model.js';

class UserService {
  async create(data) {
    const newUser = await userModel.create(data);
    return newUser;
  }

  async login(data) {
    const user = await userModel.findOne({ email: data.email });
    return user;
  }

  async getAllUsers() {
    const users = userModel.find({});
    return users;
  }

  async findByEmail(data) {
    const user = await userModel.findOne({ email: data.email });
    return user;
  }
}
export default new UserService();
