import { useCallback, useEffect, useState } from "react";
import { createTask, deleteTask, updateTask } from "../api/task.api";
import { fetchProjectDetails } from "../api/project.api";
import { useUI } from "../context/UIContext";

const STATUSES = ["todo", "in_progress", "completed"];

export function useTasks(projectId) {
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useUI();

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchProjectDetails(projectId);
      setProject(data.project);
      setTasks(data.tasks || []);
    } catch (err) {
      addToast({
        type: "error",
        title: "Could not load project",
        message: err?.response?.data?.message || err.message,
      });
    } finally {
      setIsLoading(false);
    }
  }, [projectId, addToast]);

  useEffect(() => {
    if (projectId) {
      load();
    }
  }, [projectId, load]);

  const handleCreate = useCallback(
    async (payload) => {
      const optimistic = {
        ...payload,
        _id: `tmp-${Date.now()}`,
        status: payload.status || "todo",
      };
      setTasks((prev) => [optimistic, ...prev]);
      try {
        const created = await createTask(projectId, payload);
        setTasks((prev) =>
          prev.map((t) => (t._id === optimistic._id ? created : t))
        );
        addToast({
          type: "success",
          title: "Task created",
          message: payload.title,
        });
      } catch (err) {
        setTasks((prev) => prev.filter((t) => t._id !== optimistic._id));
        addToast({
          type: "error",
          title: "Could not create task",
          message: err?.response?.data?.message || err.message,
        });
      }
    },
    [projectId, addToast]
  );

  const handleUpdate = useCallback(
    async (taskId, changes) => {
      const prevTasks = tasks;
      setTasks((current) =>
        current.map((t) => (t._id === taskId ? { ...t, ...changes } : t))
      );
      try {
        const updated = await updateTask(taskId, changes);
        setTasks((current) =>
          current.map((t) => (t._id === taskId ? updated : t))
        );
      } catch (err) {
        setTasks(prevTasks);
        addToast({
          type: "error",
          title: "Could not update task",
          message: err?.response?.data?.message || err.message,
        });
      }
    },
    [tasks, addToast]
  );

  const handleDelete = useCallback(
    async (taskId) => {
      const prevTasks = tasks;
      setTasks((current) => current.filter((t) => t._id !== taskId));
      try {
        await deleteTask(taskId);
        addToast({ type: "success", title: "Task deleted" });
      } catch (err) {
        setTasks(prevTasks);
        addToast({
          type: "error",
          title: "Could not delete task",
          message: err?.response?.data?.message || err.message,
        });
      }
    },
    [tasks, addToast]
  );

  const tasksByStatus = STATUSES.reduce(
    (acc, status) => ({
      ...acc,
      [status]: tasks.filter((t) => t.status === status),
    }),
    {}
  );

  const completion =
    tasks.length === 0
      ? 0
      : Math.round(
          (tasks.filter((t) => t.status === "completed").length /
            tasks.length) *
            100
        );

  return {
    project,
    tasks,
    tasksByStatus,
    isLoading,
    completion,
    reload: load,
    createTask: handleCreate,
    updateTask: handleUpdate,
    deleteTask: handleDelete,
  };
}
