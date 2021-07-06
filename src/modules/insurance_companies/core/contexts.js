import React, { createContext, useReducer } from 'react';
import Reduce from './reducers';
import * as Service from './services';
import ACTION from './actions';

const initialState = {
	data: [],
	pagination: { total: 0, limit: 50, start: 0, currentPage: 1, totalPages: 0 },
	details: null,
	loading: false
};

export const CompanyContext = createContext(initialState);
export const CompanyContextProvider = ({ children }) => {
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

	function getDetail(id) {
		return new Promise((resolve, reject) => {
			Service.getDetail(id)
				.then(res => {
					dispatch({ type: ACTION.GET_DETAIL_SUCCESS, res });
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

	function update(id, payload) {
		return new Promise((resolve, reject) => {
			Service.update(id, payload)
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	}

	function add(payload) {
		return new Promise((resolve, reject) => {
			Service.add(payload)
				.then(res => {
					dispatch({ type: ACTION.ADD_SUCCESS, res });
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	}

	function archive(id) {
		return new Promise((resolve, reject) => {
			Service.archive(id)
				.then(res => {
					dispatch({ type: ACTION.ARCHIVE_SUCCESS, res });
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	}

	function remove(id) {
		return new Promise((resolve, reject) => {
			Service.remove(id)
				.then(res => {
					dispatch({ type: ACTION.DELETE_SUCCESS, res });
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	}

	return (
		<CompanyContext.Provider
			value={{
				data: state.data,
				loading: state.loading,
				pagination: state.pagination,
				details: state.details,
				list,
				setLoading,
				resetLoading,
				add,
				update,
				get,
				getDetail,
				archive,
				remove,
				dispatch,
			}}
		>
			{children}
		</CompanyContext.Provider>
	);
};
