import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Create.css'
const CreateNewAccount = () => {
    const navigate = useNavigate()
    const [width, setWidth] = useState(100);
    const Nref = useRef(null)
    const Eref = useRef(null)
    const Mref = useRef(null)
    const Pref = useRef(null)
    const Rpref = useRef(null)
    const [MPop, SetMPop] = useState(false)
    const [EPop, SetEPop] = useState(false)
    const [PPop, setPPop] = useState(false)
    const HandleSubmit = (e) => {
        const name = Nref.current.value
        const email = Eref.current.value
        const number = Mref.current.value
        const pass = Pref.current.value
        const rpass = Rpref.current.value

        axios.get('http://127.0.0.1:8000/LoginDetails/')
            .then((d) => {
                const FilterData = d.data.filter((e) => {
                    return email == e.Email
                })
                if (FilterData.length > 0) {
                    SetEPop(true)
                } else {
                    const Data = {
                        "Email": email,
                        "Mobile_Number": number,
                        "Custamer_Name": name,
                        "Password": pass,
                        "JoinDate": new Date()
                    }
                    if (pass === rpass) {
                        if (String(number).length === 10) {
                            axios.post('http://127.0.0.1:8000/LoginDetails/', Data)
                                .then((d) => {
                                    navigate('/Login');
                                }).catch((e) => {
                                    alert("Please Try Again");
                                });
                        } else {

                            SetMPop(true)
                        }
                    } else {
                        setPPop(true)
                    }
                }

            }).catch((e) => {

            });


    }
    return (

        <>
            <div className='' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', overflowX: 'hidden' }}>

               
                <div className='d-flex flex-row justify-content-center col-12'>
                  
                    <div className='card mt-auto mb-auto col-12 col-sm-10 col-md-9 col-lg-8 col-xl-7' style={{ height: '570px' }}>
                    <span className='ml-auto mr-auto  ty2'> Create New Account</span>
                        <form action="" onSubmit={(e) => {
                            e.preventDefault()
                            HandleSubmit()

                        }}>
                            <div className='col-12 d-flex flex-column d-sm-flex flex-sm-row mt-4'>
                                <label htmlFor="fn" className='col-sm-5 col-md-4 ty'>Full Name<span style={{ color: 'red' }}>*</span></label>
                                <input type="text" className='form-control' placeholder='Full Name(Required)*' ref={Nref} required />
                            </div>
                            <div className='col-12 d-flex flex-column d-sm-flex flex-sm-row mt-4'>
                                <label htmlFor="fn" className='form-label col-sm-5 col-md-4 ty'>Email<span style={{ color: 'red' }}>*</span></label>
                                <input type="email" className='form-control' placeholder='Enter Email (Requred)*' ref={Eref} required />
                            </div>
                            <div className='col-12 d-flex flex-column d-sm-flex flex-sm-row mt-4'>
                                <label htmlFor="mn" className='form-label col-sm-5 col-md-4 ty'>Enter  Mobile No. <span style={{ color: 'red' }}>*</span></label>
                                <input type="number" className='form-control' placeholder='Enter Your mobile Number (Requred)*' ref={Mref} required />
                            </div>
                            <div className='col-12 d-flex flex-column d-sm-flex flex-sm-row mt-4'>
                                <label htmlFor="mn" className='form-label col-sm-5 col-md-4 ty'>Password. <span style={{ color: 'red' }}>*</span></label>
                                <input type="password" className='form-control' placeholder='Enter Password*' ref={Pref} required />
                            </div>
                            <div className='col-12 d-flex flex-column d-sm-flex flex-sm-row mt-4'>
                                <label htmlFor="mn" className='form-label col-sm-5 col-md-4 ty'>RePassword <span style={{ color: 'red' }}>*</span></label>
                                <input type="password" className='form-control' placeholder='Enter again same password' ref={Rpref} required />
                            </div>
                            <div className='text-center mt-4 p-2'>
                             <input type="submit" value="Create New Account" className='btn text-light mb-2 mt-2 p-2 bg-danger'/>
                        </div>
                        </form>
                    </div>
                </div>
                {EPop&&<>
                <div className='col-12 mb-3 d-flex flex-row justify-content-end' style={{position:'absolute',top:'10px'}}>
                         <div className='   bg-danger p-2' style={{borderRadius:'15px'}}>
                         <div className='col-12 d-flex flex-row justify-content-end '>
                                <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={()=>{
                                    SetEPop(false) 
                                }} style={{fontSize:'25px',borderRadius:'20px'}}></i>
 
                            </div>
                              <span className='text-white p-5'>This email is already logged.</span>    
                         </div>
                </div>
                </>}
                {MPop&&<>
                <div className='col-12 mb-3 d-flex flex-row justify-content-end' style={{position:'absolute',top:'10px'}}>
                         <div className='   bg-primary p-2' style={{borderRadius:'15px'}}>
                         <div className='col-12 d-flex flex-row justify-content-end '>
                                <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={()=>{
                                    SetMPop(false)  
        
                                }} style={{fontSize:'25px',borderRadius:'20px'}}></i>
 
                            </div>
                              <span className='text-white p-5'>Please Enter 10 digits for your number</span>    
                         </div>
                </div>
                </>}
                {PPop&&<>
                <div className='col-12 mb-3 d-flex flex-row justify-content-end ' style={{position:'absolute',top:'10px'}}>
                         <div className='    p-2' style={{borderRadius:'15px',backgroundColor:'gray'}}>
                         <div className='col-12 d-flex flex-row justify-content-end ' >
                                <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={()=>{
                                    setPPop(false)  
        
                                }} style={{fontSize:'25px',borderRadius:'20px'}}></i>
 
                            </div>
                              <span className='text-light p-5'>Please Enter Password and Re Password Same </span>    
                         </div>
                </div></>}
            </div>

        </>
    )
}

export default CreateNewAccount