import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const listSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    required: true,
    type: String
  },
  userId: {
    type: String
  }
}, { timestamps: true });

listSchema.plugin(mongoosePaginate);

const listModel = mongoose.model('List', listSchema);

export default listModel;
