import React, { useEffect, useRef, useState } from 'react'
import './HomeComponents/Home.css'
import HomePage2 from './HomeComponents/HomePage2'
import { useNavigate } from 'react-router-dom'
import { TopDealsFM } from './HomeComponents/TopDealsFM'
import Electronic from './HomeComponents/Electronic'
import Off from '../src/HomeComponents/Off'
import DSidebar from './DSidebar'
import Navbar from './HomeComponents/Navbar'
import Footer from './Footer'
import Shop_By from './HomeComponents/Shop_By'
import axios from 'axios'
import CardImages from './HomeComponents/CardImages'
import ArrivalItems from './HomeComponents/ArrivalItems'
import Detaisl from './HomeComponents/Detaisl'
import Recamandete from './HomeComponents/Recamandete'
import './Dsidebar.css'
import Nav2 from './Nav2'
import { Shop_by as Shop } from './HomeComponents/Shop_by2'
import {Catigories} from './Data.jsx'
import Category from './HomeComponents/Category.jsx'

import './PDIsply.css'

const HomePage = () => {
    const navigate = useNavigate()
    const emref = useRef(null)
    const pref = useRef(null)
    const Email = localStorage.getItem('email') ? true : false
    const [AutoComplete, SetAutoComplete] = useState()
    const [OnClick, setOnClick] = useState(false);
    const [DSide, setDSide] = useState(false)
    const [LPop, setLPop] = useState(false)
    const [EPop,SetEPop]=useState(false)
    const[PPop,setPPop]=useState(false)

    const Callback = () => {
        setOnClick(!OnClick)

    }

    const [Data2, setData2] = useState(null)
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {
            setData2(Shop)
        }).catch((e) => {
            alert('Please Try AGian Later Somthing Eroor')
        })
        const Condition = localStorage.getItem('Count') ? true : false
        if (!Condition) {
            if (!localStorage.getItem('email')) {
             
                setLPop(true)
            }
        }
    }, [])
    const DisplySidebar = () => {

        setDSide(!DSide)
    }
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < Data2.length - 1) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevIndex => prevIndex - 1);
        }
    };
    const HanldeAutoComplete = (FilterData) => {
        SetAutoComplete(FilterData)
    }
    const HandleSubmit = () => {
        const Em = emref.current.value
        const Pas = pref.current.value
        axios.get("http://127.0.0.1:8000/LoginDetails/")
          .then((response) => {
            let data = response.data;
            let Arr=[]
            for (let entry of data) {
    
              if (entry.Email === Em) {
                
                   Arr.unshift(1)
                 
                 if(entry.Password === Pas){
                  localStorage.setItem('id',entry.id)
                  localStorage.setItem('CustamerName',entry.Custamer_Name)
                  localStorage.setItem('email', entry.Email );
                  localStorage.setItem('password',entry.Password);
                  localStorage.setItem('mobile_number',entry.Mobile_Number)
                  localStorage.setItem('Count',1)
                  navigate('/Home')
                 }else{
                    setPPop(true)
                 }
               
              } 
              
            
            }
            if(!Arr){
               SetEPop(true)
            }
            
          })
         
      }
      const [Hand,setHan]=useState(false)
      const[CatData,setCatData]=useState([])
      const HandleOverCat=(Data)=>{
           setCatData(Data)
           setHan(true)
      }
      const HandleRemove=()=>{
        setCatData([])
        setHan(false)
      }
    return (
        <>




            {/* <div style={{ width: '100%', overflow: 'hidden' }} >
                <Nav2  HanldeAutoComplete={HanldeAutoComplete} />
            </div> */}

            <nav style={{ background: 'black', overflow: 'hidden' }} class="navbar navbar-expand-lg navbar-light  mt-2">

                <Navbar Callback={Callback} DisplySidebar={DisplySidebar} />
            </nav>
            <nav style={{ background: 'white', }} class="navbar navbar-expand-lg navbar-light  mt-2">

                <Category HandleOverCat={HandleOverCat} HandleRemove={HandleRemove} />
            </nav>
            <div  className='mt-2 d-flex flex-column justify-content-start' style={{ overflowX: 'hidden' }}>
                <HomePage2 HandleRemove={HandleRemove}/>
            </div>
            <div className='mt-2 d-flex flex-column justify-content-start' style={{ overflowX: 'hidden' }} >
                <TopDealsFM />
            </div>
            <div className='mt-2 d-flex flex-column justify-content-start' style={{ overflowX: 'hidden' }} >
                <Electronic />
            </div>
            <div className='mt-2' style={{ overflowX: 'hidden' }} >
                <CardImages />
            </div>

            <div className='mt-2' style={{ overflowX: 'hidden' }} >
                <Detaisl />
            </div>
            <div className='mt-5 mb-2' style={{ overflowX: 'hidden' }} >
                <Recamandete />
            </div>

            <div className='mt-2 d-flex flex-column justify-content-start' style={{ overflowX: 'hidden' }} >
                <Off />
            </div>
            <div className='mt-2 d-flex flex-column justify-content-start' style={{ overflowX: 'hidden' }} >
                <Footer />
            </div>
            {OnClick && <div className='col-sm-11 col-md-6 col-lg-4' style={{  background: '#2457AA',position: 'absolute', top: '10px', left: '-20px', overflow: 'hidden' }} >
            <div className='col-12 d-flex flex-row justify-content-end mt-3  mb-2'>
                                <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={()=>{
                                     
                                     setOnClick(false)
                                }} style={{fontSize:'25px',borderRadius:'20px'}}></i>
 
                            </div>
                {Catigories.slice().map((e, index) => {
                    return (
                        <div key={index} className='card-footer text-start ml-2' style={{ height: '60px', background: '#2457AA', cursor: 'pointer', transitionDelay: `${index * 0.1}s` }} >
                             
                            <div className='d-flex flex-row'>
                                <i className="fa-solid fa-arrow-right mt-2  mr-3 text-light" style={{ fontSize: '30px' }}></i>
                                <h5 className='mt-2 text-light' onClick={() => { navigate("/Product", { state: { Cat: e } }) }}>{e}</h5>
                            </div>
                        </div>
                    )
                })}
            </div>}
            <div className={`bg-light ${DSide ? 'dside' : 'ddside'}`} style={{ height: '100vh', position: 'absolute', top: '0px', right: '0px', overflow: 'hidden' }}>
                <DSidebar DisplySidebar={DisplySidebar} />
            </div>
            {LPop && <>
                <div className='col-11 ml-5  shadow-lg' style={{ background:'yellow', position: 'absolute', top: '90px' }}>
                <div className='col-12 d-flex flex-row justify-content-end mt-2 '>
                                <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={()=>{
                                    setLPop(false)  
                                }} style={{fontSize:'25px',borderRadius:'20px'}}></i>
 
                            </div>
                    <div className='d-flex flex-row justify-content-center'>
                        <form onSubmit={(event) => {
                            event.preventDefault();
                            HandleSubmit();
                        }} className='form-group  mt-5' style={{ borderRadius: '50px', maxWidth: '400px', width: '90%' }}>

                            <div className='mt-4 mx-3'>
                                <label htmlFor="ml" className='form-label text-warning'>Enter Your Mail<span style={{ color: 'red' }}>*</span></label>
                                <input type="email" className='form-control' placeholder='Enter Your mail' name='ml' id='ml' ref={emref} required />
                            </div>

                            <div className='mt-4 mx-3'>
                                <label className='form-label text-warning' htmlFor="pw">Enter Your Password <span style={{ color: 'red' }}>*</span></label>
                                <input type="password" className='form-control' name="pw" id="pw" ref={pref} required placeholder='Enter password' />
                            </div>

                            <div className='text-center mb-2'>
                                <input type="submit" value="Login" className='btn btn-primary mt-4' />
                            </div>

                            <div className='mx-3'>
                                <h6 style={{ cursor: 'pointer' }} className='text-success ml-2 mb-2'>Don't have an account? <span className='text-dark' onClick={() => { navigate('/Reg') }} >Register here</span></h6>
                            </div>
                        </form>
                        {EPop&&<>
                      <div className='col-12 mb-3 d-flex flex-row justify-content-end' style={{position:'absolute',top:'10px'}}>
                         <div className='  col-10 col-sm-7 col-md-3 bg-primary p-2'>
                         <div className='col-12 d-flex flex-row justify-content-end '>
                                <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={()=>{
                                    SetEPop(false)  
                                    window.location.reload()
                                }} style={{fontSize:'25px',borderRadius:'20px'}}></i>
 
                            </div>
                              <span className='text-white'>Please Enter Valid EMail</span>    
                         </div>
                </div>
      </>}
      {PPop&&<>
                <div className='col-12 mb-3 d-flex flex-row justify-content-end' style={{position:'absolute',top:'10px'}}>
                         <div className='  col-10 col-sm-7 col-md-3 bg-primary p-2'>
                         <div className='col-12 d-flex flex-row justify-content-end '>
                                <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={()=>{
                                    setPPop(false)  
                                    window.location.reload()
                                }} style={{fontSize:'25px',borderRadius:'20px'}}></i>
 
                            </div>
                              <span className='text-white'>Please Enter Valid Password</span>    
                         </div>
                </div>
      </>}
                    </div>
                </div>
            </>}
            {Hand&&CatData&&<>
            <div className='p-5 shadow' style={{position:'absolute',top:'160px',background:'white',marginLeft:'20px'}}>
                  {CatData.map((e)=>{
                   
                    return (
                        <>
                          <li onClick={()=>{
                              navigate("/List",{state:{Cat_Name:e.slice(0,5)}})
                          }} style={{cursor:'pointer'}} className='p-2 Cat'>{e}</li>
                        </>
                    )
                  })}
            </div>
             </>}


        </>
    )
}

export default HomePage
