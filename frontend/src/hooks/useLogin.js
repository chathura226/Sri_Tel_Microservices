import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin=()=>{
    const [error,setError]=useState(null)
    const [isLoading,setIsLoading]=useState(null)
    const {dispatch}=useAuthContext()

    const login=async (email,password)=>{
        setError(null)
        setIsLoading(true)

        const response=await fetch(`auth/token`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password})
        })

        const json=await response.json()
        console.log("json",json)
        if(!response.ok){
            console.log("errorxxxx: ",json.errors)
            setError(json.errors)
            setIsLoading(false)
        }
        if(response.ok){
            if(json.errors){
                console.log("errorsssss: ",json.errors)
                setError(json.errors)
                setIsLoading(false)
            }else{
                //saving to local storage
                localStorage.setItem('user',JSON.stringify(json))
                console.log(json)
                //updating authCOntext
                dispatch({type:'LOGIN',payload:json})
                setIsLoading(false)
                window.location.href = "/"
            }

        }
    }


    return {login,isLoading,error}
}