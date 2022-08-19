import axios from "axios";
import { getApiUrl, getConfig } from "../utils/apiUtils";

export async function getStatusFollow(id, token) {
  try {
    const resp = await axios.get(
      getApiUrl(`user/follower/status/${id}`),
      getConfig(token)
    );
    return resp;
  } catch (err) {
    return err;
  }
}
