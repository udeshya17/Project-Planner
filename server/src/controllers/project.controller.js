const {
  createProject,
  getProjectsForUser,
  getProjectWithTasks,
  updateProject,
  deleteProject,
  addMemberByEmail
} = require('../services/project.service')

async function create (req, res, next) {
  try {
    const { title, description } = req.body
    const project = await createProject({
      title,
      description,
      ownerId: req.user._id
    })
    res.status(201).json(project)
  } catch (err) {
    next(err)
  }
}

async function listForUser (req, res, next) {
  try {
    const projects = await getProjectsForUser(req.user._id)
    res.json(projects)
  } catch (err) {
    next(err)
  }
}

async function getDetails (req, res, next) {
  try {
    const data = await getProjectWithTasks({
      projectId: req.params.id,
      userId: req.user._id
    })
    res.json(data)
  } catch (err) {
    next(err)
  }
}

async function update (req, res, next) {
  try {
    const project = await updateProject({
      projectId: req.params.id,
      userId: req.user._id,
      data: req.body
    })
    res.json(project)
  } catch (err) {
    next(err)
  }
}

async function remove (req, res, next) {
  try {
    await deleteProject({
      projectId: req.params.id,
      userId: req.user._id
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}

async function addMember (req, res, next) {
  try {
    const project = await addMemberByEmail({
      projectId: req.params.id,
      ownerId: req.user._id,
      email: req.body.email
    })
    res.json(project)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  create,
  listForUser,
  getDetails,
  update,
  remove,
  addMember
}


