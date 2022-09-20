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
        message: 'Title, content and are required'
      });
    }

    return res.status(200).send({
      success: true,
      message: 'List created successfully',
      body: list
    });
  }

  async updateList(req, res) {
    const list = await listService.getListById(req.body.id);
    if (_.isEmpty(list)) {
      return res.status(404).send({
        success: false,
        message: 'List does not exist, please create a list '
      });
    }
    const data = {
      title: req.body.title,
      content: req.body.content
    };
    await listService.update(req.body.id, data);

    return res.status(200).send({
      success: true,
      message: 'List updated successfully'
    });
  }

  async deleteList(req, res) {
    const posts = await listService.delete(req.body.id);
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

  async getAllLists(req, res) {
    const allLists = await listService.getLists();

    if (_.isEmpty(allLists)) {
      return res.status(200).send({
        success: true,
        count: allLists.length,
        message: 'No Lists have been created'
      });
    }
    return res.status(200).send({
      success: true,
      message: 'Lists were found',
      body: allLists
    });
  }

  async getListById(req, res) {
    const allLists = await listService.getListById(req.params.userId);
    if (_.isEmpty(allLists)) {
      return res.status(200).send({
        success: true,
        message: 'no lists found'
      });
    }
    return res.status(200).send({
      success: true,
      body: allLists

    });
  }
}

export default new ListController();
