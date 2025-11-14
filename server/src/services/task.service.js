const Task = require('../models/Task.model')
const { ensureProjectMember } = require('./project.service')
const ApiError = require('../utils/ApiError')

async function createTask ({ projectId, userId, data }) {
  await ensureProjectMember(userId, projectId)

  const { title, description, assignedTo, status, dueDate } = data
  const task = await Task.create({
    project: projectId,
    title,
    description,
    assignedTo: assignedTo || undefined,
    status: status || 'todo',
    dueDate: dueDate || undefined
  })
  return task
}

async function updateTask ({ taskId, userId, data }) {
  const task = await Task.findById(taskId)
  if (!task) {
    throw new ApiError(404, 'Task not found')
  }

  await ensureProjectMember(userId, task.project)

  const { title, description, assignedTo, status, dueDate } = data
  if (title !== undefined) task.title = title
  if (description !== undefined) task.description = description
  if (assignedTo !== undefined) task.assignedTo = assignedTo
  if (status !== undefined) task.status = status
  if (dueDate !== undefined) task.dueDate = dueDate

  await task.save()
  return task
}

async function deleteTask ({ taskId, userId }) {
  const task = await Task.findById(taskId)
  if (!task) {
    throw new ApiError(404, 'Task not found')
  }

  await ensureProjectMember(userId, task.project)
  await task.deleteOne()
}

module.exports = {
  createTask,
  updateTask,
  deleteTask
}


