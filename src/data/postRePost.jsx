import axios from "axios";
import { getApiUrl, getConfig } from "../utils/apiUtils";

export default async function postRePost(postId, token) {
  try {
    const response = await axios.post(
      getApiUrl(`post/repost/${postId}`),
      {},
      getConfig(token)
    );
    const result = response;
    return { status: true, result };
  } catch (err) {
    return err
  }
}