const Joi = require('joi')

const allowedStatuses = ['todo', 'in_progress', 'completed']

const createTaskSchema = Joi.object({
  title: Joi.string().trim().min(1).required(),
  description: Joi.string().allow('', null),
  assignedTo: Joi.string().hex().length(24).allow(null),
  status: Joi.string().valid(...allowedStatuses).default('todo'),
  dueDate: Joi.date().iso().allow(null)
})

const updateTaskSchema = Joi.object({
  title: Joi.string().trim().min(1),
  description: Joi.string().allow('', null),
  assignedTo: Joi.string().hex().length(24).allow(null),
  status: Joi.string().valid(...allowedStatuses),
  dueDate: Joi.date().iso().allow(null)
}).min(1)

module.exports = {
  createTaskSchema,
  updateTaskSchema
}


