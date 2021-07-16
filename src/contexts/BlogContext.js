import React, { createContext, useReducer } from "react";
import blogReduce from "../reducers/blogReducer";
import * as Service from "../services/blogs";
import ACTION from "../actions/blog";

const initialState = {
  blog: [],
  pagination: { total: 0, limit: 20, start: 0, currentPage: 1, totalPages: 0 },
  blog_details: null,
  loading: false,
};

export const BlogContext = createContext(initialState);
export const BlogContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReduce, initialState);

  function setLoading() {
    dispatch({ type: ACTION.SET_LOADING });
  }

  function resetLoading() {
    dispatch({ type: ACTION.RESET_LOADING });
  }

  function getBlogDetails(blogId) {
    return new Promise((resolve, reject) => {
      Service.getBlogDetails(blogId)
        .then((res) => {
          dispatch({ type: ACTION.GET_BLOG_SUCCESS, res });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function listBlog(query) {
    return new Promise((resolve, reject) => {
      Service.listBlogs(query)
        .then((res) => {
          dispatch({ type: ACTION.LIST_SUCCESS, res });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  const addBlogs = async (payload) => {
    let d = await Service.addBlog(payload);
    return d;
  };

  function updateBlog(blogId, payload) {
    return new Promise((resolve, reject) => {
      Service.updateBlog(blogId, payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function deleteBlog(id){
    return new Promise((resolve, reject) => {
      Service.deleteBlog(id)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  return (
    <BlogContext.Provider
      value={{
        blog: state.blog,
        loading: state.loading,
        pagination: state.pagination,
        blog_details: state.blog_details,
        listBlog,
        setLoading,
        resetLoading,
        addBlogs,
        updateBlog,
        getBlogDetails,
        deleteBlog
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
