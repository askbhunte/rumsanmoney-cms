import React, { createContext, useReducer } from "react";
import userReduce from "../reducers/userReducer";
import * as Service from "../services/users";

const initialState = {
  user_info: {},
};

export const UserContext = createContext(initialState);
export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReduce, initialState);

  function getUser() {
    return new Promise((resolve, reject) => {
      Service.getUser()
        .then((res) => {
          dispatch({ type: "GET_USER_DETAILS", res });
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
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
