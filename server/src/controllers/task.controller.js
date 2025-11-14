const { createTask, updateTask, deleteTask } = require('../services/task.service')

async function create (req, res, next) {
  try {
    const task = await createTask({
      projectId: req.params.projectId,
      userId: req.user._id,
      data: req.body
    })
    res.status(201).json(task)
  } catch (err) {
    next(err)
  }
}

async function update (req, res, next) {
  try {
    const task = await updateTask({
      taskId: req.params.id,
      userId: req.user._id,
      data: req.body
    })
    res.json(task)
  } catch (err) {
    next(err)
  }
}

async function remove (req, res, next) {
  try {
    await deleteTask({
      taskId: req.params.id,
      userId: req.user._id
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}

module.exports = {
  create,
  update,
  remove
}


