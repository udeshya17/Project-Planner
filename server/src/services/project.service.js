const Project = require('../models/Project.model')
const Task = require('../models/Task.model')
const User = require('../models/User.model')
const ApiError = require('../utils/ApiError')

async function createProject ({ title, description, ownerId }) {
  const project = await Project.create({
    title,
    description,
    owner: ownerId,
    members: [ownerId]
  })
  return project
}

async function getProjectsForUser (userId) {
  const projects = await Project.find({
    members: userId
  }).sort({ createdAt: -1 })
  return projects
}

async function getProjectWithTasks ({ projectId, userId }) {
  const project = await Project.findOne({
    _id: projectId,
    members: userId
  })
  if (!project) {
    throw new ApiError(404, 'Project not found')
  }

  const tasks = await Task.find({ project: project._id }).sort({ createdAt: -1 })
  return { project, tasks }
}

async function updateProject ({ projectId, userId, data }) {
  const project = await Project.findById(projectId)
  if (!project) {
    throw new ApiError(404, 'Project not found')
  }
  if (project.owner.toString() !== userId.toString()) {
    throw new ApiError(403, 'Only owner can update project')
  }

  const { title, description } = data
  if (title !== undefined) project.title = title
  if (description !== undefined) project.description = description
  await project.save()
  return project
}

async function deleteProject ({ projectId, userId }) {
  const project = await Project.findById(projectId)
  if (!project) {
    throw new ApiError(404, 'Project not found')
  }
  if (project.owner.toString() !== userId.toString()) {
    throw new ApiError(403, 'Only owner can delete project')
  }

  await Task.deleteMany({ project: project._id })
  await project.deleteOne()
}

async function addMemberByEmail ({ projectId, ownerId, email }) {
  const project = await Project.findById(projectId)
  if (!project) {
    throw new ApiError(404, 'Project not found')
  }
  if (project.owner.toString() !== ownerId.toString()) {
    throw new ApiError(403, 'Only owner can add members')
  }

  const user = await User.findOne({ email: email.toLowerCase() })
  if (!user) {
    throw new ApiError(404, 'User not found')
  }

  const alreadyMember = project.members.some(
    (m) => m.toString() === user._id.toString()
  )
  if (!alreadyMember) {
    project.members.push(user._id)
    await project.save()
  }

  return project
}

async function ensureProjectMember (userId, projectId) {
  const project = await Project.findById(projectId)
  if (!project) {
    throw new ApiError(404, 'Project not found')
  }
  const isMember = project.members.some((m) => m.toString() === userId.toString())
  if (!isMember) {
    throw new ApiError(403, 'Only project members can modify tasks')
  }
  return project
}

module.exports = {
  createProject,
  getProjectsForUser,
  getProjectWithTasks,
  updateProject,
  deleteProject,
  addMemberByEmail,
  ensureProjectMember
}


