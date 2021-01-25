import axios from "axios";
import API from "../constants/api";
import qs from "query-string";

// import { getUserToken } from "../utils/sessionManager";

// const access_token = getUserToken();

export function getRequestDetails(requestId) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API.REQUESTS}/${requestId}`)
      .then((res) => {
        if (res.statusText === "OK") {
          resolve(res.data);
        }
        reject(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function listRequests(query) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API.REQUESTS}?${qs.stringify(query)}`)
      .then((res) => {
        if (res.statusText === "OK") {
          resolve(res.data);
        }
        reject(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function addRequest(body) {
  const res = await axios({
    url: API.REQUESTS,
    method: "post",
    data: body,
  });

  return res.data;
}

export function updateRequest(requestId, payload) {
  return new Promise((resolve, reject) => {
    axios
      .put(`${API.REQUESTS}/${requestId}`, payload)
      .then((res) => {
        if (res.statusText === "OK") {
          resolve(res.data);
        }
        reject(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function deleteRequest(requestId) {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${API.REQUESTS}/${requestId}`)
      .then((res) => {
        if (res.statusText === "OK") {
          resolve(res.data);
        }
        reject(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
