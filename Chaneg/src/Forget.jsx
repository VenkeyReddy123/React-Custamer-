import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Forget = () => {
    const navigate = useNavigate()
    const [email, setemail] = useState(true)
    const [Otp, setOtp] = useState(false)
    const [Pass, setPass] = useState(false)
    const [em, setem] = useState('')
    const [otp, setotp] = useState(0)
    const [npw, setnpw] = useState('')
    const [napw, setnapw] = useState('')
    const HandleSendOtp = () => {
        axios.post('http://127.0.0.1:8000/LoginOtpDetails/', { Email: em })
            .then(response => {
                localStorage.setItem('otp',Number(response.data.Message))
                alert('OTP sent successfully!'); // You might want to replace this with a UI notification
                setemail(!email)
                setOtp(!otp)
                
            })
            .catch(error => {
                 // You might want to replace this with a UI notification
                 alert('error')
            });

    };
    const HandleRecivedOtp = () => {
        if(otp==Number(localStorage.getItem('otp'))){
            setOtp(!Otp)
            setPass(!Pass)
        }
        else{
            alert('InValid Otp')
        }
        
    }
    const HandleChangePassword = () => {
        if(npw===napw){
            const Data={
                "Email":String(localStorage.getItem('em')),
                "Password":npw
            }
            axios.patch("http://127.0.0.1:8000/LoginPasswordChange/",Data).then((d)=>{
                alert('Chnaged Success Fully')
                navigate("/")
            }).catch((e)=>{
                alert('Please Try Again')
            })
        }
        else{
            alert('Passwords Are Not MAtched')
        }
       
    }
    return (
        <>
            <div className='container-fluid' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundImage: `url('https://i.pinimg.com/736x/80/ff/69/80ff69f319daa945a850b4efe621c19a.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '100vh' }}>
                {email &&

                    <form onSubmit={(e) => {
                        e.preventDefault()
                        HandleSendOtp()


                    }} className='form-group text-center shadow-lg' style={{ background: 'light', borderRadius: '50px', maxWidth: '400px', width: '90%' }}>

                        <div className='mt-4 mx-3'>
                            <label htmlFor="ml" className='form-label text-warning'>Enter Your Email  <span style={{ color: 'red' }}>*</span></label>
                            <input type="text" className='form-control' onChange={(e) => { setem(e.target.value) }} placeholder='Enter Your Email' name='ml' id='ml' required />
                        </div>
                        <span className='text-danger'>You Can Recive Otp Registed Email </span>


                        <div className='text-center mb-2'>
                            <input type="submit" value="Send Otp" className='btn btn-primary mt-2' />
                        </div>
                    </form>
                }


                Otp Sending

                {Otp && <form onSubmit={(e) => {
                    e.preventDefault()
                    HandleRecivedOtp()


                }} className='form-group text-center shadow-lg' style={{ background: '#004646', borderRadius: '50px', maxWidth: '400px', width: '90%' }}>

                    <div className='mt-4 mx-3'>
                        <label htmlFor="ml" className='form-label text-warning'>Enter OTP<span style={{ color: 'red' }}>*</span></label>
                        <input type="number" className='form-control' onChange={(e) => { setotp(e.target.value) }} placeholder='Enter Your Otp' name='ml' id='ml' required />
                    </div>
                    <span className='text-danger'>You Can Recive Otp Registed Email </span>


                    <div className='text-center mb-2'>
                        <input type="submit" value="Submit Otp" className='btn btn-primary mt-2' />
                    </div>
                </form>}






                {/* Password */}
                {Pass && <form onSubmit={(e) => {
                    e.preventDefault()
                    HandleChangePassword()


                }} className='form-group shadow-lg mt-2' style={{ background: '#004646', borderRadius: '50px', maxWidth: '400px', width: '90%' }}>

                    <div className='mt-4 mx-3'>
                        <label htmlFor="ml" className='form-label text-warning'>Enter New Password  <span style={{ color: 'red' }}>*</span></label>
                        <input type="password" onChange={(e) => { setnpw(e.target.value) }} className='form-control' placeholder='Enter New Password' name='ml' id='ml' required />
                    </div>

                    <div className='mt-4 mx-3'>
                        <label className='form-label text-warning' htmlFor="pw">Enter Again Password <span style={{ color: 'red' }}>*</span></label>
                        <input type="password" className='form-control' onChange={(e) => { setnapw(e.target.value) }} name="pw" required placeholder='Enter AGain Password' />
                    </div>

                    <div className='text-center mb-2'>
                        <input type="submit" value="ChangePassword" className='btn btn-primary mt-4' />
                    </div>
                </form>}


            </div>
        </>
    )
}

export default Forget