/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import {userModel, IUser} from '../models/user.model';

class UserService {
  async create(data: IUser) {
    const newUser = await userModel.create(data);
    return newUser;
  }

  async getAllUsers() {
    const users = await userModel.find();
    return users;
  }

  async findByEmail(data: string) {
    const user = await userModel.findOne({ email: data });
    return user;
  }

  async getUserById(id: string) {
    const user = await userModel.findOne({ _id: id });
    return user;
  }

  async delete(id: string) {
    const deleted = await userModel.findByIdAndDelete(id);
    return deleted;
  }

  async getUserByPage(data:any) {
    //@ts-ignore
    const movie = await userModel.paginate({}, { page: data.page, size: data.size });
    return movie;
  }
}
export default new UserService();
