import axios from "axios";
import API from "../constants/api";
import qs from "query-string";

// import { getUserToken } from "../utils/sessionManager";

// const access_token = getUserToken();

export function getCategoryDetails(categoryId) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API.CATEGORY}/${categoryId}`)
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

export function listCategory(query) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API.CATEGORY}?${qs.stringify(query)}`)
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

export function updateCategory(categoryId, payload) {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${API.CATEGORY}/${categoryId}`,
        payload
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

export async function addCategory(body) {
  const res = await axios({
    url: API.CATEGORY,
    method: "post",
    data: body,
  });

  return res.data;
}
