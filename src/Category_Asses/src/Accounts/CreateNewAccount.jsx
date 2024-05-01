import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Create.css'
const CreateNewAccount = () => {
    const navigate=useNavigate()
    const [width, setWidth] = useState(100);
    const Nref=useRef(null)
    const Eref=useRef(null)
    const Mref=useRef(null)
    const Pref=useRef(null)
    const Rpref=useRef(null)
    const[MPop,SetMPop]=useState(false)
    const [EPop,SetEPop]=useState(false)
    const[PPop,setPPop]=useState(false)
    const HandleSubmit=(e)=>{
        const name=Nref.current.value
        const email=Eref.current.value
        const number=Mref.current.value
        const pass=Pref.current.value
        const rpass=Rpref.current.value
        
        axios.get('http://127.0.0.1:8000/LoginDetails/')
                    .then((d) => {
                        const FilterData=d.data.filter((e)=>{
                              return email==e.Email
                        })  
                        if(FilterData.length>0){
                            SetEPop(true)
                        }else{
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
            
                <span className=' text-warning'> <i className="fa-solid fa-user text-danger mr-2 rounded-circle"></i>Create New Account</span>
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
                        <input type="email" className='form-control' placeholder='Enter Email (Requred)*' ref={Eref}  required />
                    </div>


                    <div className='mt-3 mx-3'>
                        <label htmlFor="mn" className='form-label text-white'>Enter Your Mobile No. <span style={{ color: 'red' }}>*</span></label>
                        <input type="number" className='form-control' placeholder='Enter Your mobile Number (Requred)*'  ref={Mref} required />
                    </div>
                    <div className='mt-3 mx-3'>
                        <label htmlFor="mn" className='form-label text-white'>Password. <span style={{ color: 'red' }}>*</span></label>
                        <input type="password" className='form-control' placeholder='Enter Password*'  ref={Pref} required />
                    </div>
                    <div className='mt-3 mx-3'>
                        <label htmlFor="mn" className='form-label text-white'>RePassword <span style={{ color: 'red' }}>*</span></label>
                        <input type="password" className='form-control' placeholder='Enter again same password' ref={Rpref}  required />
                    </div>
                    <div className='text-center mt-4'>
                        <input type="submit" value="Create New Account" className='btn btn-primary mb-2 mt-2 col-9 bg-danger'/>
                    </div>
                </form>
                {EPop&&<>
                <div className='col-12 mb-3 d-flex flex-row justify-content-end' style={{position:'absolute',top:'10px'}}>
                         <div className='  col-10 col-sm-7 col-md-3 bg-primary p-2'>
                         <div className='col-12 d-flex flex-row justify-content-end '>
                                <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={()=>{
                                    SetEPop(false) 
                                }} style={{fontSize:'25px',borderRadius:'20px'}}></i>
 
                            </div>
                              <span className='text-white'>This email is already logged.</span>    
                         </div>
                </div>
                </>}
                {MPop&&<>
                <div className='col-12 mb-3 d-flex flex-row justify-content-end' style={{position:'absolute',top:'10px'}}>
                         <div className='  col-11 col-sm-10 col-md-5 bg-primary p-2'>
                         <div className='col-12 d-flex flex-row justify-content-end '>
                                <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={()=>{
                                    SetMPop(false)  
        
                                }} style={{fontSize:'25px',borderRadius:'20px'}}></i>
 
                            </div>
                              <span className='text-white'>Please Enter 10 digits for your number</span>    
                         </div>
                </div>
                </>}
                {PPop&&<>
                <div className='col-12 mb-3 d-flex flex-row justify-content-end' style={{position:'absolute',top:'10px'}}>
                         <div className='  col-11 col-sm-10 col-md-5 bg-primary p-2'>
                         <div className='col-12 d-flex flex-row justify-content-end '>
                                <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={()=>{
                                    setPPop(false)  
        
                                }} style={{fontSize:'25px',borderRadius:'20px'}}></i>
 
                            </div>
                              <span className='text-white'>Please Enter Password and Re Password Same </span>    
                         </div>
                </div>
                </>}
            </div>
           
        </>
    )
}

export default CreateNewAccount