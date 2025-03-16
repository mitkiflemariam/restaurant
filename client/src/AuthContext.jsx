import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserName = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");

    if (token) {
      setIsLoggedIn(!!token);
      setUserName(storedUserName || "User");
      setRole(storedRole);
    }
    //   setIsLoggedIn(!!token);
  }, []);

  const login = (token, username, userRole) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("role", userRole);
    setIsLoggedIn(true);
    setUserName(username);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUserName("");
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
