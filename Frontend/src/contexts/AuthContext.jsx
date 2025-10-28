import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import axios from 'axios';
import {toast} from "react-hot-toast"


//creating
const authContext = createContext()

//wrapper component for provding 

export function AuthProvider(props){
    const[user,setUser]=useState(null)
    const[loading,setLoading]=useState(true)
    useEffect(()=> {
        //auth status api call 
        setLoading(true)
        axios.get(" http://localhost:8000/api/v1/auth/status",
            {withCredentials:true}
        ).then(res=>setUser(res.data))
        .catch(error => console.log(error))
        .finally(()=> setLoading(false))
    },[])

    const login = async (credentials)=>{
        try {
            //loading
            toast.loading("logging in...", {id:"login"})
            const data = await axios.post("http://localhost:8000/api/v1/auth/login",credentials,{withCredentials:true})
            console.log(data)
            let response = await axios.get("http://localhost:8000/api/v1/auth/status",{withCredentials:true})
                setUser(response.data)

                toast.success("Welcome Back"+ response?.data?.name.split(" ")[0],{id:"login",duration:1000})
        } catch (error) {
             toast.error(error?.response?.data?.message,{id:"login",duration:1000})
            console.log(error)
        }
    }


    const logout= async ()=> {
        try {
            toast.loading("Logging out..",{id:"logout"})
           await axios.get(" http://localhost:8000/api/v1/auth/logout",{withCredentials:true})
           setUser(null) // remove user details  
           toast.success("Logged out succesfully",{id:"logout"})
        } catch (error) {
            toast.error(error?.response?.data?.error || "Something went wrong", {id:"logout"})
            console.log(error)
        }
    }
    return(
        <>
        <authContext.Provider value={{user,loading,login,logout}}>
            {props.children}
        </authContext.Provider>
        </>
    )
} 

//re-useable function custom hook

export function useAuth(){
    return useContext(authContext)
}