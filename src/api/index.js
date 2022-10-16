import axios from "axios";

const url = process.env.REACT_APP_API_URL;
const config = {
  withCredentials: true,
};

export const login = async (credentials) =>
  await axios.post(`${url}/auth/login`, credentials, config);

export const register = async (credentials) =>
  await axios.post(`${url}/auth/register`, credentials, config);

export const getTasksByUser = async (id) =>
  await axios.get(`${url}/task/user/${id}`, config);

export const getTask = async (id) =>
  await axios.get(`${url}/task/${id}`, config);

export const updateTask = async (id, data) =>
  await axios.put(`${url}/task/${id}`, data, config);

export const deleteTask = async (id, projectId) =>
  await axios.delete(`${url}/task/${id}/${projectId}`, config);

export const getUser = async (id) =>
  await axios.get(`${url}/user/${id}`, config);

export const getProjects = async () =>
  await axios.get(`${url}/projects`, config);

export const postProjects = async (data) =>
  await axios.post(`${url}/projects`, data, config);

export const getTasksByProject = async (id) =>
  await axios.get(`${url}/task/byproject/${id}`, config);

export const getAllTasks = async (id) => await axios.get(`${url}/task`, config);

export const updateUser = async (id, data) =>
  await axios.put(`${url}/user/${id}`, data, config);

export const postTask = async (id, data) =>
  await axios.post(`${url}/task/${id}`, data, config);

export const getToDo = async (id) =>
  await axios.get(`${url}/todo/${id}`, config);
export const updateToDo = async (id, data) =>
  await axios.put(`${url}/todo/${id}`, data, config);
export const createToDo = async (id, data) =>
  await axios.post(`${url}/todo/${id}`, data, config);
export const deleteToDo = async (id) =>
  await axios.delete(`${url}/todo/${id}`, config);
