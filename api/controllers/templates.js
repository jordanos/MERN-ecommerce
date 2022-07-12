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
    // below variables are used to build query later
    this.totalCount = 0;
    this.filter = {};
    this.sort = null;
    this.populate = [];
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
    this.req.query.page = this.req.query.page - 1 || 0;
    this.req.query.page = parseInt(this.req.query.page, 10);

    const query = this.model.find(this.filter);

    // build quiery using chaining
    if (this.sort) query.sort(this.sort);
    if (this.populate.length > 0)
      this.populate.forEach((populate) => query.populate(populate));

    // generate pagination
    query.limit(this.req.query.limit);
    query.skip(this.req.query.page * this.req.query.limit);
    // run query
    this.doc = await query.exec();

    this.totalCount = await this.model.count(this.filter);
    this.pageCount = Math.ceil(this.totalCount / this.req.query.limit);
  }

  performReq() {
    // const url = `${this.req.protocol}://${this.req.get('host')}${
    //   this.req.originalUrl
    // }`;
    const hasMore =
      (this.req.query.page * this.req.query.limit) / this.req.query.limit + 1 <
      this.pageCount;
    this.res.status(200).json({
      count: this.totalCount,
      hasMore,
      next: hasMore ? this.req.query.page + 2 : null,
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
    this.res.status(201).json(this.doc);
  }
};

exports.GetOne = class GetOne extends BaseTemplate {
  async doMongo() {
    const { id } = this.req.params;
    validateId(id);

    const query = this.model.findById(id);
    // build quiery using chaining
    if (this.populate.length > 0)
      this.populate.forEach((populate) => query.populate(populate));
    this.doc = await query.exec();
  }

  performReq() {
    // throw exception if doc is null/not found
    if (!this.doc) {
      throw new CustomError(
        `${this.modelName} id ${this.req.params.id} not found`,
        404
      );
    }
    this.res.status(200).json(this.doc);
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

    this.res.status(200).json(this.doc);
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
    this.res.status(200).json(this.doc);
  }
};
