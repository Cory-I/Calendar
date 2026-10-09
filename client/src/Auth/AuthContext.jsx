/* Imports */
import { createContext, useContext, useState } from "react";
import axios from axios
/* Definitions */
const authContext = createContext();
/* All Else */
export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const register = async (name, email, password) => {
    const newUser = {name, email, password}
    const response = await axios.post("api/users/register", newUser,{
        headers:{"Content-Type":"application/json"}
    })
    setToken(response.data)
    localStorage.setItem("authToken",response.data)
  }
  async function login(email, password) {
    const userInfo = {
        email:email,
        password:password,
    }
    const config = {
        "Content-type":"application/json"
    }
    const response = await axios.post("api/users/login", userInfo, config)
    setToken(response.data)
    localStorage.setItem("authToken", response.data)
  }
  async function logout() {
    setToken(null)
    localStorage.removeItem("authToken")
  }
  async function userUpdate(id, name, email, password) {
    const userUpdate = {
        id: id,
        name:name,
        email:email,
        password:password,
    }
    const config = {
        "Content-type":"application/json",
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const {data} = await axios.put(
        "api/users/me/update",
        updatedUser,
        config,
    )
    return data
  }
  const authorization = {
    token,
    register,
    login,
    logout,
    userUpdate,
  }
  return <authContext.Provider value={value}></authContext.Provider>
}
export default function useAuth() {
  const context = useContext(authContext);
  if (!context) throw Error("useAuth not being used within AuthProvider");
  return context;
}
