import React, { createContext, useReducer } from "react";
import categoryReduce from "../reducers/categoryReducer";
import * as Service from "../services/categories";
import ACTION from "../actions/category";

const initialState = {
  category: [],
  pagination: { total: 0, limit: 20, start: 0, currentPage: 1, totalPages: 0 },
  category_details: null,
  loading: false,
};

export const CategoryContext = createContext(initialState);
export const CategoryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(categoryReduce, initialState);

  function setLoading() {
    dispatch({ type: ACTION.SET_LOADING });
  }

  function resetLoading() {
    dispatch({ type: ACTION.RESET_LOADING });
  }

  function getCategoryDetails(categoryId) {
    return new Promise((resolve, reject) => {
      Service.getCategoryDetails(categoryId)
        .then((res) => {
          dispatch({ type: ACTION.GET_CATEGORY_SUCCESS, res });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function listCategory(query) {
    return new Promise((resolve, reject) => {
      Service.listCategory(query)
        .then((res) => {
          dispatch({ type: ACTION.LIST_SUCCESS, res });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function updateCategory(categoryId, payload) {
    return new Promise((resolve, reject) => {
      Service.updateCategory(categoryId, payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  const addCategory = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    let payload = {
      name: formData.get("name"),
      icon: formData.get("icon"),
      required_docs: formData.get('required_docs')
    };
    let d = await Service.addCategory(payload);
    return d;
  };

  return (
    <CategoryContext.Provider
      value={{
        category: state.category,
        loading: state.loading,
        pagination: state.pagination,
        category_details: state.category_details,
        listCategory,
        setLoading,
        resetLoading,
        addCategory,
        updateCategory,
        getCategoryDetails,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
