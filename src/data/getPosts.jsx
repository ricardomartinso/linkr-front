import axios from "axios";
import { getApiUrl, getConfig } from "../utils/apiUtils";

export default async function getPosts(token, startId) {
  try {
    const config = getConfig(token);
    if(startId){
      const resp = await axios.get(
        getApiUrl(`posts?start=${startId}`), config
      );
      return { resp, status: true };
    }
    else{
      const resp = await axios.get(
        getApiUrl(`posts`), config
      );
      return { resp, status: true };
    }
  } catch (err) {
    const resp = err;
    return { resp, status: false };
  }
}
