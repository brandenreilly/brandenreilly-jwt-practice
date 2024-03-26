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
        <div className='container'>
            {loginAlert == true
            ? <div className='alert alert-success'><p>Please proceed to login.</p></div>
            : 
            <div className='text-center'>
                <input type='text' id='signupUser' placeholder='user' value={username} onChange={(e)=>{setUsername(e.target.value)}} ></input>
                <input type='password' id='signupPass' placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
                <br/>
                <button className='btn btn-primary' onClick={()=>{handleCreateUser()}}>Sign Up</button>
            </div>
            }
        </div>

    )
}