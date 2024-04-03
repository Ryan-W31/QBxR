import { useSelector } from "react-redux";
import { selectCurrentToken } from "./auth";
import { jwtDecode } from "jwt-decode";

const useRoles = () => {
  const aToken = useSelector(selectCurrentToken);
  let isPlayer = false;
  let isNonPlayer = false;
  let status = "User";

  if (aToken) {
    const decoded = jwtDecode(aToken);
    const { id, roles } = decoded.user;

    isPlayer = roles.includes("Player");
    isNonPlayer = roles.includes("NonPlayer");

    if (isPlayer) status = "Player";
    if (isNonPlayer) status = "NonPlayer";

    return { id, roles, status, isPlayer, isNonPlayer };
  }

  return { id: "", role: [], status, isPlayer, isNonPlayer };
};

export default useRoles;
