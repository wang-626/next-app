import { useState, useEffect, createContext, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export const AuthContext = createContext({
  authenticated: {},
  setAuthenticated: (any:any) => {},
});

export function AuthContextComponent({ children }: Props) {
  const [authenticated, setAuthenticated] = useState(false);

  const getApiData = async () => {
    const res = await fetch("http://127.0.0.1:3000/api/verifyLoginToken");
    const json = await res.json();

    if (json.user) {
      setAuthenticated(json.user);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  return <AuthContext.Provider value={{ authenticated, setAuthenticated }}>{children}</AuthContext.Provider>;
}
