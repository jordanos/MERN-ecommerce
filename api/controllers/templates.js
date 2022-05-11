/* eslint-disable max-classes-per-file */
const CustomError = require('../utils/CustomError');
const { validateId } = require('../utils/validators');

class BaseTemplate {
  constructor(req, res, next, model, modelName) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.model = model;
    this.modelName = modelName;
    // if filter is set to some value, it will be used in sub classes
    this.filter = {};
    this.sort = {};
  }

  // do database stuff and save the result in this.doc, and must get implemented in sub classes
  static async doMongo() {
    throw new Error(
      'No function has been implemented to perform the doMongo()'
    );
  }

  // perform the request.. this must get implemented in sub classes
  static performReq() {
    throw new Error('No function has been implemented to performReq()');
  }

  // It gets called by controllers torun the request

  async execute() {
    try {
      await this.doMongo();
      if (this.transform) {
        this.doc = await this.transform();
      }
      return this.performReq();
    } catch (e) {
      return this.next(e);
    }
  }
}

exports.GetAll = class GetAll extends BaseTemplate {
  async doMongo() {
    this.req.query.skip = this.req.query.skip || 0;
    this.req.query.skip = parseInt(this.req.query.skip, 10);

    this.doc = await this.model
      .find(this.filter)
      .sort(this.sort)
      .limit(this.req.query.limit)
      .skip(this.req.query.skip)
      .exec();

    const itemCount = await this.model.count({});
    this.pageCount = Math.ceil(itemCount / this.req.query.limit);
  }

  performReq() {
    this.res.status(200).json({
      hasMore: this.req.query.skip / this.req.query.limit + 1 < this.pageCount,
      skip: this.req.query.skip + this.req.query.limit,
      data: this.doc,
    });
  }
};

exports.CreateOne = class CreateOne extends BaseTemplate {
  async doMongo() {
    // validate user data
    await this.validate(this.req);
    this.doc = await this.model.create(this.req.body);
  }

  performReq() {
    this.res.status(201).json({
      data: this.doc,
    });
  }
};

exports.GetOne = class GetOne extends BaseTemplate {
  async doMongo() {
    const { id } = this.req.params;
    validateId(id);

    this.doc = await this.model.findById(id);
  }

  performReq() {
    // throw exception if doc is null/not found
    if (!this.doc) {
      throw new CustomError(
        `${this.modelName} id ${this.req.params.id} not found`,
        404
      );
    }
    this.res.status(200).json({
      data: this.doc,
    });
  }
};

exports.UpdateOne = class UpdateOne extends BaseTemplate {
  async doMongo() {
    const { id } = this.req.params;
    validateId(id);
    // validate input data
    await this.validate(this.req);

    this.filter = { _id: id };
    const update = this.req.body;
    this.doc = await this.model.findOneAndUpdate(this.filter, update, {
      new: true,
    });
  }

  performReq() {
    // throw exception if doc is null/not found
    if (!this.doc)
      throw new CustomError(
        `${this.modelName} id ${this.req.params.id} not found`,
        404
      );

    this.res.status(200).json({
      data: this.doc,
    });
  }
};

exports.DeleteOne = class DeleteOne extends BaseTemplate {
  async doMongo() {
    const { id } = this.req.params;
    validateId(id);

    this.filter = { _id: id };
    this.doc = await this.model.deleteOne(this.filter);
  }

  performReq() {
    this.res.status(200).json({
      data: this.doc,
    });
  }
};
