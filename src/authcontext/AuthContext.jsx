import {createContext,useContext,useEffect,useState} from "react";
import axios from "axios"
const AuthContext=createContext();

const API_Base="http://localhost:8080/api";

export function AuthProvider({children}){

    const [user,setUser]=useState(null);
    const [accessToken,setAccessToken]=useState(null);
    const [loading,setLoading]=useState(true);


    async function login(email, password) {

  const response = await fetch(
    `${API_Base}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error?.message ||
      data?.message ||
      "Login failed"
    );
  }

  const session = data.data || data;

  // Save token
  // setAccessToken(session.access_token);

  // Get complete user/profile
  const token = session.access_token;

console.log("ACTUAL ACCESS TOKEN:", token);

setAccessToken(token);

const currentUser = await Me(token);

console.log("FULL CURRENT USER:", currentUser);

setUser(currentUser);


  return {
    ...session,
    user: currentUser,
  };
}
    async function logout(){

        try{
            await fetch(`${API_Base}/auth/logout`,
               {
                 method:"POST",
                credentials:"include",
                headers:accessToken?{
                    Authorization:`Bearer ${accessToken}`
                }:{}
               }
            );
        }catch(error){
            console.error("logout error",error)
        }finally{
            setUser(null)
            setAccessToken(null);
        }
    }
  async function Me(token) {

  console.log("TOKEN SENT TO /me:", token);

  const response = await fetch(
    `${API_Base}/me`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    }
  );

  const data = await response.json();

  console.log("ME RESPONSE:", data);

  if (!response.ok) {
    throw new Error(
      data?.error?.message ||
      data?.message ||
      "Failed to get current user"
    );
  }

  return data.data || data;
}

    const refreshSession = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/refresh",
      {},
      {
        withCredentials: true,
      }
    );

    const token = response.data.access_token;

    setAccessToken(token);

    const meResponse = await axios.get(
      "http://localhost:8080/api/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    setUser(meResponse.data);

    return meResponse.data;

  } catch (error) {
    console.log("Refresh failed:", error);

    setAccessToken(null);
    setUser(null);

    throw error;
  }
};
useEffect(() => {
  const initializeAuth = async () => {
    try {
      await refreshSession();
    } finally {
      setLoading(false);
    }
  };

  initializeAuth();
}, []);


    const values={
        user,
        accessToken,
        loading,
        login,
        logout,
        Me,
        refreshSession
    };
    return(

        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth(){
    const context= useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used inside Auth Provider")
    }
    return context;
}