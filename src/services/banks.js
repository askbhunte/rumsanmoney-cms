import axios from "axios";
import API from "../constants/api";
import qs from "query-string";

// import { getUserToken } from "../utils/sessionManager";

// const access_token = getUserToken();

export function getBankDetails(bankId) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API.BANK}/${bankId}`)
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

export function listBank(query) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API.BANK}?${qs.stringify(query)}`)
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

export function listAllBank(query) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API.BANK}/all`)
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

export function updateBank(bankId, payload) {
  return new Promise((resolve, reject) => {
    axios
      .put(`${API.BANK}/${bankId}`, payload)
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

export async function addBank(body) {
  const res = await axios({
    url: API.BANK,
    method: "post",
    data: body,
  });

  return res.data;
}
