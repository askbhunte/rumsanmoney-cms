import axios from "axios";
import API from "../constants/api";
import qs from "query-string";

// import { getUserToken } from "../utils/sessionManager";

// const access_token = getUserToken();

export function getProductDetails(productId) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API.PRODUCT}/${productId}`)
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

export function listProduct(query) {  
  return new Promise((resolve, reject) => {
    axios
      .get(`${API.PRODUCT}?${qs.stringify(query)}&limit=2000`)
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

export function updateProduct(productId, payload) {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${API.PRODUCT}/${productId}`,
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

export function changeStatus(productId, status) {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${API.PRODUCT}/${productId}/status`,
        status
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

export function changeFeatured(productId, status) {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${API.PRODUCT}/${productId}/featured`,
        status
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

export function updateDate(productId) {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${API.PRODUCT}/${productId}/date`       
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

export async function addProduct(body) {
  const res = await axios({
    url: API.PRODUCT,
    method: "post",
    data: body,
  });

  return res.data;
}
