import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserName = localStorage.getItem("username");
    if (token) {
        setIsLoggedIn(!!token);
        setUserName(storedUserName || "User");
    }
    //   setIsLoggedIn(!!token);
  }, []);

 
  const login = (token, username) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    setIsLoggedIn(true);
    setUserName(username);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUserName("");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn,userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
