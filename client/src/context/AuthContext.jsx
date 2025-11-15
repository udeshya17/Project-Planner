import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { loginRequest, signupRequest } from "../api/auth.api";
import { useUI } from "./UIContext";
import { disconnectSocket, getSocketClient } from "../utils/socket";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const { addToast } = useUI();

  useEffect(() => {
    const token = window.localStorage.getItem("pp_token");
    const rawUser = window.localStorage.getItem("pp_user");
    if (token && rawUser) {
      try {
        const parsed = JSON.parse(rawUser);
        setUser(parsed);
        // here we are geeting the socket 
        getSocketClient();
      } catch {
        window.localStorage.removeItem("pp_token");
        window.localStorage.removeItem("pp_user");
      }
    }
    setIsBootstrapping(false);
  }, []);

  const handleAuthSuccess = useCallback((payload) => {
    const { user: nextUser, token } = payload;
    window.localStorage.setItem("pp_token", token);
    window.localStorage.setItem("pp_user", JSON.stringify(nextUser));
    setUser(nextUser);
    // if there is new token than connect socket
    disconnectSocket();
    getSocketClient();
  }, []);

  const login = useCallback(
    async (credentials) => {
      const data = await loginRequest(credentials);
      handleAuthSuccess(data);
      addToast({
        type: "success",
        title: "Welcome back",
        message: "Logged in successfully.",
      });
    },
    [addToast, handleAuthSuccess]
  );

  const signup = useCallback(
    async (payload) => {
      const data = await signupRequest(payload);
      handleAuthSuccess(data);
      addToast({
        type: "success",
        title: "Account created",
        message: "Your workspace is ready.",
      });
    },
    [addToast, handleAuthSuccess]
  );

  const logout = useCallback(() => {
    window.localStorage.removeItem("pp_token");
    window.localStorage.removeItem("pp_user");
    setUser(null);
    disconnectSocket();
  }, []);

  const value = {
    user,
    isBootstrapping,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return ctx;
}
