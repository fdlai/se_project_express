const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports.validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'The "imageUrl" field must be a valid url',
    }),

    weather: Joi.string().required().valid("hot", "warm", "cold"),
  }),
});

module.exports.validateCreateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().allow("").optional().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
    }),

    avatar: Joi.string().allow("").optional().custom(validateURL).messages({
      "string.uri": 'The "avatar" field must be a valid URL',
    }),

    email: Joi.string().required().email().messages({
      "string.base": '"Email" must be a string',
      "string.empty": 'The "email" field must be filled in',
      "string.email": "Invalid email format",
    }),
    password: Joi.string().required().messages({
      "string.base": '"Password" must be a string',
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.base": '"Email" must be a string',
      "string.empty": 'The "email" field must be filled in',
      "string.email": "Invalid email format",
    }),

    password: Joi.string().required().messages({
      "string.base": '"Password" must be a string',
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required(),
  }),
});

module.exports.validateUpdateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().allow("").optional().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
    }),

    avatar: Joi.string().allow("").optional().custom(validateURL).messages({
      "string.uri": 'The "avatar" field must be a valid URL',
    }),
  }),
});
