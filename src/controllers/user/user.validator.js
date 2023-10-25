const Joi = require('joi');

exports.getOtherUserProfile = {
  body: {
    userId: Joi.number().required(),
  },
};

exports.changePassword = {
  body: {
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
  },
};

exports.register = {
  body: {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required(),
  },
};

// schema for elogin api
exports.employeeLogin = {
  body: {
    email: Joi.string().trim().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
    device_id:Joi.string().optional().allow("").label("Device ID")
  },
};
