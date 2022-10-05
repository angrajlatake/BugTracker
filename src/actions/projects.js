import * as api from "../api";
export const getProjects = async () => {
  try {
    const { data } = await api.getProjects();
    console.log(data);
    return { type: "FETCH_PROJECTS", payload: data };
  } catch (err) {
    console.log(err.message);
  }
};

export const setSelectedProject = (project) => {
  return { type: "SELECT_PROJECT", payload: project };
};
