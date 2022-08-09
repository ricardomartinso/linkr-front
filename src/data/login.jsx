import axios from "axios";
export default async function logout(token) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(
      `https://projeto13mywalletback.herokuapp.com/logout`,
      config
    );
    return { status: true };
  } catch {
    return { status: false };
  }
}
