import api from "./axios";

export async function fetchProjects() {
  const { data } = await api.get("/projects");
  return data;
}

export async function createProject(payload) {
  const { data } = await api.post("/projects", payload);
  return data;
}

export async function fetchProjectDetails(projectId) {
  const { data } = await api.get(`/projects/${projectId}`);
  return data;
}

export async function updateProject(projectId, payload) {
  const { data } = await api.patch(`/projects/${projectId}`, payload);
  return data;
}

export async function deleteProject(projectId) {
  await api.delete(`/projects/${projectId}`);
}

export async function addMember(projectId, payload) {
  const { data } = await api.post(`/projects/${projectId}/members`, payload);
  return data;
}
