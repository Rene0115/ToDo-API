/* eslint-disable no-underscore-dangle */
import mongoose, {Document} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

interface IUser {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}

export interface IUserModel extends IUser, Document {}

const userSchema:mongoose.Schema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  }

}, { timestamps: true, versionKey: false });

userSchema.plugin(mongoosePaginate);

userSchema.methods.toJSON = function f() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

const userModel = mongoose.model<IUserModel>('users', userSchema);

export default userModel;
