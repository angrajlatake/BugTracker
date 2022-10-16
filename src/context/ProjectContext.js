import { createContext, useEffect, useMemo, useReducer } from "react";

const INITIAL_STATE = {
  projects: null,
  selectedProject:
    JSON.parse(sessionStorage.getItem("selectedProject")) || null,
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
  const value = useMemo(
    () => ({
      dispatch,
      projects: state.projects,
      selectedProject: state.selectedProject,
    }),
    [state.projects, state.selectedProject]
  );

  useEffect(() => {
    sessionStorage.setItem(
      "selectedProject",
      JSON.stringify(state.selectedProject)
    );
  }, [state.selectedProject]);
  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};
