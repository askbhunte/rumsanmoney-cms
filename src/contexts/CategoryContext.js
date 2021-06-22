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

  function changeFeatured(id, status) {
    return new Promise((resolve, reject) => {
      Service.changeFeatured(id, status)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function changePopular(id, status) {
    return new Promise((resolve, reject) => {
      Service.changePopular(id, status)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function changeStatus(id,status){
    return new Promise((resolve,reject) =>{
      Service.changeStatus(id,status)
        .then((res)=>{
          resolve(res);
        })
        .catch((err)=>{
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
      required_docs: formData.get('required_docs'),
      extras: formData.get('extras')
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
        changeFeatured,
        changePopular,
        changeStatus,
        updateCategory,
        getCategoryDetails,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
