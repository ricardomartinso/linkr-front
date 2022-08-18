import axios from "axios";
import { getApiUrl, getConfig } from "../utils/apiUtils";

export default async function getPosts(token) {
  try {
    const config = getConfig(token);
    /* const resp = await axios.get(
      getApiUrl("posts"), config
    ); */
    const resp = await axios.get(
      `http://localhost:4000/posts`, config
    );
    return { resp, status: true };
  } catch (err) {
    const resp = err;
    return { resp, status: false };
  }
}
