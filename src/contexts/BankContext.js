import React, { createContext, useReducer } from "react";
import bankReduce from "../reducers/bankReducer";
import * as Service from "../services/banks";
import ACTION from "../actions/bank";

const initialState = {
  bank: [],
  pagination: { total: 0, limit: 20, start: 0, currentPage: 1, totalPages: 0 },
  bank_details: null,
  loading: false,
};

export const BankContext = createContext(initialState);
export const BankContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bankReduce, initialState);

  function setLoading() {
    dispatch({ type: ACTION.SET_LOADING });
  }

  function resetLoading() {
    dispatch({ type: ACTION.RESET_LOADING });
  }

  function getBankDetails(bankId) {
    return new Promise((resolve, reject) => {
      Service.getBankDetails(bankId)
        .then((res) => {
          console.log(res)
          dispatch({ type: ACTION.GET_BANK_SUCCESS, res });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function listBank(query) {
    return new Promise((resolve, reject) => {
      Service.listBank(query)
        .then((res) => {
          dispatch({ type: ACTION.LIST_SUCCESS, res });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function approveBank(bankId) {
    return new Promise((resolve, reject) => {
      Service.approveBank(bankId)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  const addBank = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    let payload = {
      name: formData.get("name"),
      head_office: formData.get('head_office'),
      primary_contact: formData.get('primary_contact'),
      contact_number: formData.get("contact_number"),
      logo_url: formData.get("logo_url"),
      email: formData.get("email"),
      address: formData.get("address"),
      website: formData.get("website")
    };
    let d = await Service.addBank(payload);
    return d;
  };

  return (
    <BankContext.Provider
      value={{
        bank: state.bank,
        loading: state.loading,
        pagination: state.pagination,
        bank_details: state.bank_details,
        listBank,
        setLoading,
        resetLoading,
        addBank,
        approveBank,
        getBankDetails,
      }}
    >
      {children}
    </BankContext.Provider>
  );
};
