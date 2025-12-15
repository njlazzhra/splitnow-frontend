import { useEffectOnce, useLocalStorage } from "react-use";
import { userLogout } from "../../lib/api/UserApi.jsx";
import { useNavigate } from "react-router-dom";
import { alertError } from "../../lib/alert.js";

export default function UserLogout() {
  const [token, setToken] = useLocalStorage("token", "");
  const navigate = useNavigate();

  async function handleLogout() {
    const response = await userLogout(token);
    const responseBody = await response.json();

    if (response.status === 200) {
      setToken("");
      navigate("/login");
    } else {
      alertError(responseBody.errors);
    }
  }

  useEffectOnce(() => {
    handleLogout().then(() => console.log("logout successfully"));
  });

  return null;
}
