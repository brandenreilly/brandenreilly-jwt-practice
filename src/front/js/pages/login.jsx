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
        actions.login(username, password).then((resp)=>{
            if(resp == true)navigate('/private')
        })
    }

    const handleAlert = () => {
        
    }

    return (
        <div className='loginPage d-flex justify-content-center align-items-center'>
            {store.token && store.token != "" && store.token != undefined ? "You are logged in with this token: " +store.token : 
            <div className='borderDiv text-center mt-5'>
                <h1>Log In</h1>
                <div className='loginInputs mt-4'>
                    <label htmlFor='userLogin' className='mx-1'><i class="fas fa-user"></i></label>
                    <input type='text' id='userLogin' placeholder='Username' value={username} onChange={(e)=>{setUsername(e.target.value)}} />
                </div>
                <div className='mt-4 loginInputs'>
                    <label htmlFor='passLogin' className='mx-1'><i class="fas fa-lock"></i></label>
                    <input type='password' id='passLogin' placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                {store.alert ? <div className='alert alert-danger alertStyle mt-3'>Incorrect username or password.</div>:<div></div>}
                <div className='mt-3'>
                    <button className='btn btn-dark' style={{ fontSize: "20px" }} onClick={()=>{handleLogin()}}>Login</button>
                </div>
                <div className='mt-3'>
                    <a className='signupLink' href='/signup' style={{ cursor: 'pointer' }}>New User? Click here to signup</a>
                </div>
            </div>
            }
        </div>
    )
}