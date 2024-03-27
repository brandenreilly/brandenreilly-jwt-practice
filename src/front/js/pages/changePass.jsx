import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const ChangePass = () => {
    const { store , actions } = useContext(Context)
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const [updatePass, setUpdatePass] = useState("")

    return(

        <div className='loginPage d-flex justify-content-center align-items-center'> 
        {!store.confirmed
        ?
            <div className='borderDiv text-center mt-5'>
                <h1>Verify Information</h1>
                <div className='loginInputs mt-4'>
                    <label htmlFor='firstPass' className='mx-1'><i class="fas fa-lock"></i></label>
                    <input type='password' id='firstPass' placeholder='Password' value={password1} onChange={(e)=>{setPassword1(e.target.value)}} />
                </div>
                <div className='mt-4 loginInputs'>
                    <label htmlFor='passLogin' className='mx-1'><i class="fas fa-lock"></i></label>
                    <input type='password' id='passLogin' placeholder='Confirm Password' value={password2} onChange={(e)=>{setPassword2(e.target.value)}}/>
                </div>
                {store.alert ? <div className='alert alert-danger alertStyle mt-3'>Incorrect password.</div>:<div></div>}
                <div className='mt-3'>
                    <button className='btn btn-dark' style={{ fontSize: "20px" }} onClick={()=>{actions.verifyPass()}} >Confirm</button>
                </div>
            </div>
        :
        <div className="borderDiv text-center mt-5">
            <h1>Update Password</h1>
            <div className="mt-3 loginInputs">
                <label className="mx-1" htmlFor="updatePass"><i class="fas fa-lock"></i></label>
                <input type="password" id="updatePass" placeholder="Updated Password" value={updatePass} onChange={(e)=>{setUpdatePass(e.target.value)}}></input>
            </div>
            <div className="mt-3">
                <button className="btn btn-success" style={{fontSize: '20px'}}>Update</button>
            </div>
        </div>
    }
        </div>
    )

}