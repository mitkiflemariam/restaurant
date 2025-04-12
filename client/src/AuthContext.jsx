import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState(null);
  const [ownerId, setOwnerId] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserName = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");
    const storedOwnerId = localStorage.getItem("ownerId");

    if (token) {
      setIsLoggedIn(!!token);
      setUserName(storedUserName || "User");
      setRole(storedRole);
      setOwnerId(storedOwnerId)
    }
    //   setIsLoggedIn(!!token);
  }, []);

  const login = (token, username, userRole, ownerId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("role", userRole);
    localStorage.setItem("ownerId", ownerId);
    setIsLoggedIn(true);
    setUserName(username);
    setRole(userRole);
    setOwnerId(ownerId)
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("ownerId");
    setIsLoggedIn(false);
    setUserName("");
    setRole(null);
    setOwnerId(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, role, login, ownerId, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
