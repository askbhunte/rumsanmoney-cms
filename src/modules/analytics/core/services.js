import axios from 'axios';

import API from '../../../constants/api';
import { getUserToken } from '../../../utils/sessionManager';

axios.defaults.headers.access_token = getUserToken();
const URL = `${API.COOKIES}`;
const historyUrl = `${API.HISTORY}`;

export function list(params) {
	return new Promise((resolve, reject) => {
		axios({
			url: URL,
			params
		})
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.response.data);
			});
	});
}

export function get(id) {
	return new Promise((resolve, reject) => {
		axios(`${URL}/${id}`)
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.response.data);
			});
	});
}


export function listHistory(params) {
	return new Promise((resolve, reject) => {
		axios({
			url: historyUrl,
			params
		})
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.response.data);
			});
	});
}


