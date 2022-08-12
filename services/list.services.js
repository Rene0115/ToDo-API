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

  async delete(id) {
    const deletes = await listModel.deleteOne({ _id: id });
    return deletes;
  }

  async getAllLists() {
    const allLists = await listModel.find();
    return allLists;
  }
}

export default new ListService();
