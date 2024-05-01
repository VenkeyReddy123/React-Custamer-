import React, { useEffect, useState } from 'react'
import Ho from '../Data/Products/home.jpg'
import axios from 'axios'

const Profile = ({HandleOpenprofile}) => {
  const [Data,SetData]=useState([])
  const [EP,SetEP]=useState(false)
  const [EI,SetEI]=useState(false)
  const[N,SetN]=useState('')
  const[E,SetE]=useState('')
  const[M,SetM]=useState('')
  const[I,SetI]=useState('')
  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/LoginDetails/").then((d)=>{
      const filter=d.data.filter((e)=>{
               return e.id==Number(localStorage.getItem('id'))
      })
      SetData(filter)
    
    })
  },[])
  const HandleEdit=(e)=>{
        SetN(e.Custamer_Name)
        SetE(e.Email)
        SetM(e.Mobile_Number)
        SetEP(true)
  }
  const HandleSave=()=>{
    const Data={
      "pk":Number(localStorage.getItem('id')),
      "Custamer_Name":N ,
      "Email":E,
       "Mobile_Number":M 
    }
    axios.patch("http://127.0.0.1:8000/LoginDetails/",Data).then((d)=>{
      axios.get("http://127.0.0.1:8000/LoginDetails/").then((d)=>{
        const filter=d.data.filter((e)=>{
                 return e.id==Number(localStorage.getItem('id'))
        })
        SetData(filter)
        const entry=filter[0]
        localStorage.setItem('CustamerName', entry.Custamer_Name)
        localStorage.setItem('email', entry.Email);
        localStorage.setItem('mobile_number', entry.Mobile_Number)
        SetEP(false)
      })
    }).catch((e)=>{
       
    })
    
  }
  const HandleEditIamge=()=>{
   const Data={
    "pk":Number(localStorage.getItem('id')),
    "Profile_Pic":I
   }
    axios.patch("http://127.0.0.1:8000/LoginImageDetails/",Data,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((d)=>{
      console.log(d.data)
      const Data={
        "pk":Number(localStorage.getItem('id')),
        "Profile_Pic":d.data.Profile_Pic
      }
      axios.patch("http://127.0.0.1:8000/LoginImageDetails2/",Data).then((d)=>{
        axios.get("http://127.0.0.1:8000/LoginDetails/").then((d)=>{
        const filter=d.data.filter((e)=>{
                 return e.id==Number(localStorage.getItem('id'))
        })
        localStorage.setItem()
        SetData(filter)
        SetEI(false)
      })
             
      }).catch((e)=>{

      })
    }).catch((e)=>{

    })
  }
  return (
    <>
          <div className='col-12 card'>
          <i class="fa-regular fa-circle-xmark ml-auto mt-3 bg-danger text-light" onClick={()=>{HandleOpenprofile()}} style={{fontSize:'25px',borderRadius:'20px'}}></i>
            {Data&&Data.map((e)=>{
              let all=null
              if(!e.P_Url){
                 all=true
              }
               return(
                <>
                <span className='ml-auto mr-auto mb-2 h6 text-success'>Profile</span>
               <div  className=' col-10 ml-auto mr-auto   mt-2'style={{height:'200px',position:'relative',borderRadius:'50%'}}>
                 {(EI||all  )&&<><input type="file" name="" id="" onChange={(e)=>{
                     SetI(e.target.files[0])
                 }} />
                  <button className='btn btn-success mt-2' onClick={()=>{HandleEditIamge()}}>Save</button>
                 </>}
                 {!EI && e.P_Url&&<><img accept='image/*' className='card p-1'  src="" alt="" srcset={e.P_Url} style={{width:'100%',height:'100%',borderRadius:'50%'}} />
                 <i onClick={()=>{SetEI(true)}} class="fa-regular fa-pen-to-square text-primary" style={{position:'absolute',bottom:'40px',right:'50px',cursor:'pointer',fontSize:'25px'}}></i>
                 </>}

                
               </div>
             
               <div className='col-12 mt-2 '>
                     <div className='d-flex flex-column mt-2'>
                           <label className='h6' htmlFor="">Name</label>
                           {EP?<><input type="text" value={N} onChange={(e1)=>{
                                SetN(e1.target.value)
                           }} className='form-control' /></>:<><span>{e.Custamer_Name}</span></>}
                     </div>
                     <div className='d-flex flex-column mt-2'>
                           <label className='h6' htmlFor="">Email</label>
                           {EP?<><input type="email" name="" id="" value={E} onChange={(e1)=>{
                                SetE(e1.target.value)
                           }}  className='form-control' /></>:<><span>{e.Email}</span></>}
                     </div>
                     <div className='d-flex flex-column mt-2'>
                           <label className='h6' htmlFor="" onChange={(e1)=>{
                                SetM(e1.target.value)
                           }} >Mobile_Number</label>
                           {EP?<><input type="number" className='form-control' name="" id="" value={M} /></>:<><span>{e.Mobile_Number}</span></>}
                     </div>
                     <div className='mb-2 mt-2'>
                      {EP?<> <button className='btn btn-primary' onClick={HandleSave}>Save</button></>:<> <button className='btn btn-primary' onClick={()=>{HandleEdit(e)}}>Edit Profile</button></>}
                     </div>
               </div>
                </>
               )
            })}
          </div>
    </>
  )
}

export default Profile