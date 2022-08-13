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
    const deletes = await listModel.findByIdAndDelete(id);
    return deletes;
  }

  async getLists() {
    const allLists = await listModel.find();
    return allLists;
  }

  async getListById(id) {
    const aList = await listModel.find({ userId: id });
    return aList;
  }
}

export default new ListService();
