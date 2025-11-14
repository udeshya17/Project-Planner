const express = require('express')
const { authRequired } = require('../middleware/auth')
const taskController = require('../controllers/task.controller')
const { validate } = require('../middleware/validate')
const {
  createTaskSchema,
  updateTaskSchema
} = require('../validation/task.validation')

const router = express.Router()

router.use(authRequired)

router.post(
  '/:projectId/tasks',
  validate(createTaskSchema),
  taskController.create
)

router.patch('/:id', validate(updateTaskSchema), taskController.update)

router.delete('/:id', taskController.remove)

module.exports = router


