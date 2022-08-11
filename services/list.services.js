/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import listModel from '../models/list.model.js';

class ListService {
  async create(note) {
    const creates = await listModel.create(note);
    return creates;
  }
}

export default new ListService();
