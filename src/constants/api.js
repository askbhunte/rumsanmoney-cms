const server_url = process.env.REACT_APP_API_SERVER;
const base_url = server_url + "/api/v1";

module.exports = {
  BANK: base_url + "/banks",
  CATEGORY: base_url + "/categories",
  PRODUCT: base_url + "/products",
  USERS: base_url + "/users",
  BLOGS: base_url + "/blogs",
  REQUESTS: base_url + "/requests",
};
