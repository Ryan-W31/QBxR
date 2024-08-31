import { useState, useEffect } from "react";

// usePersist hook. This hook persists the login state of the user.
const usePersist = (): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [persist, setPersist] = useState(localStorage.getItem("persist") === "true" ? true : false);

  useEffect(() => {
    const shouldPersist = persist ? "true" : "false";
    localStorage.setItem("persist", shouldPersist);
  }, [persist]);

  return [persist, setPersist];
};
export default usePersist;
