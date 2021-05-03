import React, { createContext, useReducer } from "react";
import userReduce from "../reducers/userReducer";
import * as Service from "../services/users";
import ACTION from "../actions/user";

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

  function listUsers(query) {
    return new Promise((resolve, reject) => {
      Service.listUsers(query)
        .then((res) => {
          dispatch({ type: ACTION.LIST_SUCCESS, res });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  return (
    <UserContext.Provider
      value={{
        user_info: state.user_info,
        list: state.list,
        pagination: state.pagination,
        userLogin,
        listUsers,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
