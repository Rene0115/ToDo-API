import mongoose, {Document} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

interface IUser {
  email: string;
  username: string;
  password: string;
  verified?: boolean;
}

export interface IUserModel extends IUser, Document {}

const userSchema:mongoose.Schema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  }

}, { timestamps: true, versionKey: false });

userSchema.plugin(mongoosePaginate);

userSchema.methods.toJSON = function f() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

const userModel = mongoose.model<IUserModel>('User', userSchema);

export {userModel, IUser};
