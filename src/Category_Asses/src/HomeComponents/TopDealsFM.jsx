import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const TopDealsFM = () => {
  const [Data2, setData2] = useState()
  const navigate=useNavigate()
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {
      setData2(d.data)
     
    }).catch((e) => {
      // alert('Please Try AGian Later Somthing Eroor')
    })

  }, [])
  return (
    <>
    <div style={{overflowX:'hidden',}} className='col-11'>
         <h5 className='text-wrap card-body'>Top deals to discover in Women & Mens Tops and Sharee</h5>
    </div>
      <div className='row ' style={{overflow:'hidden',background:'#51473E'}}>
  {Data2 && Data2.slice(6, 10).map((e, index) => {
    return (
      <div className='col-6 col-md-3 mb-3 text-center' onClick={() => { navigate('/Dis', { state: { data: e } }) }} style={{cursor:'pointer'}} key={index}>
        <div className='card-body'>
          <img src={e.ImageUrl} alt="" style={{ height: '150px' }} className="img-fluid" onClick={()=>{navigate("/Dis",{state:{data:e}})}}  />
        </div>
      </div>
    )
  })}
</div>

    </>
  )
}
