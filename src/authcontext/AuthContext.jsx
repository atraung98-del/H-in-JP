import {createContext,useContext,useEffect,useState} from "react";

const AuthContext=createContext();

const API_Base="http://localhost:8080/api";

export function AuthProvider({children}){

    const [user,setUser]=useState(null);
    const [accessToken,setAccessToken]=useState(null);
    const [loading,setLoading]=useState(true);


    async function login(email,password){

        const res=await fetch(`${API_Base}/auth/login`,
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/Json"
                },
                credentials:"include",
                body:JSON.stringify({email,password})
            }
        );
        const Data=await res.json();
        if(!res.ok){
            throw new Error(
                Data.error?.message||
                Data.message||
                "Login failed"
            );
        }
        const session=Data.data||Data;
        setAccessToken(session.access_token);
        setUser(
            session.user
        );
        return session;
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
    async function refreshSession(){

        try{
            const response=await fetch (`${API_Base}/auth/refresh`,
                {
                    method:"POST",
                    credentials:"include"
                }
            );
            if(!response.ok){
                setUser(null);
                setAccessToken(null);
                return (null);
            }
            const data=await response.json();
            const session=data.data||data;
            setAccessToken(
                session.access_token
            );
            setUser(
                session.user
            );
            return session;
        }catch(error){
            console.error("Refresh session error:",error);
            setUser(null);
            setAccessToken(null);
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        refreshSession();
    },[]);
    const values={
        user,
        accessToken,
        loading,
        login,
        logout,
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