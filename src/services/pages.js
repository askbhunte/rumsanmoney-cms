import axios from "axios";
import API from "../constants/api";
import qs from "query-string";

// import { getUserToken } from "../utils/sessionManager";

// const access_token = getUserToken();

export function getPagesDetails(pagesId) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${API.PAGES}/${pagesId}`)
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

export function listPages(query) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${API.PAGES}?${qs.stringify(query)}`)
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


export function updatePages(PageId, payload) {
    return new Promise((resolve, reject) => {
        axios
            .put(`${API.PAGES}/${PageId}`, payload)
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

export async function addPages(body) {
    const res = await axios({
        url: API.PAGES,
        method: "post",
        data: body,
    });

    return res.data;
}

export function deletePages(PageId) {
    return new Promise((resolve, reject) => {
        axios
            .delete(`${API.PAGES}/${PageId}`)
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