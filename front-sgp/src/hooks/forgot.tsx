import { useEffect, useState } from "react";

export default function useForgot(token: string | null) {
  const [userExist, setUserExist] = useState(false);

  useEffect(() => {
    if (typeof token === "string" && token.trim()) {
      setUserExist(true);
    } else {
      setUserExist(false);
    }
  }, [token]);

  return { userExist };
}
