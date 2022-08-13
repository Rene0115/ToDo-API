/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import userModel from '../models/user.model.js';

class UserService {
  async createUser(data) {
    const newUser = await userModel.create(data);
    return newUser;
  }

  async loginUser(data) {
    const user = await userModel.findOne({ email: data.email });
    return user;
  }

  async fetchUsers() {
    const users = userModel.find({});
    return users;
  }
}
export default new UserService();
