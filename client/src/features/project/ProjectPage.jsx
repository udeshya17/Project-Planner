import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTasks } from '../../hooks/useTasks'
import Spinner from '../../components/loader/Spinner'
import ProjectPlanner from './ProjectPlanner'
import AddTaskModal from './AddTaskModal'
import AddMemberModal from './AddMemberModal'
import DeleteProjectModal from './DeleteProjectModal'
import { deleteProject } from '../../api/project.api'
import { useUI } from '../../context/UIContext'

function ProjectPage () {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const { addToast } = useUI()
  const {
    project,
    tasksByStatus,
    isLoading,
    completion,
    createTask,
    updateTask,
    deleteTask
  } = useTasks(projectId)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [showMemberModal, setShowMemberModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleStatusChange = async (taskId, status) => {
    await updateTask(taskId, { status })
    addToast({
      type: 'success',
      title: 'Task updated',
      message: `Status changed to ${status.replace('_', ' ')}`
    })
  }

  const handleDeleteTask = async (task) => {
    await deleteTask(task._id)
  }

  const handleDeleteProject = async () => {
    if (!project) return
    try {
      await deleteProject(project._id)
      addToast({
        type: 'success',
        title: 'Project deleted'
      })
      navigate('/', { replace: true })
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Could not delete project',
        message: err?.response?.data?.message || err.message
      })
    } finally {
      setShowDeleteModal(false)
    }
  }

  if (isLoading && !project) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="glass-panel px-6 py-10 text-center">
        <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
          Project could not be found.
        </p>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-4 rounded-md border border-slate-300 px-3 py-1.5 text-xs text-slate-700 hover:border-brand-400 hover:text-brand-700 dark:border-slate-700 dark:text-slate-200 dark:hover:text-brand-100"
        >
          Back
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6">
        <div>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1 rounded-md border border-slate-300 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:border-brand-400 hover:text-brand-700 dark:border-slate-700 dark:text-slate-200 dark:hover:text-brand-100"
          >
            <span className="text-xs" aria-hidden="true">
              ←
            </span>
            <span>Back to projects</span>
          </button>
        </div>

        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Project
            </p>
            <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              {project.title}
            </h1>
            {project.description && (
              <p className="mt-1 max-w-xl text-xs text-slate-600 dark:text-slate-400">
                {project.description}
              </p>
            )}
            <div className="mt-4 flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
              <span>Progress</span>
              <div className="h-1.5 w-40 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-500"
                  style={{ width: `${completion}%` }}
                />
              </div>
              <span className="font-semibold text-brand-600 dark:text-brand-300">
                {completion}%
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => setShowMemberModal(true)}
              className="rounded-md border border-slate-300 px-3 py-1.5 text-xs text-slate-700 hover:border-brand-400 hover:text-brand-700 dark:border-slate-700 dark:text-slate-200 dark:hover:text-brand-100"
            >
              Add member
            </button>
            <button
              type="button"
              onClick={() => setShowTaskModal(true)}
              className="rounded-md bg-brand-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-400"
            >
              New task
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="rounded-md border border-red-500 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 dark:border-red-600/70 dark:text-red-200 dark:hover:bg-red-900/40"
            >
              Delete project
            </button>
          </div>
        </header>

        <ProjectPlanner
          tasksByStatus={tasksByStatus}
          onStatusChange={handleStatusChange}
          onDeleteTask={handleDeleteTask}
        />
      </div>

      {showTaskModal && (
        <AddTaskModal
          onClose={() => setShowTaskModal(false)}
          onCreate={createTask}
        />
      )}

      {showMemberModal && (
        <AddMemberModal
          projectId={project._id}
          onClose={() => setShowMemberModal(false)}
          onAdded={() => {}}
        />
      )}

      {showDeleteModal && (
        <DeleteProjectModal
          projectTitle={project.title}
          onConfirm={handleDeleteProject}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </>
  )
}

export default ProjectPage


