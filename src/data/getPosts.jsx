import axios from "axios";
export default async function login(form) {
  try {
    const resp = await axios.get(
      "https://linkr-backend-30.herokuapp.com/posts",
      form
    );
    return { resp, status: true };
  } catch (err) {
    const resp = err;
    return { resp, status: false };
  }
}
