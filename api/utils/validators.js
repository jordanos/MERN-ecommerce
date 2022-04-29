const Joi = require('joi');
const CustomError = require('./CustomError');

const userSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string()
    .length(12)
    .pattern(/^[0-9]+$/)
    .required(),
  password: Joi.string().min(6).required(),
});
 const productSchema = Joi.object({
 name: Joi.string().required(),
 price: Joi.number().required(),
 quantity: Joi.number().integer().required(),
 brand:  Joi.string().required(),
 description: Joi.string().required(),
 productCondition: Joi.string().required(),

});
const CategorySchema = Joi.object({
name:Joi.string().required()
})


const followSchema = Joi.object({
  followerId: Joi.string().hex().length(24).required(),
  followingId: Joi.string().hex().length(24).required(),
});

const adminSchema = Joi.object({
  owner: Joi.string().required(),
});

const idSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

// schema options
const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

exports.validateUserInput = (req) => {
  const { error } = userSchema.validate(req.body, options);
  if (error) {
    throw new CustomError(error.message, 400);
  }
};

exports.validateCategoryInput = (req)=>{
  const {error} = CategorySchema.validate(req.body,options);
  if(error){
    throw new CustomError(error.message,400)
  }
}
exports.validateProductInput = (req) => {
const {error}= productSchema.validate(req.body,options);
if(error)
{
  throw new CustomError(error.message,400)
}
};

exports.validateFollowInput = (req) => {
  const { error } = followSchema.validate(req.body, options);
  if (error) {
    throw new CustomError(error.message, 400);
  }
};

exports.validateAdminInput = (req) => {
  const { error } = adminSchema.validate(req.body, options);
  if (error) {
    throw new CustomError(error.message, 400);
  }
};

exports.validateId = (id) => {
  const { error } = idSchema.validate({ id }, options);
  if (error) {
    throw new CustomError(error.message, 400);
  }
};
