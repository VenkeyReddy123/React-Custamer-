import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Off = () => {
    const navigate = useNavigate()
    const [Data2, setData2] = useState(null)



    useEffect(() => {
        axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {
            setData2(d.data)
           

        }).catch((e) => {
            alert('Please Try AGian Later Somthing Eroor')
        })

    }, [])
  return (
   <>
     <div className='col-12 d-sm-flex flex-sm-column d-md-flex flex-md-row' style={{overflowX:'hidden'}}>
                <div className='col-sm-11 col-md-4 card-body mt-2'style={{ background: '#044EA3' }}>
                    {/* <span className='container text-center' style={{fontWeight:'bold'}}>Upto 70% Off|<br></br>Expore And Buy</span> */}
                    <div className='col-12 d-flex flex-row justify-content-between'  >
                        <div className='col-6' style={{ height: '150px', overflow: 'hidden' }}>
                            {Data2 && Data2.slice(52,53).map((e) => {
                                return (
                                    <>
                                        <img src={e.ImageUrl} alt="" srcset="" style={{ height: '150px' }} onClick={()=>{navigate("/Dis",{state:{data:e}})}}  />
                                    </>
                                )
                            })}
                        </div>
                        <div className='col-6' style={{ height: '150px', overflow: 'hidden' }}>
                            {Data2 && Data2.slice(54, 55).map((e) => {
                                return (
                                    <>
                                        <img src={e.ImageUrl} alt="" srcset="" style={{ height: '150px' }} onClick={()=>{navigate("/Dis",{state:{data:e}})}}  />
                                    </>
                                )
                            })}
                        </div>
                    </div>
                    <div className='col-12 d-flex flex-row justify-content-between mt-2'>
                        <div className='col-6' style={{ height: '150px', overflow: 'hidden' }}>
                            {Data2 && Data2.slice(55, 56).map((e) => {
                                return (
                                    <>
                                        <img src={e.ImageUrl} alt="" srcset="" style={{ height: '150px', overflow: 'hidden' }} onClick={()=>{navigate("/Dis",{state:{data:e}})}}  />
                                    </>
                                )
                            })}
                        </div>
                        <div className='col-6' style={{ height: '150px', overflowX: 'hidden' }}>
                            {Data2 && Data2.slice(56, 57).map((e) => {
                                return (
                                    <>
                                        <img src={e.ImageUrl} alt="" srcset="" style={{ height: '150px' }} onClick={()=>{navigate("/Dis",{state:{data:e}})}}   />
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className='col-sm-11 col-md-4 card-body mt-2 ml-auto' style={{ background: '#E3E6E6' }}>
                {/* <span className='container text-center' style={{fontWeight:'bold'}}>Upto 50% Off|<br></br>Expore And Buy</span> */}
                    <div className='col-12 d-flex flex-row justify-content-between'>
                        <div className='col-6' style={{ height: '150px', overflow: 'hidden' }}>
                            {Data2 && Data2.slice(57, 58).map((e) => {
                                return (
                                    <>
                                        <img src={e.ImageUrl} alt="" srcset="" style={{ height: '150px' }} onClick={()=>{navigate("/Dis",{state:{data:e}})}} />
                                    </>
                                )
                            })}
                        </div>
                        <div className='col-6' style={{ height: '150px', overflow: 'hidden' }}>
                            {Data2 && Data2.slice(58, 59).map((e) => {
                                return (
                                    <>
                                        <img src={e.ImageUrl} alt="" srcset="" style={{ height: '150px' }} onClick={()=>{navigate("/Dis",{state:{data:e}})}} />
                                    </>
                                )
                            })}
                        </div>
                    </div>
                    <div className='col-12 d-flex flex-row justify-content-between mt-2'>
                        <div className='col-6' style={{ height: '150px', overflow: 'hidden' }}>
                            {Data2 && Data2.slice(59, 60).map((e) => {
                                return (
                                    <>
                                        <img src={e.ImageUrl} alt="" srcset="" style={{ height: '150px', overflow: 'hidden' }} onClick={()=>{navigate("/Dis",{state:{data:e}})}} />
                                    </>
                                )
                            })}
                        </div>
                        <div className='col-6' style={{ height: '150px', overflowX: 'hidden' }}>
                            {Data2 && Data2.slice(61,62).map((e) => {
                                return (
                                    <>
                                        <img src={e.ImageUrl} alt="" srcset="" style={{ height: '150px' }} onClick={()=>{navigate("/Dis",{state:{data:e}})}} />
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
               
                <div className='col-sm-11 col-md-4 card-body mt-2 ml-auto' style={{ background: '#756663' }}>
                {/* <span className='container text-center' style={{fontWeight:'bold'}}>Upto 30% Off|<br></br>Expore And Buy</span> */}
                
                    <div className='col-12 d-flex flex-row justify-content-between'>
                        <div className='col-6' style={{ height: '150px', overflow: 'hidden' }}>
                            {Data2 && Data2.slice(28, 29).map((e) => {
                                return (
                                    <>
                                        <img src={e.ImageUrl} alt="" srcset="" style={{ height: '150px' }} onClick={()=>{navigate("/Dis",{state:{data:e}})}} />
                                    </>
                                )
                            })}
                        </div>
                        <div className='col-6' style={{ height: '150px', overflow: 'hidden' }}>
                            {Data2 && Data2.slice(29,30).map((e) => {
                                return (
                                    <>
                                        <img src={e.ImageUrl} alt="" srcset="" style={{ height: '150px' }} onClick={()=>{navigate("/Dis",{state:{data:e}})}} />
                                    </>
                                )
                            })}
                        </div>
                    </div>
                    <div className='col-12 d-flex flex-row justify-content-between mt-2'>
                        <div className='col-6' style={{ height: '150px', overflow: 'hidden' }}>
                            {Data2 && Data2.slice(62, 63).map((e) => {
                                return (
                                    <>
                                        <img src={e.ImageUrl} alt="" srcset="" style={{ height: '150px', overflow: 'hidden' }} onClick={()=>{navigate("/Dis",{state:{data:e}})}} />
                                    </>
                                )
                            })}
                        </div>
                        <div className='col-6' style={{ height: '150px', overflowX: 'hidden' }}>
                            {Data2 && Data2.slice(10, 11).map((e) => {
                                return (
                                    <>
                                        <img src={e.ImageUrl} alt="" srcset="" style={{ height: '150px' }} onClick={()=>{navigate("/Dis",{state:{data:e}})}} />
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

   </>
  )
}

export default Off