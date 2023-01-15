/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import {listModel, IList} from '../models/list.model';

class ListService {
  async create(note: IList) {
    const creates = await listModel.create(note);
    return creates;
  }

  async update(id:string, data: any) {
    const updates = await listModel.updateOne({ _id: id }, data, { runValidators: true });
    return updates;
  }

  async delete(id:string) {
    const deletes = await listModel.findByIdAndDelete(id);
    return deletes;
  }

  async getLists() {
    const allLists = await listModel.find();
    return allLists;
  }

  async getListById(id: string) {
    const aList = await listModel.findOne({ _id: id });
    return aList;
  }

  async getListByPage(data: any) {
    //@ts-ignore
    const movie = await listModel.paginate({}, { page: data.page, size: data.size });
    return movie;
  }
}

export default new ListService();
