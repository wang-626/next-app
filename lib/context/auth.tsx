import { useState, useEffect, createContext, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export const AuthContext = createContext({
  authenticated: {},
  setAuthenticated: () => {},
});

export function AuthContextComponent({ children }: Props) {
  const [authenticated, setAuthenticated] = useState(false);

  const getApiData = async () => {
    const res = await fetch("http://127.0.0.1:3000/api/verifyLoginToken");
    const data = res.json();
    data.then((json) => {
      let user = json.user;
      if (user) {
        setAuthenticated(user);
      }
    });
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
