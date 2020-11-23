const server_url = process.env.REACT_APP_API_SERVER;
const base_url = server_url + "/api/v1";

module.exports = {
  BANK: base_url + "/banks",
  PRODUCT: base_url + "/products",
  USERS: base_url + "/users",
};
