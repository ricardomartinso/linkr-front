import axios from "axios";
import { getApiUrl, getConfig } from "../utils/apiUtils";

export default async function getPostsByUser(username) {
  try {
    const resp = await axios.get(getApiUrl(`user/${username}`));
    return { resp, status: true };
  } catch (err) {
    const resp = err;
    return { resp, status: false };
  }
}
