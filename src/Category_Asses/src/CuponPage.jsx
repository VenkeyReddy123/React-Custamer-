import axios from 'axios'
import React, { useRef, useState } from 'react'

const CuponPage = ({ UpdateOff }) => {
  const [code, setCode] = useState(null)
  const [cupon, SetCupon] = useState()

  const HandleSubmit = (e) => {

    e.preventDefault()
    const Data={
      "Code_Name":code,
      "Custamer_Name":Number(localStorage.getItem('id'))
    }
    axios.post("http://127.0.0.1:8000/Check2CuponDetails/",Data).then((d)=>{
           axios.get("http://127.0.0.1:8000/CuponCodeDetails/",{data:Data}).then((d) => {
                  const FilterData = d.data.filter((e) => {
                             return e.Code_Name == code
                       })
                  const Obj=FilterData[0]
                  const Today=new Date().toLocaleDateString()
                  const Expire=new Date(Obj.ExpireDate).toLocaleDateString()
                    if(Today<=Expire){
                         UpdateOff(FilterData,'Succ')
                    }
                    else{
                        UpdateOff("ggg",'Expi')

                    }

         })
      
    }).catch((e)=>{
        UpdateOff('SSS','Error')
    })
  }
  const HandleCupon = (Data) => {
    const Obj = Data[0];
    if( Obj.Discount_Type.toLowerCase().includes("Amount")){  
         UpdateOff("Amo",Obj.Code_Off,Obj.id)    
    }
    else{
         UpdateOff("Dis",Obj.Code_Off,Obj.id)
    }

    
  };

  return (
    <>
      <div>
        <form onSubmit={HandleSubmit}>
          <input type="text" placeholder='Enter CouponCode' className='col-9 mt-4' onChange={(e) => { setCode(e.target.value) }} />
          <input type='submit' value={"Check"} className=' ml-2 btn btn-primary' />
        </form>
      </div>
    </>
  )
}

export default CuponPage