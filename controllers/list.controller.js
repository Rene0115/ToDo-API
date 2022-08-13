/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import listService from '../services/list.services.js';

class ListController {
  async createList(req, res) {
    const data = {
      title: req.body.title,
      content: req.body.content,
      userId: req.user._id
    };
    const list = await listService.create(data);
    if (_.isEmpty(list)) {
      return res.status(404).send({
        success: false,
        message: 'Title, content and userId are required'
      });
    }

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

  async deleteList(req, res) {
    const posts = await listService.delete(req.params.id);
    if (_.isEmpty(posts)) {
      return res.status(404).send({
        success: false,
        message: 'List does not exist'
      });
    }
    return res.status(200).send({
      success: true,
      message: 'List deleted successfully'
    });
  }
}

export default new ListController();
