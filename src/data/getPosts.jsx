import axios from "axios";
export default async function login(form) {
  try {
    const resp = await axios.get(
      "https://linkr-backend-30.herokuapp.com/posts",
      form
    );
    return { resp };
  } catch (err) {
    const { response: result } = err;
    return { status: false };
  }
}
