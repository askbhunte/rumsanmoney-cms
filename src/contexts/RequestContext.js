import React, { createContext, useReducer } from "react";
import requestReduce from "../reducers/requestReducer";
import * as Service from "../services/requests";
import ACTION from "../actions/request";

const initialState = {
  request: [],
  pagination: { total: 0, limit: 20, start: 0, currentPage: 1, totalPages: 0 },
  request_details: null,
  loading: false,
};

export const RequestContext = createContext(initialState);
export const RequestContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(requestReduce, initialState);

  function setLoading() {
    dispatch({ type: ACTION.SET_LOADING });
  }

  function resetLoading() {
    dispatch({ type: ACTION.RESET_LOADING });
  }

  function getRequestDetails(requestId) {
    return new Promise((resolve, reject) => {
      Service.getRequestDetails(requestId)
        .then((res) => {
          dispatch({ type: ACTION.GET_REQUEST_SUCCESS, res });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function listRequests(query) {
    return new Promise((resolve, reject) => {
      Service.listRequests(query)
        .then((res) => {
          dispatch({ type: ACTION.LIST_SUCCESS, res });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  const addRequest = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    let payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      bank: formData.get("bank"),
      product: formData.get("product"),
      product_detail: formData.get("product_detail"),
      id: formData.get("_id"),
    };

    if (payload.id) {
      let d = await Service.updateRequest(payload.id, payload);
      d.message = "Request Updated Successfully";
      return d;
    } else {
      let d = await Service.addRequest(payload);
      d.message = "Request Added Successfully";
      return d;
    }
  };

  function updateRequest(requestId, payload) {
    return new Promise((resolve, reject) => {
      Service.updateRequest(requestId, payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  const deleteRequest = (requestId) => {
    return new Promise((resolve, reject) => {
      Service.deleteRequest(requestId)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  return (
    <RequestContext.Provider
      value={{
        request: state.request,
        loading: state.loading,
        pagination: state.pagination,
        request_details: state.request_details,
        listRequests,
        setLoading,
        resetLoading,
        addRequest,
        updateRequest,
        getRequestDetails,
        deleteRequest,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};
