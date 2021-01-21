import React, { createContext, useReducer } from "react";
import userReduce from "../reducers/userReducer";
import * as Service from "../services/users";

const initialState = {
  user_info: {},
  list: [],
  pagination: { limit: 10, start: 0, total: 0, currentPage: 1, totalPages: 0 },
};

export const UserContext = createContext(initialState);
export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReduce, initialState);
  function userLogin(payload) {
    return Service.login(payload);
  }

  return (
    <UserContext.Provider
      value={{
        userLogin,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
