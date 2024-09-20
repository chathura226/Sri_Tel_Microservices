import { useState } from "react"
import { useLogin } from "../hooks/useLogin";
import {useAuthContext} from "../hooks/useAuthContext";


const Login=()=>{
    const {user} = useAuthContext()
    const [email,setEmail]=useState('')
    const [isLoading,setIsLoading]=useState(false)
    const [error,setError]=useState(false)
    const [securityQuestion,setSecurityQuestion]=useState('')
    const [answer,setAnswer]=useState('')
    const [newPassword,setNewPassword]=useState('')

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const response = await fetch('auth/forgot-password?email=' + email, {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            },
        })
        const json=await response.json()

        if(!response.ok){
            setError(json.message)
            setIsLoading(false)
        }else{
            setError(null)
            setSecurityQuestion(json.content)
            setIsLoading(false)
        }
    }


    const handleReset=async(e)=>{
        e.preventDefault()
        const response = await fetch('auth/reset-password', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({email,securityQuestion,answer,newPassword})
        })
        const json=await response.json()

        if(!response.ok){
            setError("Wrong Answer!")
            setIsLoading(false)
        }else{
            setError(null)
            window.location.href = "/login"
            setIsLoading(false)
        }
    }

    if(securityQuestion!='' && error==null && securityQuestion!=null){
        return (
            <div className="form-container">
                <form className="login" onSubmit={handleReset}>
                    <h3>Forgot Password</h3>
                    <label>Security Question</label>
                    <input type="text" value={securityQuestion} style={{color:"white"}} disabled/>
                    <label>Answer</label>
                    <input type="text" onChange={(e) => setAnswer(e.target.value)} value={answer}/>
                    <label>New Password</label>
                    <input type="password" onChange={(e) => setNewPassword(e.target.value)} value={newPassword}/>
                    <button disabled={isLoading}>Reset Password</button>
                    {error && <div className="error">{error}</div>}

                </form>
            </div>
        )
    }

    return (
        <div className="form-container">
            <form className="login" onSubmit={handleSubmit}>
                <h3>Forgot Password</h3>
                <label>Email</label>
                <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                <button disabled={isLoading}>Submit</button>
                {error && <div className="error">{error}</div>} 

            </form>
        </div> 
    )
}

export default Login