import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  const [EPop, SetEPop] = useState(false)
  const [PPop, setPPop] = useState(false)
  const navigate = useNavigate();
  const emref = useRef(null)
  const pref = useRef(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const HandleSubmit = () => {
    const Em = emref.current.value
    const Pas = pref.current.value
    axios.get("http://127.0.0.1:8000/LoginDetails/")
      .then((response) => {
        let data = response.data;
        let Arr = []
        for (let entry of data) {
          if (entry.Email === Em) {
            Arr.unshift(1)
            if (entry.Password === Pas) {
              localStorage.setItem('id', entry.id)
              localStorage.setItem('CustamerName', entry.Custamer_Name)
              localStorage.setItem('email', entry.Email);
              localStorage.setItem('password', entry.Password);
              localStorage.setItem('mobile_number', entry.Mobile_Number)
              navigate('/Home')
            } else {
              setPPop(true)
            }

          }


        }
        if (Arr.length == 0) {
          SetEPop(true)
        }

      })

  }

  return (
    <div className='col-12 d-flex flex-column justify-content-center align-items-center linear  ' style={{ height:'100vh',overflow:'hidden',background:'' }}>
     
      <div className='col-12  d-flex flex-row justify-content-center   mt-5 p-2'>
        <div className='col-12 col-sm-9 col-md-6 col-lg-4 card mt-5 lineaar ' style={{ border: '2px solid gray',height:'400px',borderRadius:'20px',}} >
          <h6 className='ml-auto mr-auto mt-3 text-dark' style={{borderBottom:'2px solid gray'}}>Login</h6>
           <form action="" onSubmit={(event)=>{
                 event.preventDefault();
                 HandleSubmit();
              }}>
           <div className=' mt-3'>
            <label htmlFor="" className='form-label text-dark'>Email</label>
            <input type="email" required name="" id="" ref={emref} className='form-control ' style={{background:'rgb(0,0,0,0)',color:'black',fontSize:'16px'}}  placeholder='Enter valid email' />
          </div>
          <div className='mt-3 mb-2 '>
            <label htmlFor="" className='form-label text-dark'>Password</label>
            <input type="password" required name="" id="" ref={pref} style={{background:'rgb(0,0,0,0)',color:'black',fontSize:'16px'}} className='form-control' placeholder='Enter valid password' />
          </div>
          <div className='text-center mb-2'>
              <input type="submit" value="Login"  className='btn btn-primary mt-4' />
          </div>
           </form>
           <div className='mt-3'>
          <h6 style={{cursor:'pointer'}} className='text-danger ml-2 mb-2'>Don't have an account? <span className='text-dark' onClick={() => { navigate('/Reg') }} >Register here</span></h6>
          <h6 style={{cursor:'pointer'}} className='text-danger ml-2 mb-2'>Forget Password? <span className='text-dark' onClick={() => { navigate('/For') }} >Reset Password</span></h6>
        </div>

        </div>
      </div>
      {EPop && <>
        <div className='col-12 mb-3 d-flex flex-row justify-content-end' style={{ position: 'absolute', top: '10px' }}>
          <div className='bg-success p-2' style={{ borderRadius: '15px' }}>
            <div className='col-12 d-flex flex-row justify-content-end '>
              <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                SetEPop(false)

              }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

            </div>
            <span className='text-white p-5 pw'>Please enter valid email</span>
          </div>
        </div>
      </>}
      {PPop && <>
        <div className='col-12 mb-3 d-flex flex-row justify-content-end' style={{ position: 'absolute', top: '10px', borderRadius: '30px' }}>
          <div className=' bg-success p-2' style={{ borderRadius: '15px' }}>
            <div className='col-12 d-flex flex-row justify-content-end '>
              <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                setPPop(false)

              }} style={{ fontSize: '20px', borderRadius: '15px' }}></i>

            </div>
            <span className='text-white p-5 pw'>please enter valid password</span>
          </div>
        </div>
      </>}
    </div>
  )
}

export default Login;
