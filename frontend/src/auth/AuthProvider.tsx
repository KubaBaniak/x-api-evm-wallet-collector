import { createContext, useContext, useEffect, useState } from "react";

interface ProviderProps {
  token: string;
  login(token: string): void;
}

const AuthContext = createContext<ProviderProps>({
  token: "",
  login: () => { },
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const storedInfo = localStorage.getItem("token");
  const [token, setToken] = useState<string>(storedInfo || "");

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  useEffect(() => {
    if (!token) {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => {
  return useContext(AuthContext);
};

