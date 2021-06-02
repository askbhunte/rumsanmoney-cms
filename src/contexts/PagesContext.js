import React, { createContext, useReducer } from "react";
import pagesReduce from "../reducers/pagesReducer";
import * as Service from "../services/pages";
import ACTION from "../actions/pages";

const initialState = {
  pages: [],
  pagination: { total: 0, limit: 20, start: 0, currentPage: 1, totalPages: 0 },
  pages_details: null,
  loading: false,
};

export const PagesContext = createContext(initialState);
export const PagesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pagesReduce, initialState);

  function setLoading() {
    dispatch({ type: ACTION.SET_LOADING });
  }

  function resetLoading() {
    dispatch({ type: ACTION.RESET_LOADING });
  }

  function getPagesDetails(pagesId) {
    return new Promise((resolve, reject) => {
      Service.getPagesDetails(pagesId)
        .then((res) => {
          dispatch({ type: ACTION.GET_PAGES_SUCCESS, res });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function listPages(query) {
    return new Promise((resolve, reject) => {
      Service.listPages(query)
        .then((res) => {
          dispatch({ type: ACTION.LIST_SUCCESS, res });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function updatePages(pagesId, payload) {
    return new Promise((resolve, reject) => {
      Service.updatePages(pagesId, payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  const addPages = async (payload) => {
    payload.slug = payload.name
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, "");
    let check_slug = await Service.getBySlug(payload.slug);
    if (check_slug) {
      throw new Error("This page already exists !!");
    }
    let d = await Service.addPages(payload);
    return d;
  };

  const deletePage = async (id) => {
    return new Promise((resolve, reject) => {
      Service.deletePage(id)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  return (
    <PagesContext.Provider
      value={{
        pages: state.pages,
        loading: state.loading,
        pagination: state.pagination,
        pages_details: state.pages_details,
        listPages,
        setLoading,
        resetLoading,
        addPages,
        updatePages,
        getPagesDetails,
        deletePage,
      }}
    >
      {children}
    </PagesContext.Provider>
  );
};
