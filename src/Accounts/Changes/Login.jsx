import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
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
        for (let entry of data) {

          if (entry.Email === Em && entry.Password === Pas) {
            localStorage.setItem('id',entry.id)
            localStorage.setItem('CustamerName',entry.Custamer_Name)
            localStorage.setItem('email', entry.Email );
            localStorage.setItem('password',entry.Password);
            navigate('/Home'); 
            return// Navigate to Home page upon successful login
           
          } 
          
        
        }
        alert('Password/Mail Wrong')
        
      })
     
  }

  return (
    <div className='container-fluid' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#860569', height: '100vh' }}>
      <h1 className='mt-5 text-warning'> <i className="fa-solid fa-user text-danger mr-2 rounded-circle"></i>Login Here</h1>
      <form onSubmit={(event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        HandleSubmit();
      }} className='form-group shadow-lg mt-5' style={{ background: '#004646', borderRadius: '50px', maxWidth: '400px', width: '90%' }}>

        <div className='mt-4 mx-3'>
          <label htmlFor="ml" className='form-label text-warning'>Enter Your Mail<span style={{ color: 'red' }}>*</span></label>
          <input type="email" className='form-control' placeholder='Enter Your mail/Password' name='ml' id='ml' ref={emref} required />
        </div>

        <div className='mt-4 mx-3'>
          <label className='form-label text-warning' htmlFor="pw">Enter Your Password <span style={{ color: 'red' }}>*</span></label>
          <input type="password" className='form-control' name="pw" id="pw" ref={pref} required placeholder='Enter password' />
        </div>

        <div className='text-center mb-2'>
          <input type="submit" value="Login" className='btn btn-primary mt-4' />
        </div>

        <div className='mx-3'>
          <h6 style={{cursor:'pointer'}} className='text-success ml-2 mb-2'>Don't have an account? <span className='text-light' onClick={() => { navigate('/Reg') }} >Register here</span></h6>
          <h6 style={{cursor:'pointer'}} className='text-success ml-2 mb-2'>For Get Password? <span className='text-light' onClick={() => { navigate('/For') }} >Reset Password</span></h6>
        </div>
      </form>
    </div>
  )
}

export default Login;
