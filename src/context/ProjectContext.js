import { createContext, useState, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  projects: null,
  selectedProject: null,
};

export const ProjectContext = createContext(INITIAL_STATE);

const ProjectReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PROJECTS":
      return { ...state, projects: action.payload };
    case "SELECT_PROJECT":
      return { ...state, selectedProject: action.payload };
    default:
      return state;
  }
};

export const ProjectContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProjectReducer, INITIAL_STATE);
  return (
    <ProjectContext.Provider
      value={{
        dispatch,
        projects: state.projects,
        selectedProject: state.selectedProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
