import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import mikePhoto from '../../img/m101.jpg'

export const PrivatePage = () => {
    const { store, actions } = useContext(Context)
    const [testVar, setTestVar] = useState()
    const navigate = useNavigate()
    const token = sessionStorage.getItem('token')

    useEffect(()=>{
        actions.handleGET(token)
    },[])

    return(
        <div className='container'>
            {!store.token 
            ? <div className='text-center'>
                <p>You must log in to view this page.</p>
              </div>
            : <div className='text-center' style={{ textWrap: 'wrap' }}>
                <h1>Hello, {store.testVar}!</h1>
                <img src={mikePhoto}></img>
                <p>You are currently logged in as {store.testVar}</p>
                <p style={{width: '80vw', textWrap: 'wrap' , wordWrap: 'break-word'}}>with token: {store.token}</p>
              </div>
            }
        </div>


    )
}