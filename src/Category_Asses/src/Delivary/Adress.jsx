import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { json, useLocation, useNavigate } from 'react-router-dom'

const Adress = ({ Display }) => {


  const [DisAdd, setDisAdd] = useState(false)
  const [Dislist, setDisList] = useState(true)
  const [DisButton, setDisButton] = useState(true)
  const [Patch, SetPatch] = useState(false)
  let Arr = []
  const Location = useLocation()
  const Data = Location.state.Product
  const navigate = useNavigate()

  const [List, setList] = useState([])
  const Full = useRef()
  const Mn = useRef()
  const Pin = useRef()
  const Sta = useRef()
  const Ci = useRef()
  const Ho = useRef()
  const Ro = useRef()
  const [MPop,SetMPop]=useState(false)
  const HandleSubmit = () => {
    if(String(Mn.current.value).length<10 | String(Mn.current.value).length>10){
      SetMPop(true)
          return
    }
    const Address = {
      "Name": Full.current.value,
      "Number": Mn.current.value,
      "Pin": Pin.current.value,
      "State": Sta.current.value,
      "City": Ci.current.value,
      "House": Ho.current.value,
      "Road": Ro.current.value
    };
    const Data = {
      "Custamer_Name":Number(localStorage.getItem('id')),
      "Adrss_List": JSON.stringify(Address)
    }

    if (Patch) {
      axios.patch("http://127.0.0.1:8000/AdressListDetails/",Data).then((d) => {
       const AddList= d.data.Adrss_List.split("@")
       localStorage.setItem("Ind",AddList.length-1)
       
        
        Display()
      }).catch((e) => {

      })
    }
    else {
      axios.post("http://127.0.0.1:8000/AdressListDetails/", Data).then((d) => {
        Display()
      }).catch((e) => {

      })
    }
  }

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/AdressListDetails/").then((d)=>{        
    const Filter=d.data.filter((d)=>{
                    return d.Custamer_Name===Number(localStorage.getItem('id'))
         })
     if(Filter.length==0){
           setDisAdd(true)
           setDisButton(false)
           SetPatch(false)

     }else{
        SetPatch(true)
        setDisList(true) 
        setDisButton(true)

                const Obj=Filter[0]
                const Arr2=Obj.Adrss_List.split("@")
                
                const Convesion =Arr2.map((e)=>{
                    return JSON.parse(e)
                })
             
                 setList(Convesion)
     }

    }).catch((e)=>{
       
    })    
  }, []);
  const RemoveAdress=(Index)=>{
   const Filter=List.filter((e,ind)=>{
    return Index!=ind
   })
   let Address=''
  let Filter2= Filter.map((e)=>{
       return JSON.stringify(e)
   })
     const Data={
      "Custamer_Name":Number(localStorage.getItem('id')),
      "Adrss_List":Filter2.join('@')
     }
  
    if(Filter2.length==0){
       axios.delete("http://127.0.0.1:8000/RemoveAdress/",{data:Data}).then((d)=>{
          window.location.reload()
       }).catch((e)=>{
         alert("Error")
       })
    }else{
      axios.patch("http://127.0.0.1:8000/RemoveAdress/",Data).then((d)=>{
        const ListUrls=d.data.Adrss_List.split('@')
        const Modify=ListUrls.map(((e)=>{
            return JSON.parse(e)
        }))
        setList(Modify)
     }).catch((e)=>{
      console.log('Error')
     })
    }
  }

  return (

    <>
      {Dislist && List && List.map((Add,ind) => {
        return (
          <>
            <div className='mt-2  mr-1 ' style={{ textWrap: 'wrap', overflowX: 'hidden' }}>
              <span style={{ fontWeight: 'bold' }} className='text-primary'>{Add.Name}</span><br></br>
              <span style={{ fontWeight: 'bold' }} className='text-dark'>{Add.House}<br></br>{Add.Road}<br></br>{Add.State}{Add.City},<br></br>Pin:-{Add.Pin}</span><br></br>
            </div>
            {<>
              <button className='btn-info' onClick={()=>{
               localStorage.setItem('Ind',ind)
               Display()
               
            }} >Select<i class="fa-solid fa-check ml-2 text-dark"></i></button>
             <button className='btn-danger ml-2 text-white' onClick={()=>{
              RemoveAdress(ind)
               
            }} >Remove<i class="fa-regular fa-circle-xmark ml-2"></i></button>
            </>}

          </>
        )
      })}
      <br></br>
      {DisButton && <button className='mt-2' onClick={() => {
        setDisAdd(true)
        setDisList(false)
        setDisButton(false)
      }}>Addnew Adress</button>}

      {DisAdd && <div className='container-fluid' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', overflowX: 'hidden' }}>
        <span className='mt-3 text-warning'> <i className="fa-solid fa-user text-danger mr-2 rounded-circle"></i>Give Adress For Delivary Prodict</span>
        <form onSubmit={(e) => {
          e.preventDefault()
          HandleSubmit()
        }} className='form-group shadow mt-5' style={{ background: '#1C0406', borderRadius: '50px', maxWidth: '400px', width: '90%' }}  >

          <div className='mt-3 mx-3'>
            <label htmlFor="fn" className='form-label text-white'>Full Name<span style={{ color: 'red' }}>*</span></label>
            <input type="text" className='form-control' placeholder='Full Name(Required)*' ref={Full} required />
          </div>

          <div className='mt-3 mx-3'>
            <label htmlFor="mn" className='form-label text-white'>Enter Your Mobile No. <span style={{ color: 'red' }}>*</span></label>
            <input type="number" className='form-control' placeholder='Enter Your mobile Number' ref={Mn} required />
          </div>

          <div className='mt-3 mx-3'>
            <label htmlFor="ln" className='form-label text-white'>PinCode<span style={{ color: 'red' }}>*</span></label>
            <input type="number" placeholder='Enter Pincode' ref={Pin} required />
          </div>


          <div className='mt-3 mx-3 d-flex flex-row'>
            <input type="text" className='form-control mr-3' placeholder='State (Requred)*' ref={Sta} required />
            <input type="text" className='form-control' placeholder='City (Required)*' ref={Ci} required />

          </div>

          <div className='mt-3 mx-3'>
            <input type="text" className='form-control  mt-2' placeholder='Houde No,Buildning Name (Required)*' ref={Ho} required />
            <input type="text" className='form-control mt-3' placeholder='Road Name,Area,COlony (Required)*' ref={Ro} required />
          </div>

          <div className='text-center mt-2'>
            <input type="submit" value="Save Adress" className='btn btn-primary mb-2 mt-2 col-9 bg-danger' />
          </div>
        </form>
      </div>}
      {MPop&&<>
        <div>
        <div className='col-12 mb-3 d-flex flex-row justify-content-end' style={{position:'absolute',top:'50%'}}>
                         <div className='  col-11 col-sm-10 col-md-3 bg-primary p-2' style={{borderRadius:'20px'}}>
                         <div className='col-12 d-flex flex-row justify-content-end '>
                                <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={()=>{
                                    SetMPop(false)  
        
                                }} style={{fontSize:'25px',borderRadius:'20px'}}></i>
 
                            </div>
                              <span className='text-white'>Please Enter 10 digits for your number</span>    
                         </div>
                </div>
        </div>
      </>}
    </>
  )
}

export default Adress