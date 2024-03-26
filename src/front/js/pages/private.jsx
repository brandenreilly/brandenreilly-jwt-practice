import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

export const PrivatePage = () => {
    const { store, actions } = useContext(Context)
    const [testVar, setTestVar] = useState()
    const navigate = useNavigate()
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
                <p>You are currently logged in as {testVar}</p>
                <button className='btn btn-primary' onClick={()=>{console.log(testVar)}}></button>
              </div>

            }

        </div>


    )
}