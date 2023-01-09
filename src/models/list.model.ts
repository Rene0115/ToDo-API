import mongoose, {Document} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

interface IList {
  title: string;
  content: string;
  userId: string;
}

interface IListModel extends IList, Document {}

const listSchema: mongoose.Schema = new mongoose.Schema({
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
}, { timestamps: true , versionKey: false});

listSchema.plugin(mongoosePaginate);

const listModel = mongoose.model<IListModel>('List', listSchema);

export {listModel, IList};
