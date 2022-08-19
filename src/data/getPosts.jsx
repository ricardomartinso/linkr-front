import axios from "axios";
import { getApiUrl, getConfig } from "../utils/apiUtils";

export default async function getPosts(token, page) {
  const URL_API = `http://localhost:5000/posts?page=${page}`
  console.log(URL_API);
  try {
    const config = getConfig(token);
    /* const resp = await axios.get(
      getApiUrl("posts"), config
    ); */
    const resp = await axios.get(
      `https://linkr-backend-30.herokuapp.com/posts?page=${page}`, config
    );
    return { resp, status: true };
  } catch (err) {
    const resp = err;
    return { resp, status: false };
  }
}
