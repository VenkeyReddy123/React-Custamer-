import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserReg = () => {
  const navigate = useNavigate()
  const Uname = useRef(null)
  const Fname = useRef(null)
  const Lname = useRef(null)
  const Email = useRef(null)
  const MNo = useRef(null)
  const Pass = useRef(null)
  const RPass = useRef(null)
  const IRef = useRef(null)
  const [UPop, SetUPop] = useState(false)
  const [PPop, setPPop] = useState(false)
  const[MPop,SetMPop]=useState(false)

  async function HanleSubmit() {
    console.log('bye')
    const uname = Uname.current.value;
    const fname = Fname.current.value;
    const lname = Lname.current.value;
    const email = Email.current.value;
    const pass = Pass.current.value;
    const rpass = RPass.current.value;
    const image = IRef.current.files[0];
    if(String(MNo.current.value).length!=10){
         SetMPop(true)
         return
    }
    if (pass === rpass) {
      const Data = {
        'username': uname,
        'firstname': fname,
        'lastname': lname,
        'email': email,
        'password': pass
      };


      await axios.post("http://127.0.0.1:8000/CheckUserName/", Data).then(async (d) => {
        SetUPop(true)
      }).catch(async (e) => {
        await axios.post("http://127.0.0.1:8000/UserDetails/", Data)
             .then( async response => {
                      const Data2 = {
              'username': response.data.id,
              'Profile_Pic': image
            };
           await axios.post("http://127.0.0.1:8000/ProfileDetails/", Data2, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }).then(d => {

              const ImgData = {
                "pk": d.data.id,
                "Profile_Pic": d.data.Profile_Pic
              }

              axios.patch("http://127.0.0.1:8000/ProfileDetails/", ImgData).then((d) => {
                navigate("/")
              }).catch((e) => {
                alert("Please Try Again Later P2")

              })


            })
              .catch(error => {
                alert('ERRTh')
                // alert('Thanku For Register')
                // 


              })

          })
          .catch(error => {

            alert('Please try Agin Later u')
          });


      })


    } else {
        setPPop(true)
    }
  }


  return (
    <>
      <div className='container-fluid' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
        <h1 className='mt-3 text-warning'> <i className="fa-solid fa-user text-danger mr-2 rounded-circle"></i>User Registration</h1>
        <form method="POST" onSubmit={(e) => {
          e.preventDefault()
          HanleSubmit()
          console.log('hii')

        }} className='form-group shadow mt-5' style={{ background: '#EDE7C7', borderRadius: '50px', maxWidth: '400px', width: '90%' }} enctype="multipart/form-data">

          <div className='mt-3 mx-3'>
            <label htmlFor="fn" className='form-label'>UserName <span style={{ color: 'red' }}>*</span></label>
            <input type="text" className='form-control' placeholder='Enter Your UserName' id='fn' name='fn' ref={Uname} required />
          </div>

          <div className='mt-3 mx-3'>
            <label htmlFor="fn" className='form-label'>First Name <span style={{ color: 'red' }}>*</span></label>
            <input type="text" className='form-control' placeholder='Enter Your First Name' id='fn' name='fn' ref={Fname} required />
          </div>

          <div className='mt-3 mx-3'>
            <label htmlFor="ln" className='form-label'>Last Name <span style={{ color: 'red' }}>*</span></label>
            <input type="text" className='form-control' placeholder='Enter Your Last Name' id='ln' name='ln' ref={Lname} required />
          </div>

          <div className='mt-3 mx-3'>
            <label htmlFor="ml" className='form-label'>Enter Your Mail <span style={{ color: 'red' }}>*</span></label>
            <input type="email" className='form-control' placeholder='Enter Your mail' name='ml' id='ml' ref={Email} required />
          </div>

          <div className='mt-3 mx-3'>
            <label htmlFor="mn" className='form-label'>Enter Your Mobile No. <span style={{ color: 'red' }}>*</span></label>
            <input type="number" className='form-control' placeholder='Enter Your mobile Number' name="mn" id="mn" ref={MNo} required />
          </div>

          <div className='mt-3 mx-3'>
            <label htmlFor="pw" className='form-label'>Enter Your Password <span style={{ color: 'red' }}>*</span></label>
            <input type="password" className='form-control' placeholder='Enter password' name="pw" id="pw" ref={Pass} required />
          </div>

          <div className='mt-3 mx-3'>
            <label htmlFor="rpw" className='form-label'>Enter Again Password <span style={{ color: 'red' }}>*</span></label>
            <input type="password" className='form-control' placeholder='Enter Regain Password' name="rpw" id="rpw" ref={RPass} required />
          </div>

          <div className='mt-3 mx-3'>
            <label htmlFor="image" className='form-label'>Select Image <span style={{ color: 'red' }}>*</span></label>
            <input type="file" className='form-control-file' ref={IRef} required />
          </div>

          <div className='text-center mt-4'>
            <input type="submit" value="Register" className='btn btn-primary' />
          </div>
        </form>
      </div>
      {UPop && <>
        <div className='col-12 mb-3 d-flex flex-row justify-content-end' style={{ position: 'absolute', top: '50vh' }}>
          <div className='  col-10 col-sm-7 col-md-3 bg-primary p-2' style={{ borderRadius: '20px' }}>
            <div className='col-12 d-flex flex-row justify-content-end '>
              <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                SetUPop(false)

              }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

            </div>
            <span className='text-white'>This UserName Already Registerd Please Enter Another</span>
          </div>
        </div>
      </>}
      {PPop && <>
        <div className='col-12 mb-3 d-flex flex-row justify-content-end' style={{ position: 'absolute', top: '50vh', borderRadius: '30px' }}>
          <div className='  col-10 col-sm-7 col-md-3 bg-danger p-2' style={{ borderRadius: '20px' }}>
            <div className='col-12 d-flex flex-row justify-content-end '>
              <i class="fa-regular fa-circle-xmark text-white bg-primary" onClick={() => {
                setPPop(false)

              }} style={{ fontSize: '20px', borderRadius: '20px' }}></i>

            </div>
            <span className='text-white'>please enter  password and RePassword Same</span>
          </div>
        </div>
      </>}
      {MPop&&<>
                <div className='col-12 mb-3 d-flex flex-row justify-content-end' style={{position:'absolute',top:'50vh'}}>
                         <div className='  col-8 col-sm-6 col-md-3 bg-primary p-2'>
                         <div className='col-12 d-flex flex-row justify-content-end '>
                                <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={()=>{
                                    SetMPop(false)  
        
                                }} style={{fontSize:'25px',borderRadius:'20px'}}></i>
 
                            </div>
                              <span className='text-white'>Please Enter 10 digits for your number</span>    
                         </div>
                </div>
                </>}

    </>
  )
}

export default UserReg