import React, { createContext, useReducer } from 'react';
import Reduce from './reducers';
import * as Service from './services';
import ACTION from './actions';

const initialState = {
	data: [],
	pagination: { total: 0, limit: 20, start: 0, currentPage: 1, totalPages: 0 },
	details: null,
	loading: false
};

export const Context = createContext(initialState);
export const ContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(Reduce, initialState);

	function setLoading() {
		dispatch({ type: ACTION.SET_LOADING });
	}

	function resetLoading() {
		dispatch({ type: ACTION.RESET_LOADING });
	}

	function get(id) {
		return new Promise((resolve, reject) => {
			Service.get(id)
				.then(res => {
					dispatch({ type: ACTION.GET_SUCCESS, res });
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	}


	function list(query) {
		return new Promise((resolve, reject) => {
			Service.list(query)
				.then(res => {
					dispatch({ type: ACTION.LIST_SUCCESS, res });
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	}

	function listHistory(id,query) {
		return new Promise((resolve, reject) => {
			Service.listHistory(id,query)
				.then(res => {
					dispatch({ type: ACTION.LIST_SUCCESS, res });
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	}

	return (
		<Context.Provider
			value={{
				data: state.data,
				loading: state.loading,
				pagination: state.pagination,
				details: state.details,
				list,
				setLoading,
				resetLoading,
				get,
				listHistory,
				dispatch
			}}
		>
			{children}
		</Context.Provider>
	);
};
