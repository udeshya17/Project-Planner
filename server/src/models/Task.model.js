const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
  {
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: {
      type: String,
      enum: ['todo', 'in_progress', 'completed'],
      default: 'todo'
    },
    dueDate: { type: Date }
  },
  { timestamps: true }
)

const Task = mongoose.model('Task', taskSchema)

module.exports = Task

 