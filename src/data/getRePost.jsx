
import axios from "axios";
import { getApiUrl } from "../utils/apiUtils";

export default async function getRePosts(postId) {

  try {
    const resp = await axios.get(
      getApiUrl(`post/repost/${postId}`)
    );
    return { resp, status: true };
  } catch (err) {
    const resp = err;
    return { resp, status: false };
  }
}