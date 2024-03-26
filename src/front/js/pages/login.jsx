import React, { useContext, useState } from 'react';
import { AppContext } from '../layout';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

export const LoginPage = () => {
    const { store , actions } = useContext(Context)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handleLogin = async () => {
        actions.login(username, password).then((bool)=>{
            if(bool == true)navigate('/private')
        })
    }

    return (
        <div className='container'>
            {store.token && store.token != "" && store.token != undefined ? "You are logged in with this token: " +store.token : 
            <div className='text-center mt-5'>
                <input type='text' placeholder='user' value={username} onChange={(e)=>{setUsername(e.target.value)}} />
                <input type='password' placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <button className='btn btn-primary' onClick={()=>{handleLogin()}}>Login</button>
                <br/>
                <a className='mt-5' onClick={()=>{navigate('/signup')}} style={{ cursor: 'pointer' }}>New User? Click here to signup</a>
            </div>
            }
        </div>
    )
}