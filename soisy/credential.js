const fs = require("fs");

const CREDENTIAL_FILE_NAME = "credentials.json";

function credentialFileExists() {
  return fs.existsSync(CREDENTIAL_FILE_NAME);
}

function getCredentials(service) {
  if (!credentialFileExists()) {
    console.error("[Soisy module] no credentials file! Exiting");
    process.exit(1);
  }
  let rawCredentials = fs.readFileSync(CREDENTIAL_FILE_NAME);
  let credentials = JSON.parse(rawCredentials);

  if (service) {
    return credentials[service];
  } else {
    return credentials;
  }
}

function getToken(service) {
  let credentials = getCredentials(service);

  if (credentials && credentials.token) {
    return credentials.token;
  } else {
    return undefined;
  }
}

function saveToken(token) {
  const credentials = getCredentials();

  const newCredentials = {
    ...credentials,
    soisy: {
      ...credentials.soisy,
      token: token,
    },
  };
  let data = JSON.stringify(newCredentials);
  fs.writeFileSync(CREDENTIAL_FILE_NAME, data);
}

module.exports = {
  getCredentials,
  saveToken,
  getToken,
};
