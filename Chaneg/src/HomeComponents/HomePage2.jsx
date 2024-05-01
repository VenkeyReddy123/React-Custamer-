import React, { useEffect, useState } from 'react'
import Images from './Images'
import Products from './Products'
import Product2 from './Product2'

import Carosels from './Carosels'
import Suggest from './Suggest'
import axios from 'axios'
// import {Shop_by as Shop} from './Shop_by2'
import { Shop_by  as Shop } from '../Data'
import ArrivalItems from './ArrivalItems'
import { useNavigate } from 'react-router-dom'


const HomePage2 = () => {
  const [Data2, setData2] = useState(null)
  const navigate=useNavigate()
  useEffect(() => {
      axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {
          // setData2(Shop)
          console.log(Shop)


      }).catch((e) => {
          alert('Please Try AGian Later Somthing Eroor')
      })

  }, [])
  return (
    <>
    <div style={{ overflow: 'hidden',marginTop:'10px',background: '#F5F7FA'}}  >
        <Carosels/>
      </div>
      <div className='mt-2 d-flex flex-column  ' style={{position:'relative',height: '250px', position: 'relative',overflow:'hidden' }} >
                <div className='card-footer' style={{ height: '130px',background:'#F7F7F7' }}>
                <h6>Shop By Category</h6>

                </div>
                <div className='d-flex flex-row col-12' style={{position:'absolute', top: '60px', overflowX: 'auto',scrollbarWidth:'none' }}>
                    {Shop && Shop.map((e) => {
                        return (
                            <>
                               <div style={{ height: '150px',border:'3px solid #F7F7F7',overflow:'hidden',borderRadius:'30%'  }} className='  col-7 col-md-4 col-lg-2  text-center bg-white ml-5'>
                               <div onClick={()=>{
                                navigate("/Product",{state:{Cat:e.Name.slice(0,5)}})
                               }}  style={{height:'120px',borderRadius:'30%',cursor:'pointer'}} className=' p-3   text-center'>
                                    <img className=' ' src={e.Img}  alt="" srcset="" style={{ height: '100px',borderRadius:'30%',width:'110px' }} /><br></br>
                                    {/* <span className='mt-2'>{e.Name}</span> */}
                                    <small><small style={{fontWeight:'bolder'}}>{e.Name}</small></small>
                                    
                                </div>
                               </div> 
                                
                            </>
                        )
                    })} 
                </div>



            </div>
      <div className='vw-100 mt-3 mb-5' style={{background: '#F5F7FA',overflow:'hidden'}}>
        <Products />
      </div>
      <div className='mt-2' style={{ overflow: 'hidden' }} >
                <ArrivalItems />
            </div>
      <div className='vw-100 mt-3 mb-5' style={{overflow:'hidden'}}>
        <h3>Suggested for You</h3>
        <Suggest/>
      </div>
      
   

       
   

    </>
  )
}

export default HomePage2