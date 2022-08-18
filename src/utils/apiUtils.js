function getApiUrl(route) {

  const url = `http://localhost:4001/${route}`;
  return url;
}

function getConfig(token = "") {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
}

export { getApiUrl, getConfig };
