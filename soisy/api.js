const axios = require("axios").default;
const credentials = require("./credential.js");

// axios.interceptors.response.use(response => {
//   return response;
// }, error => {
//   if (error.response.status === 401) {

//   }
//   return error;
// });

function login(username, password) {
  const loginCred = credentials.getCredentials("soisy");
  console.log("[Soisy module] Logging in...");
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
        console.log("[Soisy module] New token got. ");
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    })
    .catch((error) => {
      if (error.response) {
        return Promise.reject(error.response.status);
      } else {
        return Promise.reject(error);
      }
    });
}

async function getInvestments() {
  const token = credentials.getToken("soisy");
  if(!token) {
    return Promise.reject(401);
  }
  const investmentsRes = await axios
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
    .then((res) => res.data)
    .catch((error) => {
      if (error.response) {
        return Promise.reject(error.response.status);
      } else {
        return Promise.reject(error);
      }
    });

  return investmentsRes;
}

module.exports = {
  login,
  getInvestments,
};
