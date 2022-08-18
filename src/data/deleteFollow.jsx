import axios from "axios";
import { getApiUrl, getConfig } from "../utils/apiUtils";



export default async function deleteFollow(id, token) {

  try {
    const resp = await axios.delete(getApiUrl(`user/follower/${id}`), getConfig(token));//passa o token para o config e antes dele passa o body da requisiçao
    return resp;
  } catch (err) {
    return err;
  }
}