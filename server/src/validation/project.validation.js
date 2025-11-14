const Joi = require('joi')

const createProjectSchema = Joi.object({
  title: Joi.string().trim().min(1).required(),
  description: Joi.string().allow('', null)
})

const updateProjectSchema = Joi.object({
  title: Joi.string().trim().min(1),
  description: Joi.string().allow('', null)
}).min(1)

const addMemberSchema = Joi.object({
  email: Joi.string().email().required()
})

module.exports = {
  createProjectSchema,
  updateProjectSchema,
  addMemberSchema
}


