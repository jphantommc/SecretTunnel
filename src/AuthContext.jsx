import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  // TODO: signup

  const signup = async (credentials) => {
    try {
      const ressponse = await fetch(`${API}/signup`, {
      method: "POST",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),  
      });
      const result = await Response.json();
      setToken(result.token);
      setLocation("TABLET");
    } catch (error) {
      console.error(error);
    }
  }

  // TODO: authenticate

const authenticate = async () => {
  try {
    if (!token) throw Error("No token found");
    const response = await fetch (`${API}/authenticate`, {
      headers: { Authrization: `bearer ${token}`},
  });
  if (!response.ok) throw Error("Authentication failed");
  setLocation("TUNNEL");
  } catch (error) {
    console.error(error);
  }
}

  const value = { location };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
