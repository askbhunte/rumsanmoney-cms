const server_url = process.env.REACT_APP_API_SERVER;
const base_url = server_url + "/api/v1";

module.exports = {
  BANK: base_url + "/banks",
  USERS: base_url + "/users",
};
