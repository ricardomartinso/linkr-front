import axios from "axios";
import { getApiUrl, getConfig } from "../utils/apiUtils";

export default async function getPosts(token) {
  try {
    const config = getConfig(token);
    const resp = await axios.get(
      getApiUrl("posts"), config
    );
    return { resp, status: true };
  } catch (err) {
    const resp = err;
    return { resp, status: false };
  }
}
