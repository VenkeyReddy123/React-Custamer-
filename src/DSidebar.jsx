import React, { useState } from 'react';
import '../src/App.css'
import './Dsidebar.css'
import { useNavigate } from 'react-router-dom';


const DSidebar = ({ DisplySidebar, Value }) => {

  const navigate = useNavigate()
  const Email = localStorage.getItem('email') ? true : false
  const HandleLogout = () => {
    localStorage.removeItem('email')
    localStorage.removeItem('id')
    localStorage.removeItem('CustamerName')
    localStorage.removeItem("mobile_number")
    localStorage.removeItem("password")
    navigate("/Home")
    window.location.reload()
  }




  return (
    <>


      <div className='col-12 ' style={{ overflow: 'hidden',height:'100%',background:'lightgray' }}>

        <div className={`d-block d-md-block  d-flex flex-row justify-content-end mt-4 `}>
          <i  onClick={() => {
            DisplySidebar()
          }} class={` ${Value ? 'd-block' : 'd-none'} fa-regular fa-circle-xmark p-1  text-danger`} style={{ fontSize: '25px',cursor:'pointer', borderRadius: '30px'}}></i>
        </div>
        <ul class="navbar-nav  mr-auto text-center ">
          <li class="nav-item active " style={{ visibility: 'hidden' }}>
            <a class="nav-link text-dark Hover " onClick={() => { navigate('/Product') }} >Products</a>
          </li>
          <li class="nav-item active mt-5">
            <a class="nav-link text-dark Hover " onClick={() => { navigate('/Home') }} >Home</a>
          </li>
          <li class="nav-item active mt-5">
            <a class="nav-link text-dark Hover " onClick={() => { navigate('/Product') }} >Products</a>
          </li>
          <li class="nav-item active mt-5">
            <a class="nav-link text-dark Hover" onClick={() => { navigate('/Order') }}>Orders</a>
          </li>
          <ul className='navbar-nav '>
                    <li class="nav-item dropdown mt-5 mb-5 ml-auto mr-auto">
                     {Email?<>
                          <button className='btn text-dark Hover' onClick={()=>{
                            HandleLogout()
                          }}>Logout</button>
                     </>:<><button className='btn text-dark Hover' onClick={()=>{
                        navigate('/Login')
                     }}>Login</button></>}
                  </li>
                        <li className="nav-item active mt-5 ml-auto mr-auto" onClick={() => { navigate('/Addcard') }}>
                            <div className='d-flex flex-row mt-auto mb-auto '>
                                <a class="nav-link text-dark "  ><i class="fa-solid fa-cart-plus" style={{ fontSize: '20px', cursor: 'pointer' }}></i></a><span className='text-dark mt-1 ml-3 Hover'>My Cart</span>
                            </div>
                        </li>
                    </ul>
        </ul>
      </div>


    </>
  )
}

export default DSidebar;
