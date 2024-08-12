import React, { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import EmailIcon from '@mui/icons-material/Email';
import "./auth.css"
import useAuth from '../../hooks/useAuth';

const Auth = () => {
    const {Login, Register, authError, setAuthError} = useAuth();
    const [signup, setSignup] = useState(false)
    const [authData, setAuthData] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    })


    const handleLogin = () => {
        console.log("login clicked")
        Login(authData)
    }
    const handleSignup = () =>{
        console.log("signup clicked")
        if (authData.password === authData.confirmPassword){
            Register(authData);
            return
        }
        setAuthError({...authError, password:"Password do not match"})
    }
  return (
    <section className='auth-page'>
        <div className="auth-card">
            <h1 className='auth-header'>
                {
                    signup ? "Signup" : "Login"
                }
            </h1>
            {
                authError.username && (
                    <p className='form-error'>{authError.username}</p>
                )
            }
            <div className='auth-input-wrapper'>
                <PersonIcon/>
                <input value={authData.username} onChange={(e)=>{
                    setAuthData({...authData,username:e.target.value})
                    setAuthError({...authError,username:null})
                }} type="text" placeholder='Username' className='auth-input' />
            </div>
            {
                signup && (
                    <>
                        {
                            authError.email && (
                                <p className='form-error'>{authError.email}</p>
                            )
                        }
                        <div className='auth-input-wrapper'>
                            <EmailIcon/>
                            <input value={authData.email} onChange={(e)=>{
                                setAuthData({...authData,email:e.target.value})
                                setAuthError({...authError, email:null})
                            }} type="text" placeholder='Email' className='auth-input' />
                        </div>
                    </>
                )
            }
            {
                authError.password && (
                    <p className='form-error'>{authError.password}</p>
                )
            }
            <div className='auth-input-wrapper'>
                <LockIcon/>
                <input value={authData.password} onChange={(e)=>{
                    setAuthData({...authData,password:e.target.value})
                    setAuthError({...authError, password:null})
                }} type="password" placeholder='Password' className='auth-input'/>
            </div>
            {
                signup && (
                    <div className='auth-input-wrapper'>
                        <LockIcon/>
                        <input value={authData.confirmPassword} onChange={(e)=>{
                            setAuthData({...authData,confirmPassword:e.target.value})
                            setAuthError({...authError, password:null})
                        }} type="password" placeholder='Confirm Password' className='auth-input'/>
                    </div>
                )
            }
            <button className='auth-btn' onClick={
                        signup ? handleSignup : handleLogin
                    }>
                <span>
                    {
                        signup ? "Signup" : "Login"
                    }
                </span>
                <LoginIcon className='login-icon'/>
            </button>
            <p className='auth-toggle'>Don't have account yet? 
                <span onClick={()=>setSignup((prev)=>!prev)}>
                    {
                        !signup ? "Signup" : "Login"
                    }
                </span>
            </p>
        </div>
    </section>
  )
}

export default Auth