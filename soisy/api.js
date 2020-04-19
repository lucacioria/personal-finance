const axios = require("axios").default;
const credentials = require("./credential.js");

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      return Promise.reject(error.response.status);
    }
    return Promise.reject(error);
  }
);

function login(username, password) {
  const loginCred = credentials.getCredentials("soisy");
  return axios
    .post(
      "https://api.soisy.it/api/users/authenticate",
      {
        username: username || loginCred.username,
        password: password || loginCred.password,
      },
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7",
          "content-type": "application/json;charset=UTF-8",
        },
      }
    )
    .then((res) => res.data)
    .then((res) => {
      if (res.token) {
        credentials.saveToken(res.token);
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    });
}

async function getInvestments() {
  let token = credentials.getToken("soisy");
  if (!token) {
    await login().then(() => {
      token = credentials.getToken("soisy");
    });
  }

  return axios
    .get(
      "https://api.soisy.it/api/users/770e0766-6c16-3f90-9318-b53952179708/investments",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "x-auth-token": token,
        },
      }
    )
    .then((res) => res.data);
}

module.exports = {
  login,
  getInvestments,
};
