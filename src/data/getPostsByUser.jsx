import axios from "axios";
import { getApiUrl, getConfig } from "../utils/apiUtils";

export default async function getPostsByUser(id, startId) {
  try {
    if(startId){
      const resp = await axios.get(getApiUrl(`user/${id}?start=${startId}`));
      return { resp, status: true };
    }
    const resp = await axios.get(getApiUrl(`user/${id}`));
    return { resp, status: true };
  } catch (err) {
    const resp = err;
    return { resp, status: false };
  }
}
