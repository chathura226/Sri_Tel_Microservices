import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup=()=>{
    const [error,setError]=useState(null)
    const [isLoading,setIsLoading]=useState(null)
    const {dispatch} = useAuthContext()

    
    const signup = async (firstName,lastName,email,password,answer,securityQuestion,mobileNumber)=>{//default is normal type user
        setIsLoading(true)
        setError(null)
        const response = await fetch('auth/register-customer',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({firstName,lastName,email,password,answer,securityQuestion,mobileNumber})
        })

        const json=await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.errors)
            setError(Object.values(json.errors).join(' '))
        }
        if(response.ok){
            if(json.errors){
                setIsLoading(false)
                setError(Object.values(json.errors).join(' '))

            }else{

                setIsLoading(false)
                window.location.href = "/login"
            }

        }

    }


    return {signup,isLoading,error}
}

