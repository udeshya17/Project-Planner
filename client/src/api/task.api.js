import api from "./axios";

export async function createTask(projectId, payload) {
  const { data } = await api.post(`/tasks/${projectId}/tasks`, payload);
  return data;
}

export async function updateTask(taskId, payload) {
  const { data } = await api.patch(`/tasks/${taskId}`, payload);
  return data;
}

export async function deleteTask(taskId) {
  await api.delete(`/tasks/${taskId}`);
}
