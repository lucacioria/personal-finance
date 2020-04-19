const fs = require("fs");

const CREDENTIAL_FILE_NAME = "credentials.json";

function credentialFileExists() {
  return fs.existsSync(CREDENTIAL_FILE_NAME);
}

function getCredentials(service) {
  if (!credentialFileExists()) {
    console.log("[Soisy module] no credentials file! Exiting");
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
  if (!credentialFileExists()) {
    return new Error("no credentials file");
  }
  let rawCredentials = fs.readFileSync(CREDENTIAL_FILE_NAME);
  let credentials = JSON.parse(rawCredentials);

  if (service && credentials[service] && credentials[service].token) {
    return credentials[service].token;
  } else {
    return undefined;
  }
}

function saveToken(token) {
  if (!credentialFileExists()) {
    return new Error("No credentials file");
  }
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
