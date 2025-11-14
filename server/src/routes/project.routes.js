const express = require('express')
const { authRequired } = require('../middleware/auth')
const projectController = require('../controllers/project.controller')
const { validate } = require('../middleware/validate')
const {
  createProjectSchema,
  updateProjectSchema,
  addMemberSchema
} = require('../validation/project.validation')

const router = express.Router()

router.use(authRequired)

router.post('/', validate(createProjectSchema), projectController.create)

router.get('/', projectController.listForUser)

router.get('/:id', projectController.getDetails)

router.patch('/:id', validate(updateProjectSchema), projectController.update)

router.delete('/:id', projectController.remove)

router.post(
  '/:id/members',
  validate(addMemberSchema),
  projectController.addMember
)

module.exports = router


