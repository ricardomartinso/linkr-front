import axios from "axios";
import { getApiUrl, getConfig } from "../utils/apiUtils";

export default async function getOneHashtag(token, hashtag, startId) {
  try {
    if (startId) {
      const resp = await axios.get(
        getApiUrl(`hashtags/${hashtag}?start=${startId}`, config)
      );
      return { resp, status: true };
    }
    const config = getConfig(token);
    const resp = await axios.get(getApiUrl(`hashtags/${hashtag}`), config);
    return { resp, status: true };
  } catch (err) {
    const resp = err;
    return { resp, status: false };
  }
}
