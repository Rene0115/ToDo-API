/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const userSchema = mongoose.Schema({

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

}, { timestamps: true });

userSchema.plugin(mongoosePaginate);

userSchema.methods.toJSON = function f() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

const userModel = mongoose.model('users', userSchema);

export default userModel;
