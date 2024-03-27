import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';

export const SignupPage = () => {
    const { store , actions } = useContext(Context)
    const [loginAlert , setLoginAlert] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    const handleCreateUser = async () => {
        setLoginAlert(true)
        const opts = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }
        const resp = await fetch('https://opulent-journey-q7759797qq9vcrxv-3001.app.github.dev/api/signup', opts)
        if (resp.status == 200) return true
        else console.log('ERROR')
        const data = await resp.json()
        console.log(data)
        
    }

    return(
        <div className='loginPage d-flex justify-content-center align-items-center'>
            {loginAlert == true?<div className='alert alert-success'>Please proceed to login.</div>: 
            <div className='borderDiv text-center mt-5'>
                <h1>Create Account</h1>
                <div className='loginInputs mt-4'>
                    <label htmlFor='signupUser' className='mx-1'><i class="fas fa-user"></i></label>
                    <input type='text' id='signupUser' placeholder='Username' value={username} onChange={(e)=>{setUsername(e.target.value)}} ></input>
                </div>
                <div className='mt-4 loginInputs'>
                    <label htmlFor='signupPass' className='mx-1'><i class="fas fa-lock"></i></label>
                    <input type='password' id='signupPass' placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
                </div>
                <div className='mt-3'>
                    <button className='btn btn-dark' onClick={()=>{handleCreateUser()}}>Sign Up</button>
                </div>
            </div>
            }
        </div>

    )
}