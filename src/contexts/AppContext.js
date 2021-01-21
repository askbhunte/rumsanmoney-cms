import React, { createContext, useReducer } from "react";
import appReduce from "../reducers/appReducer";

const initialState = {
  settings: {
    activeDir: "ltr",
    activeThemeLayout: "vertical",
    activeTheme: "light",
    activeSidebarType: "full",
    activeLogoBg: "skin6",
    activeNavbarBg: "skin1",
    activeSidebarBg: "skin6",
    activeSidebarPos: "fixed",
    activeHeaderPos: "fixed",
    activeLayout: "full",
  },
};

export const AppContext = createContext(initialState);
export const AppContextProvider = ({ children }) => {
  const [state] = useReducer(appReduce, initialState);

  return (
    <AppContext.Provider
      value={{
        settings: state.settings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
