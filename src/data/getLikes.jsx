
import axios from "axios";
import { getApiUrl, getConfig } from "../utils/apiUtils";

export default async function getLikesPosts(postId, token) {

  try {
    const resp = await axios.get(
      getApiUrl(`likes/${postId}`),
      getConfig(token)
    );
    return { resp, status: true };
  } catch (err) {
    const resp = err;
    return { resp, status: false };
  }
}