import axios from "axios";
export default async function singUp(form) {

  try {
    const response = await axios.post(
      "https://linkr-backend-30.herokuapp.com/signup",
      form
    );
    return { status: true };
  } catch (err) {
    const { response: result } = err;
    return { status: false, result };
  }
}