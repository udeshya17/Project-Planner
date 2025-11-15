const { createTask, updateTask, deleteTask } = require('../services/task.service')

async function create (req, res, next) {
  try {
    const task = await createTask({
      projectId: req.params.projectId,
      userId: req.user._id,
      data: req.body
    })

    const io = req.app.get('io')
    if (io) {
      io.to(`project:${req.params.projectId}`).emit('task:created', task)
    }
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

    const io = req.app.get('io')
    if (io) {
      io.to(`project:${task.project.toString()}`).emit('task:updated', task)
    }
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

    const io = req.app.get('io')
    if (io) {
      io.emit('task:deleted', { taskId: req.params.id })
    }
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


