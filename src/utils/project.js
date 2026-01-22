import api from "./api";

// GET projects (role-based from backend)
export const getProjects = async () => {
  const res = await api.get("/api/projects");
  return res.data;
};

// CREATE project (admin / manager)
export const createProject = async (data) => {
  const res = await api.post("/api/projects", data);
  return res.data;
};

// UPDATE project
export const updateProject = async (id, data) => {
  const res = await api.put(`/api/projects/${id}`, data);
  return res.data;
};

// DELETE project (admin only)
export const deleteProject = async (id) => {
  const res = await api.delete(`/api/projects/${id}`);
  return res.data;
};
