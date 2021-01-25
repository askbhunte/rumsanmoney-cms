import axios from "axios";
import API from "../constants/api";
import qs from "query-string";

// import { getUserToken } from "../utils/sessionManager";

// const access_token = getUserToken();

export function getBlogDetails(blogId) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API.BLOGS}/${blogId}`)
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

export function listBlogs(query) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API.BLOGS}?${qs.stringify(query)}`)
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

export async function addBlog(body) {
  const res = await axios({
    url: API.BLOGS,
    method: "post",
    data: body,
  });

  return res.data;
}

export function updateBlog(blogId, payload) {
  return new Promise((resolve, reject) => {
    axios
      .put(`${API.BLOGS}/${blogId}`, payload)
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
