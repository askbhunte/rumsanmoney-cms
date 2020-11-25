import React, { createContext, useReducer } from "react";
import productReduce from "../reducers/productReducer";
import * as Service from "../services/products";
import ACTION from "../actions/product";

const initialState = {
  product: [],
  pagination: { total: 0, limit: 20, start: 0, currentPage: 1, totalPages: 0 },
  product_details: null,
  loading: false,
};

export const ProductContext = createContext(initialState);
export const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReduce, initialState);

  function setLoading() {
    dispatch({ type: ACTION.SET_LOADING });
  }

  function resetLoading() {
    dispatch({ type: ACTION.RESET_LOADING });
  }

  function getProductDetails(productId) {
    return new Promise((resolve, reject) => {
      Service.getProductDetails(productId)
        .then((res) => {
          dispatch({ type: ACTION.GET_BANK_SUCCESS, res });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function listProduct(query) {
    return new Promise((resolve, reject) => {
      Service.listProduct(query)
        .then((res) => {
          dispatch({ type: ACTION.LIST_SUCCESS, res });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function updateProduct(productId, payload) {
    return new Promise((resolve, reject) => {
      Service.updateProduct(productId, payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function changeStatus(productId, status) {
    return new Promise((resolve, reject) => {
      Service.changeStatus(productId, status)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function changeFeatured(productId, status) {
    return new Promise((resolve, reject) => {
      Service.changeFeatured(productId, status)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  const addProduct = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    let payload = {
      name: formData.get("name"),
      bank_id: formData.get('bank_id'),
      image_url: formData.get('image_url'),
      plink: formData.get("plink"),
      description: formData.get("description"),
      loan_type: formData.get("loan_type"),
      ptype: formData.get("ptype"),
      base_rate: formData.get("base_rate"),
      interest_rate: formData.get("interest_rate")
    };
    let d = await Service.addProduct(payload);
    return d;
  };

  return (
    <ProductContext.Provider
      value={{
        product: state.product,
        loading: state.loading,
        pagination: state.pagination,
        product_details: state.product_details,
        listProduct,
        setLoading,
        resetLoading,
        addProduct,
        updateProduct,
        changeStatus,
        changeFeatured,
        getProductDetails,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
