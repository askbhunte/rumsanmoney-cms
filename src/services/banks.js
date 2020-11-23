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

export function approveBank(bankId) {
  return new Promise((resolve, reject) => {
    axios
      .patch(
        `${API.BANK}/${bankId}/approve`,
        {}
      )
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
