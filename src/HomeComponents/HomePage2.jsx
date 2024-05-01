import React, { useEffect, useRef, useState } from 'react'
import Images from './Images'
import Products from './Products'
import Product2 from './Product2'

import Carosels from './Carosels'
import Suggest from './Suggest'
import axios from 'axios'
import { Shop_by  as Shop } from '../Data'
import ArrivalItems from './ArrivalItems'
import { useNavigate } from 'react-router-dom'
import HomeKI from './HomeKI'
import MinDis from './MinDis'


const HomePage2 = ({HandleRemove}) => {
  const [Data2, setData2] = useState(null)
  const navigate=useNavigate()
  const [AddCart, SetAdCard] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0);
    const [step, setStep] = useState(0);
    const containerRef = useRef(null);
    const columnRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const column = columnRef.current;
    if (!container || !column) return;

    const containerWidth = container.offsetWidth;
    const colWidth = column.offsetWidth;

    setStep(colWidth);
}, [Shop]);
  const handleScroll = (direction) => {
    const container = containerRef.current;
    if (!container) return;

    if (direction === 'right') {
        if (scrollPosition < Shop.length - 1) {
            container.scrollTo({
                left: container.scrollLeft + step+60,
                behavior: 'smooth',
            });
            setScrollPosition(scrollPosition + 1);
        }
    } else if (direction === 'left') {
        if (scrollPosition > 0) {
            container.scrollTo({
                left: container.scrollLeft - step-60,
                behavior: 'smooth',
            });
            setScrollPosition(scrollPosition - 1);
        }
    }
};

  
  
  return (
    <>
    <div style={{ overflow: 'hidden',marginTop:'10px',background: '#F5F7FA'}}  >
        <Carosels/>
      </div>
      <div onMouseEnter={HandleRemove} className='mt-2 d-flex flex-column  ' style={{position:'relative',height: '250px', position: 'relative',overflow:'hidden' }} >
      <div className='d-flex flex-row justify-content-between ml-2'>
                  <h6>Shop By Category</h6>
                   <div className='mr-4'>
                   <span className='btn  mr-3' onClick={() => handleScroll('left')} style={{background:'lightgray '}}   ><i class="fa-solid fa-angles-left"></i></span>
                        <span className='btn btn- ml-2' onClick={() => handleScroll('right')} style={{background:'lightgray '}} ><i class="fa-solid fa-angles-right"></i></span>
                  </div>
        </div>
                <div className='card-footer d-flex flex-row justify-content-between' style={{ height: '130px',background:'#F7F7F7' }}>
                  
                </div>
                <div id='scroll-container' ref={containerRef} className='d-flex flex-row col-12' style={{position:'absolute', top: '60px', overflowX: 'auto',scrollbarWidth:'none' }}>
                    {Shop && Shop.map((e) => {
                        return (
                            <>
                            <div  style={{height:'150px',width:'50px',background:'red',visibility:'hidden'}}>
                            ffrtsdfgdsfg
                            </div>
                            <div ref={columnRef}   style={{ height: '150px',border:'3px solid #F7F7F7',overflow:'hidden',borderRadius:'30%'  }} className='  col-7 col-md-4 col-lg-2  text-center bg-white'>
                                    <div onClick={()=>{ navigate("/Product",{state:{Cat:e.Name.slice(0,5)}})}}  style={{height:'120px',borderRadius:'30%',cursor:'pointer'}} className=' p-3   text-center'>
                                           <img className=' ' src={e.Img}  alt="" srcset="" style={{ height: '100px',borderRadius:'30%',width:'110px' }} /><br></br>
                                          <small><small style={{fontWeight:'bolder'}}>{e.Name}</small></small>
                                    
                                     </div>
                            </div> 
                                
                            </>
                        )
                    })} 
                </div>



            </div>
      <div className=' mt-3 mb-5 p-2  ml-2 mr-2 ' style={{background:'white',overflow:'hidden'}}>
        <Products />
      </div>
      <div className=' mt-3 mb-5 p-2  ml-2 mr-2 ' style={{background:'white',overflow:'hidden'}}>
        <Product2 />
      </div>
      <div className=' mt-3 mb-5 p-2  ml-2 mr-2 ' style={{background:'white',overflow:'hidden'}}>
        <HomeKI />
      </div>
      <div className='mt-2' style={{ overflow: 'hidden' }} >
                <ArrivalItems />
       </div>
      <div className=' mt-3 mb-5 p-2  ml-2 mr-2  ' style={{background:'white',overflow:'hidden'}}>
        <h6 className='p-2' style={{borderBottom:'2px solid lightgray',width:'100%',display:'inline-block'}}>Suggested for You</h6>
          <Suggest/>
      </div>
      <div className=' mt-3 mb-5 p-2  ml-2 mr-2  ' style={{background:'white',overflow:'hidden'}}>
          <MinDis/>
      </div>
      {AddCart && <>
                <div className='col-12 mb-3 d-flex flex-row justify-content-end' style={{ position: 'absolute', top: '60vh' }}>
                    <div className='  col-10 col-sm-7 col-md-3 bg-danger p-2' style={{ borderRadius: '10px' }}>
                        <div className='col-12 d-flex flex-row justify-content-end '>
                            <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                SetAdCard(false)

                            }} style={{ fontSize: '25px', borderRadius: '20px' }}></i>

                        </div>
                        <span className='text-white'>Added Successlly</span>
                    </div>
                </div>
            </>}
    </>
  )
}

export default HomePage2

// const AddCartFunc2 = () => {
//   AddCartFunc()
//   }
// useEffect(() => {
//     axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {
      
          


//     }).catch((e) => {
//         alert('Please Try AGian Later Somthing Eroor')
//     })

// }, [])