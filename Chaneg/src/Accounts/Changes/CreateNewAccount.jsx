import axios from 'axios'
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateNewAccount = () => {
    const navigate=useNavigate()
    const Nref=useRef(null)
    const Eref=useRef(null)
    const Mref=useRef(null)
    const Pref=useRef(null)
    const Rpref=useRef(null)
    const HandleSubmit=(e)=>{

        const name=Nref.current.value
        const email=Eref.current.value
        const number=Mref.current.value
        const pass=Pref.current.value
        const rpass=Rpref.current.value
       const Data={
            "Email":email,
            "Mobile_Number":number,
            "Custamer_Name":name,
            "Password":pass 
        }
        if (pass === rpass) {
            if (String(number).length === 10) {
                axios.post('http://127.0.0.1:8000/LoginDetails/', Data)
                    .then((d) => {
                        alert('Created Done');
                        navigate('/Login');
                    }).catch((e) => {
                        alert("Please Try Again");
                    });
            } else {
                alert('Please Enter 10 digits for your number');
            }
        } else {
            alert('Password and Re-entered Password do not match');
        }
    }        
    return (
        <>
            <div className='container-fluid' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', overflowX: 'hidden' }}>
                <span className='mt-3 text-warning'> <i className="fa-solid fa-user text-danger mr-2 rounded-circle"></i>Create New Account</span>
                <form onSubmit={(e)=>{
                    e.preventDefault()
                    HandleSubmit()

                }} className='form-group shadow mt-5' style={{ background: '#092C9C', borderRadius: '50px', maxWidth: '400px', width: '90%' }} >

                    <div className='mt-3 mx-3'>
                        <label htmlFor="fn" className='form-label text-white'>Full Name<span style={{ color: 'red' }}>*</span></label>
                        <input type="text" className='form-control' placeholder='Full Name(Required)*'  ref={Nref} required />
                    </div>

                    <div className='mt-3 mx-3'>
                        <label htmlFor="fn" className='form-label text-white'>Email<span style={{ color: 'red' }}>*</span></label>
                        <input type="email" className='form-control' placeholder='Phone Email (Requred)*' ref={Eref}  required />
                    </div>


                    <div className='mt-3 mx-3'>
                        <label htmlFor="mn" className='form-label text-white'>Enter Your Mobile No. <span style={{ color: 'red' }}>*</span></label>
                        <input type="number" className='form-control' placeholder='Enter Your mobile Number (Requred)*'  ref={Mref} required />
                    </div>
                    <div className='mt-3 mx-3'>
                        <label htmlFor="mn" className='form-label text-white'>Password. <span style={{ color: 'red' }}>*</span></label>
                        <input type="password" className='form-control' placeholder='Enter Your mobile Number (Requred)*'  ref={Pref} required />
                    </div>
                    <div className='mt-3 mx-3'>
                        <label htmlFor="mn" className='form-label text-white'>RePassword <span style={{ color: 'red' }}>*</span></label>
                        <input type="password" className='form-control' placeholder='Enter Your mobile Number' ref={Rpref}  required />
                    </div>
                    <div className='text-center mt-4'>
                        <input type="submit" value="Create New Account" className='btn btn-primary mb-2 mt-2 col-9 bg-danger'/>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateNewAccount