/* eslint-disable max-classes-per-file */

const {
  GetAll,
  CreateOne,
  GetOne,
  DeleteOne,
  UpdateOne,
} = require('./templates');
const ImplementaionError = require('../utils/ImplemetaionError');

class BaseAdapter {
  constructor(model, validator, name) {
    this.model = model;
    this.validator = validator;
    this.name = name;
  }

  static getAll() {
    throw new ImplementaionError();
  }

  static createOne() {
    throw new ImplementaionError();
  }

  static getOne() {
    throw new ImplementaionError();
  }

  static updateOne() {
    throw new ImplementaionError();
  }

  static deleteOne() {
    throw new ImplementaionError();
  }
}

exports.CrudController = class CrudController extends BaseAdapter {
  static getAll(req, res, next) {
    const getAll = new GetAll(req, res, next, this.model, this.name);
    getAll.execute();
  }

  createOne(req, res, next) {
    const createOne = new CreateOne(req, res, next, this.model, this.name);
    // setup a vallidaion function otherwise an error will be thrown
    createOne.validate = this.validator;

    createOne.execute();
  }

  getOne(req, res, next) {
    const getOne = new GetOne(req, res, next, this.model, this.name);
    getOne.execute();
  }

  updateOne(req, res, next) {
    const updateOne = new UpdateOne(req, res, next, this.model, this.name);
    // setup a vallidaion function otherwise an error will be thrown
    updateOne.validate = this.validator;

    updateOne.execute();
  }

  deleteOne(req, res, next) {
    const deleteOne = new DeleteOne(req, res, next, this.model, this.name);
    deleteOne.execute();
  }
};
