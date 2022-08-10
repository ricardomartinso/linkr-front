import axios from "axios";
export default async function login(form) {
  try {
    const response = await axios.post(
      "https://linkr-backend-30.herokuapp.com/login",
      form
    );
    return { status: true, response };
  } catch {
    return { status: false };
  }
}

