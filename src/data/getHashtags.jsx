import axios from "axios";
import { getApiUrl } from "../utils/apiUtils";

export default async function getHashtags() {

  try {
    const resp = await axios.get(
      getApiUrl(`hashtags`)
    );
    return { resp, status: true };
  } catch (err) {
    const resp = err;
    return { resp, status: false };
  }
}