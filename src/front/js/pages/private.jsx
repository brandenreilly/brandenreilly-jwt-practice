import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

export const PrivatePage = () => {
    const { store, actions } = useContext(Context)
    const [testVar, setTestVar] = useState()
    const navigate = useNavigate()
    const token = sessionStorage.getItem('token')
    useEffect(()=>{
        handleGET()
    },[])

    const handleGET = () => {
		const opts = {
			method: 'GET',
			headers: {
				'Authorization': 'Bearer '+store.token
			}
		}
		fetch("https://opulent-journey-q7759797qq9vcrxv-3001.app.github.dev/api/private", opts)
		.then(resp => resp.json())
		.then(data => setTestVar(data))
	}
    return(
        <div className='container'>
            {!store.token 
            ? <div className='text-center'>
                <p>You must log in to view this page.</p>
              </div>
            : <div className='text-center'>
                <h1>Hello, {testVar}!</h1>
                <p>You are currently logged in as {testVar}</p>
                <p>with token: {token}</p>
              </div>
            }
        </div>


    )
}