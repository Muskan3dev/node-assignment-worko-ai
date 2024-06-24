const joi = require("joi");

exports.validateUser = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    name: joi.string().required(),
    age: joi.number().required(),
    city: joi.string().required(),
    zipCode: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};
