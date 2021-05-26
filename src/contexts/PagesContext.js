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

    const addPages = async (event, content) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        let payload = {
            name: formData.get("name"),
            content: formData.get("content"),
            status: formData.get("status")
        };
        let d = await Service.addPages(payload);
        return d;
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
            }}
        >
            {children}
        </PagesContext.Provider>
    );
};
