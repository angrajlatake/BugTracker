import axios from "axios";

const url = process.env.REACT_APP_API_URL;
const config = {
  withCredentials: true,
  credentials: "include",
};

export const login = async (credentials) =>
  await axios.post(`${url}/auth/login`, credentials, config);

export const register = async (credentials) =>
  await axios.post(`${url}/auth/register`, credentials, config);

export const getTasksByUser = async (id) =>
  await axios.get(`${url}/task/user/${id}`, config);

export const getTask = async (id) =>
  await axios.get(`${url}/task/${id}`, config);

export const getUser = async (id) =>
  await axios.get(`${url}/user/${id}`, config);

export const getProjects = async () =>
  await axios.get(`${url}/projects`, config);

export const getTasksByProject = async (id) =>
  await axios.get(`${url}/task/byproject/${id}`, config);

export const getAllTasks = async (id) => await axios.get(`${url}/task`, config);

export const updateUser = async (id, data) =>
  await axios.put(`${url}/user/${id}`, data, config);
