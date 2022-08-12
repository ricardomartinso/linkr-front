import axios from "axios";
import { getApiUrl } from "../utils/apiUtils";

export default async function login(form) {
  try {
    const response = await axios.post(
      getApiUrl('signin'),
      form
    );
    const result = response;
    return { status: true, result };
  } catch (err) {
    const { response: result } = err;
    return { status: false, result };
  }
}
