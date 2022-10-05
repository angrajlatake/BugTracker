import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  tasks: null,
};

export const TasksContext = createContext(INITIAL_STATE);

const TasksReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_TASKS":
      return { tasks: action.payload };
    default:
      return state;
  }
};

export const TasksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TasksReducer, INITIAL_STATE);
  return (
    <TasksContext.Provider value={{ tasks: state.tasks, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};
