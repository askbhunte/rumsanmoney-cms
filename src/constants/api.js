const server_url = process.env.REACT_APP_API_SERVER;
const base_url = server_url + "/api/v1";

module.exports = {
  AUTH: base_url + "/auth",
  BANK: base_url + "/banks",
  CATEGORY: base_url + "/categories",
  COMPANIES: base_url + "/companies",
  INSURANCES: base_url + "/insurances",
  PRODUCT: base_url + "/products",
  USERS: base_url + "/users",
  BLOGS: base_url + "/blogs",
  REQUESTS: base_url + "/requests",
};
