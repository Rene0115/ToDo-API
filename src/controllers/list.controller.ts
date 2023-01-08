/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import express from 'express';
import listService from '../services/list.services.js';

interface reqFix {
  user: any;
}

interface reqfixed extends reqFix, express.Request {}
class ListController {
  async createList(req: reqfixed, res: express.Response) {
    
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
      data: list
    });
  }

  async updateList(req: express.Request, res: express.Response) {
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

  async deleteList(req: express.Request, res: express.Response) {
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

  async getAllLists(req: express.Request, res: express.Response) {
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
      data: allLists
    });
  }

  async getListById(req: express.Request, res: express.Response) {
    const allLists = await listService.getListById(req.params.userId);
    if (_.isEmpty(allLists)) {
      return res.status(200).send({
        success: true,
        message: 'no lists found'
      });
    }
    return res.status(200).send({
      success: true,
      data: allLists

    });
  }

  async paginated(req: express.Request, res: express.Response) {
    if (!(req.query?.page && req.query?.size)) {
      const lists = await listService.getLists();
      if (!lists) {
        return res.status(400).send({
          success: false,
          message: 'no lists exist in the database'
        });
      }
    }
    const page = req.query?.page;
    const size = req.query?.size;
    const data = { page, size };

    const lists = await listService.getListByPage(data);
    if (!lists) {
      return res.status(400).send({
        success: false,
        message: 'no lists exist in the database'
      });
    }
    return res.status(200).send({
      success: true,
      data: lists
    });
  }
}

export default new ListController();
