import api from "./axios";

export async function signupRequest(payload) {
  const { data } = await api.post("/auth/signup", payload);
  return data;
}

export async function loginRequest(payload) {
  const { data } = await api.post("/auth/login", payload);
  return data;
}

export async function tokenRequest(payload) {
  const { data } = await api.post("/auth/token", payload);
  return data;
}
