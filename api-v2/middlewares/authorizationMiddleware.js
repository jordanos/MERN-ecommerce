const Task = require("../models/Task");
const CustomError = require("../utils/CustomError");
const ObjectId = require("mongodb").ObjectId;
const Admin = require("../models/Admin");

// checks if a user is authorized to get/update thid user resource
exports.authorizeUser = (req, res, next) => {
  if (!(req.user.id === req.params.id))
    return next(new CustomError("Unauthorized to access this file", 403));

  return next();
};

// checks if a user is eligiable to perform oprations on a task
exports.authorizeTask = async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task || !task.owner._id.equals(new ObjectId(req.user.id)))
    return next(new CustomError("Unauthorized to access this file", 403));

  return next();
};

// Cheks if the user is an admin
exports.adminReq = async (req, res, next) => {
  //  check the user is an admin
  const admin = await Admin.findOne({ owner: new ObjectId(req.user.id) });
  if (!admin) return next(new CustomError("You must be an admin", 400));

  return next();
};
