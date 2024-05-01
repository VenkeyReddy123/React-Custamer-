import React, { useState } from 'react';
import '../src/App.css'
import './Dsidebar.css'
import { useNavigate } from 'react-router-dom';


const DSidebar = ({DisplySidebar,DSide}) => {
  const navigate=useNavigate()
  const Email=localStorage.getItem('email')?true:false
  const HandleLogout = () => {
      localStorage.removeItem('email')
      navigate("/")
  }

  let Cat = ['Electronics', 'Fashion', 'Home&Garden', 'Health&Beauty', 'Books&Media', 'Sports&OutDors', 'Toys&Games', 'Automotive', 'Jewelry&Accessories'];
  const [OnClick, setOnClick] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [backgroundVisible, setBackgroundVisible] = useState(false);


  return (
    <>

    
       <div style={{overflow:'hidden'}}>
       <div className={`d-block d-md-block col-12 d-flex flex-row justify-content-end mt-2 ml-4` }>
                      <i  onClick={()=>{
                        DisplySidebar()
                      }} class="fa-regular fa-circle-xmark p-1  text-white bg-danger" style={{fontSize:'25px',borderRadius:'30px',position:'fixed'}}></i>
             </div>
       <ul class="navbar-nav mr-auto text-center">

          <li class="nav-item active mt-5">

            <a class="nav-link text-dark mt-5" style={{ cursor: 'pointer' }} onClick={() => { navigate('/Home') }}>Home</a>
          </li>
          <li class="nav-item active mt-5">
            <a class="nav-link text-dark mt-5" style={{ cursor: 'pointer' }} onClick={() => { navigate('/Product') }} >Products</a>
          </li>
          <li class="nav-item active mt-5">
            <a class="nav-link text-dark mt-5 " style={{ cursor: 'pointer' }} onClick={() => { navigate('/Addcard') }}>Addcards</a>
          </li>
          <li class="nav-item active mt-5">
            <a class="nav-link text-dark mt-5" style={{ cursor: 'pointer' }} onClick={() => { navigate('/Order') }}>Orders</a>
          </li>
          <li class="nav-item dropdown mt-5 mb-5 ml-auto mr-auto">
          {Email?<>
                            <a class="nav-link d-flex flex-row mt-5" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                                <div className='d-flex flex-column mt-5'>
                                    <span className='text-dark' href="">Sign Out</span>
                                    <span className='text-warning'>My Account</span>
                                </div>

                            </a>
                            <div class="dropdown-menu">
                                
                                <a class="dropdown-item" style={{ cursor: 'pointer' }} onClick={HandleLogout} >Logout</a>
                            </div>

                            </>:<>
                            <a class="nav-link d-flex flex-row" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                                <div className='d-flex flex-column'>
                                    <span className='text-dark' href="">Sign In</span>
                                    <span className='text-warning'>Your Account</span>
                                </div>

                            </a>
                            <div class="dropdown-menu">    
                                <a class="dropdown-item" style={{ cursor: 'pointer' }} onClick={()=>{
                                    navigate('/Login')
                                }} >Login</a>
                            </div></>
                            }
          </li>
        </ul>
  
       </div>
    </>
  )
}

export default DSidebar;
