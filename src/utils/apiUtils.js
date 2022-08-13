function getApiUrl(route) {
  const url = `http://linkr-backend-30.herokuapp.com/${route}`;
  return url;
}

function getConfig (token='') {
  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
  return config;
}

export { getApiUrl, getConfig };