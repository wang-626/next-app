import { useState, useEffect, createContext, ReactNode } from "react";
import * as dotenv from "dotenv";

interface Props {
  children?: ReactNode;
}

type user = {
  name: string;
  email: string;
  password: string;
};

type Auth = {
  authenticated: user | false;
};

let authenticated: user | false = false;

export const AuthContext = createContext<Auth>({ authenticated: authenticated });

export function AuthContextComponent({ children }: Props) {
  const [authenticated, setAuthenticated] = useState<user | false>(false);

  const getApiData = async () => {
    const res = await fetch(window.location.origin + "/api/verifyLoginToken");
    const json = await res.json();

    if (json.user) {
      setAuthenticated(json.user);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  return <AuthContext.Provider value={{ authenticated }}>{children}</AuthContext.Provider>;
}
