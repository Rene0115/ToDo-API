/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import listService from '../services/list.services';

class ListController {
  async createList(req, res) {
    const data = {
      title: req.body.title,
      content: req.body.content,
      userId: req.user._id
    };
    await listService.create(data);
    return res.status(200).send({
      success: true,
      message: 'List created successfully'
    });
  }

  async updateList(req, res) {
    const data = {
      title: req.body.title,
      content: req.body.content
    };
    await listService.update(req.body.id, data);
    res.status(200).send({
      success: true,
      message: 'List updated successfully'
    });
  }
}

export default new ListController();
