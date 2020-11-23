import API from "../constants/api";
import axios from "axios";

const _token = "jwt-token";
const test_data = { name: "Tom Shelby", email: "tom@mailinator.com" };

export function getUser() {
  return new Promise((resolve, reject) => {
    resolve(test_data);
  });
}

export function listUsers() {
  return new Promise((resolve, reject) => {
    axios
      .get(API.USERS, { headers: { Authorization: `${_token}` } })
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => reject(e.response.data));
  });
}
