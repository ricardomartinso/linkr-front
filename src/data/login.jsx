import axios from "axios";
export default async function login(form) {
  try {
    const response = await axios.post(
      "https://linkr-backend-30.herokuapp.com/signin",
      form
    );
    const result = response;
    return { status: true, result };
  } catch (err) {
    const { response: result } = err;
    return { status: false, result };
  }
}
