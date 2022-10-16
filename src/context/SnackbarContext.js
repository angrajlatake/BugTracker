import { createContext, useEffect, useMemo, useReducer } from "react";

const INITIAL_STATE = {
  SnackStatus: null,
  SnackMessage: null,
};

export const SnackbarContext = createContext(INITIAL_STATE);

const SnackbarReducer = (state, action) => {
  switch (action.type) {
    case "SET_SNACK":
      return {
        SnackStatus: action.payload.status,
        SnackMessage: action.payload.message,
      };
    case "REMOVE_SNACK":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SnackbarContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SnackbarReducer, INITIAL_STATE);

  const value = useMemo(
    () => ({
      dispatch,
      SnackStatus: state.SnackStatus,
      SnackMessage: state.SnackMessage,
    }),
    [state]
  );
  useEffect(() => {
    console.log("context changed");
  }, [state.SnackStatus]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  );
};
