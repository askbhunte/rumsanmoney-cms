import API from "../constants/api";
import axios from "axios";
import {
  getUserToken,
  saveUser,
  saveUserToken,
  saveUserRoles,
} from "../utils/sessionManager";

const access_token = getUserToken();

export function login(payload) {
  return new Promise((resolve, reject) => {
    axios
      .post(API.AUTH, payload)
      .then((res) => {
        saveUserToken(res.data.loginData.token);
        saveUser(res.data.loginData);
        saveUserRoles(res.data.loginData.roles);
        resolve(res.data.loginData);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
}

export function listUsers() {
  return new Promise((resolve, reject) => {
    axios
      .get(API.USERS, { headers: { access_token } })
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => reject(e.response.data));
  });
}

export function addUser(payload) {
  payload.geo_location = {
    coordinates: [12.12, 13.13],
  };
  if (!payload.gender) payload.gender = "O";
  return new Promise((resolve, reject) => {
    axios
      .post(API.USERS, payload, { headers: { access_token } })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
}

export async function getUserById(userId) {
  const res = await axios({
    url: `${API.USERS}/${userId}`,
    method: "get",
    headers: {
      access_token,
    },
  });
  return res.data;
}

export async function updateUser(userId, data) {
  const res = await axios({
    url: `${API.USERS}/${userId}`,
    method: "post",
    headers: {
      access_token,
    },
    data,
  });
  return res;
}

export async function changeUserStatus(userId, status) {
  const res = await axios({
    url: `${API.USERS}/${userId}/status`,
    method: "patch",
    headers: {
      access_token,
    },
    data: { status },
  });
  return res.data;
}

export function forgotPassword(payload) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API.USERS}/forgot_password`, payload)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
}

export function verifyToken(payload) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API.USERS}/password_reset/${payload.token}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
}

export function resetPassword(id, payload) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API.USERS}/${id}/reset_password`, payload)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
}

export function changePassword(id, payload) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API.USERS}/${id}/change_password`, payload)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
}
