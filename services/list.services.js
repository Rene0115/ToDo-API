/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import listModel from '../models/list.model.js';

class ListService {
  async create(note) {
    const creates = await listModel.create(note);
    return creates;
  }

  async update(id, data) {
    const updates = await listModel.updateOne({ _id: id }, data, { runValidators: true });
    return updates;
  }
}

export default new ListService();
