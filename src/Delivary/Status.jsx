import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ResizedImage from '../HomeComponents/ResizedImage'
import axios from 'axios'
import Navbar from '../HomeComponents/Navbar';
import DSidebar from '../DSidebar'
import { Catigories } from '../Data.jsx'
import Profile from '../Accounts/Profile.jsx';
import Footer from '../Footer.jsx';
class TruncateWords extends React.Component {
    truncateWords = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        const truncated = text.substr(0, text.lastIndexOf(' ', maxLength));
        return truncated + '...';
    };

    render() {
        const { text, maxLength } = this.props;
        const truncatedText = this.truncateWords(text, maxLength);

        return <span>{truncatedText}</span>;
    }
}

const Status = () => {
    const Location = useLocation()
    const navigate = useNavigate()
    const [Data,setData] = useState(Location.state.Product)
    const Add = JSON.parse(Location.state.Product.Adress)
    const ImageUrl = Location.state.Product.ImageUrl.ImageUrl
    const OrderId = Location.state.Product.Order_Id.Order_Id
    const Product = Location.state.Product.Order_Id.Product_Name
   
    const [OrderDetals,setOrderDetails] =useState([])
    const [Cancel, SetCancel] = useState(false)
    const[OProfile,SetOProfile]=useState(false)
    const HandleOpenprofile=()=>{
        SetOProfile(false)
    }
    useEffect(() => {

        axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {
            setdata(d.data)
        }).catch((e) => {

        })
        axios.get("http://127.0.0.1:8000/RatingDetails/", Data).then((d) => {
            const Rating=d.data
             if(d.data){
                axios.get("http://127.0.0.1:8000/LCODetails/").then((d) => {
                    const FilterData = d.data.filter((e) => {
                        return e.Order_Id.Order_Id === OrderId
                    })
                        FilterData.map((e)=>{
                               
                             Rating.map((e1)=>{
                                
                                 if(e1.Product_Name===e.Order_Id.Product_Name.id && e.Custamer_Name.Email==e1.Custamer_Name.Email){
                                           e.Rating=true 
                                 }
                             })
                            return e
                        })
                  
                  
                    setOrderDetails(FilterData[0].Order_Id)
                 
                }).catch((e) => {
                    alert('Please Try AGian Later Somthing Eroor')
                })
             }
        }).catch((e) => {
            console.log(e)
        })
        

    },[])
    const HandleCanced = () => {
        const Data = {
            "Order_Id": OrderId,
            "OrderCancel": "Yes",
            "CancelDate": new Date()
        }

        axios.patch("http://127.0.0.1:8000/CancelOrderDetails/",Data).then((d)=>{
            
            const Data={
                pk:Location.state.Product.Order_Id.Product_Name.id,
                Stack:Number(Location.state.Product.Quantity)+Number(Location.state.Product.Order_Id.Product_Name.Stack)
            }
            console.log(Data)

            axios.patch("http://127.0.0.1:8000/ProductDetails/",Data).then((d)=>{
            window.location.reload()
        
        })

        }).catch((e)=>{
            alert("error")
        })
    }
    const [OnClick, setOnClick] = useState(false);
    const Callback = () => {
        setOnClick(!OnClick)

    }
    const [DSide, setDSide] = useState(false)
    const DisplySidebar = () => {

        setDSide(!DSide)
    }
    const [data, setdata] = useState([])
    const [Sug, setSug] = useState([])
    const [DataList, SetDataLIst] = useState([])
    const [inval, setinval] = useState('')
    useEffect(() => {
        if (data.length > 0) {
            const List = []
            data.map((e) => {
                List.unshift(e.Product_Name.Product_Name)
            })
            SetDataLIst(List)

        }
    }, [data])
    useEffect(() => {

        if (inval.length >= 2) {

            const Filter = DataList.filter((e) => {
                return String(e).toLowerCase().includes(`${inval}`.toLowerCase());
            });



            const Filter2 = Filter.map((e) => {
                const val = e.toLowerCase()
                return val
            })
            setSug([...new Set(Filter2)]);
        } else {
            setSug([]);
        }
    }, [inval, DataList]);
    const HandleInputValue = (event) => {
        const Value = event.target.value
        if (Value.length > 0) {
            setinval(Value)

        } else {
            setinval('')
        }

    }
    const HandleNaviProduct = (val) => {
        const Filter = data.filter((pro) => {
            if (pro.Product_Name.Product_Name.toLowerCase().includes(String(val.toLowerCase()))) {
                return pro
            }
        })
        if (Filter.length > 0) {
            navigate('/Dis', { state: { data: Filter[0] } })
        }
    }

    
    return (
        <>
            <div className='col-12'>
            <div className='d-flex flex-row  p-2 card mt-1' style={{ backgroundColor: 'white' }}>
                <div className='col-md-3 col-lg-2 d-none d-md-block ml-auto'>
                        <div className='bg-primary p-2 web' style={{ borderRadius: '10px' }}>
                            <i class="fa-solid fa-bag-shopping mr-2 text-white ecom"></i><span className='ee'>E</span><span className='com'>commerce</span>
                        </div>
                    </div>
                    <div className='col-10 col-md-7 p-1 ml-auto' style={{ position: 'relative' }}>
                        <input onChange={HandleInputValue} value={inval} type="text" className='form-control web2' placeholder='search for Products Name' />
                    </div>
                    <div className='mr-2 p-2 d-flex flex-row  mt-auto mb-auto ml-auto ' onClick={()=>{SetOProfile(true)}} style={{cursor:'pointer'}}>
                        <i class="fa-regular fa-circle-user mr-2 mt-ua h5 d-none d-md-block "></i>  <small className='d-none d-md-block ' style={{ color: 'gray', fontWeight: 'bold' }}> Profile</small>
                    </div>
                    <div className=' col-2 p-1 d-block d-md-none  mt-auto mb-auto ml-auto'>
                        <i class="fa-solid fa-ellipsis-vertical"  style={{ fontSize: '25px' }}></i>
                    </div>

                </div>
            <nav style={{ background: '#1F4C94' }} class="navbar navbar-expand-lg navbar-light  mt-2">

                <Navbar Callback={Callback} DisplySidebar={DisplySidebar} />
            </nav>
                <div className='col-12 bg-white shadow-sm p-2 mt-2'>
                    <div className='d-none d-md-block'>
                        <span>Delivery Address</span><br></br>
                        <span className='text-primary'>Name:- {Add.Name}</span><br></br>
                        <span className='text-dark'>{Add.House}<br></br>{Add.Road}<br></br>{Add.State}{Add.City},Pin:-{Add.Pin}</span>

                    </div>
                    <div className='d-block d-md-none'>
                        <span>Order can traked By {Add.Number} </span><br></br>
                        <span>Traking lin Shared With This SMS</span>
                        <div className='card-footer bg-white d-flex flex-row justify-content-between'>
                            <span>Manage who can acess</span>
                            <i class="fa-solid fa-chevron-right"></i>
                        </div>
                    </div>
                </div>
                <div className='card bg-white shadow-sm col-12' style={{ overflow: 'hidden' }}>
                    <div className='d-none d-md-block col-12'>
                        <div className='col-12 d-flex flex-row'>
                            <div className='p-2' style={{ height: '160px', width: '120px', cursor: 'pointer' }}>
                                <img src={ImageUrl} onClick={() => {
                                    navigate("/Dis", { state: { data: OrderDetals } })
                                }} alt="" width={'100'} height={'95'} />
                                {OrderDetals.Delivary==='No'&&<><span className={`mt-2 ml-2 col-12 ${OrderDetals.OrderCancel == "No" ? "btn-danger btn" : "p-2"}`}>{OrderDetals.OrderCancel == "No" ? <span className='text-black' onClick={() => {
                                    SetCancel(true)
                                }}>Cancel</span> : "Canceled"}</span></>}
                            </div>
                            <small className='col-3'>
                                <small><TruncateWords text={Product.Product_Name} maxLength={50} /></small><br></br>
                                <small><i class="fa-solid fa-indian-rupee-sign"></i>{OrderDetals.Selling_Price}</small><br></br>

                            </small>
                            <small style={{ position: 'relative' }} className='d-flex flex-column '>
                                <div><span><i class="fa-solid fa-check text-white bg-success mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></span><span className=''>Order Conformed Date, {new Date(OrderDetals.Date).toDateString().slice(3, new Date(OrderDetals.Date).toDateString().length).slice(0, 7)}</span></div>
                                 {OrderDetals.OrderCancel=='No'?<>                                <div><span><i class="fa-solid fa-check text-white bg-success mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></span> <span className='mt-3' style={{ marginTop: '30px' }}>Shipped</span><br></br></div>
                                <div><span><i class="fa-solid fa-check text-white bg-success mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></span> <span className='mt-auto'>Out For Delivery</span><br></br></div>
                                <div><span><i class="fa-solid fa-check text-white bg-success mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></span> <span className=''>Delivare</span></div></>:<><div><span><i class="fa-solid fa-check text-white bg-danger mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></span> <span className=''>Order Canceled</span></div></>}
                            </small>
                        </div>
                    </div>
                    <div className=' mt-2 card  col-12 d-block d-md-none'>
                        <div className='card-body d-flex flex-row '>
                            <div className=' mt-2'>
                                <span><TruncateWords text={Product.Product_Name} maxLength={30} /></span><br></br>
                                <small><i class="fa-solid fa-indian-rupee-sign"></i>{OrderDetals.Selling_Price}</small>
                                
                            </div>
                            
                            <div className=' ml-3' style={{ height: '100px', width: '100px' }}>
                                <img onClick={()=>{
                                    navigate("/Dis", { state: { data: OrderDetals } })
                                }} className='ml-auto' src={ImageUrl} alt="" width={'100'} height={'100%'} />
                                <span className={`mt-2 ml-2 col-12 ${OrderDetals.OrderCancel == "No" ? "btn-danger btn" : "p-1"}`}>{OrderDetals.OrderCancel == "No" ? <span className='text-black' onClick={() => {
                                    SetCancel(true)
                                }}>Cancel</span> : "Canceled"}</span>
                            </div>
                        </div>
                        <div className='col-12 card-body d-flex flex-row' style={{ height: '' }}>
                            <div className='ml-2 ' style={{}}>
                                <div><span><i class="fa-solid fa-check text-white bg-success mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></span><span className=''>Order Conformed Date, {new Date(OrderDetals.Date).toDateString().slice(3, new Date(OrderDetals.Date).toDateString().length).slice(0, 7)}</span></div>
                                {OrderDetals.OrderCancel=='No'?<>                                <div><span><i class="fa-solid fa-check text-white bg-success mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></span> <span className='mt-3' style={{ marginTop: '30px' }}>Shipped</span><br></br></div>
                                <div><span><i class="fa-solid fa-check text-white bg-success mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></span> <span className='mt-auto'>Out For Delivery</span><br></br></div>
                                <div><span><i class="fa-solid fa-check text-white bg-success mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></span> <span className=''>Delivare</span></div></>:<><div><span><i class="fa-solid fa-check text-white bg-danger mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></span> <span className=''>Order Canceled</span></div></>}



                            </div>
                        </div>
                    </div>
                    <div className='d-block d-md-none card  mt-3 mb-2 p-2'>
                        <span>Delivery Address</span><br></br>
                        <span className='text-primary'>{Add.Name}</span><br></br>
                        <span className='text-dark'>{Add.House}<br></br>{Add.Road}<br></br>{Add.State}{Add.City},Pin:-{Add.Pin}</span>
                    </div>
                </div>
                <div className='card col-12 col-md-12 mt-3'>
                    <span>Price Details</span>
                    <div className='d-flex flex-column col-12'>
                        <div className='col-12 d-flex flex-row justify-content-between'>
                            <span className=''>List Price</span>
                            <span className='ml-auto'>{Product.Price}</span>
                        </div>
                        <div className='col-12 d-flex flex-row justify-content-between'>
                            <span className=''>Selling Price</span>
                            <span className='ml-auto'>{OrderDetals.Selling_Price}</span>
                        </div>
                        <div className='col-12 d-flex flex-row justify-content-between'>
                            <span className=''>Discount</span>
                            <span className='ml-auto'>{Product.Discount}</span>
                        </div>
                        <div className='col-12 d-flex flex-row justify-content-between'>
                            <span className=''>Handling Fee</span>
                            <span className='ml-auto'>{Product.Delivary_Charges}</span>
                        </div>
                        <div className='col-12 card-footer d-flex flex-row justify-content-between'>
                            <span className=''>Total Price</span>
                            {/* <span className='ml-auto'>{OrderDetals.Selling_Price + Product.Delivery_Charges}</span> */}
                            <span className='ml-auto'>{OrderDetals.Selling_Price + Product.Delivary_Charges}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className={`bg-light ${DSide ? 'dside' : 'ddside'}`} style={{ height: '100%', position: 'absolute', top: '0px', right: '0px', overflow: 'hidden' }}>
                <DSidebar DisplySidebar={DisplySidebar} Value={DSide} />
            </div>
            {Cancel && <>
                <div className='bg-success p-2' style={{ position: 'absolute', top: '30px', right: '30px', borderRadius: '20px' }}>
                    <div className='col-12 d-flex flex-row justify-content-end mt-3  mb-2'>
                        <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                            SetCancel(false)
                        }} style={{ fontSize: '25px', borderRadius: '20px' }}></i>

                    </div>
                    <small style={{ fontStyle: 'italic' }} className=''>Are You Sure To Cancel The Product</small><br></br>
                    <div className='d-flex flex-row justify-content-arroun mt-2'>
                        <button className='ml-auto mr-auto btn-danger btn' onClick={() => {
                            HandleCanced()
                        }} >Yes</button><button className='mr-auto btn btn-primary' onClick={() => {
                            SetCancel(false)
                        }}>No</button>
                    </div>
                </div>
            </>}
            <div className='d-flex flex-row  p-2 card mt-1 col-12' style={{ backgroundColor: 'wheat', position: 'absolute', top: '38px', background: 'rgb(0,0,0,0)', border: 'none' }}>
                <div className='col-md-3 col-lg-2 d-none d-md-block ml-auto' style={{ visibility: 'hidden' }}>
                    <div className='bg-primary p-2 web' style={{ borderRadius: '10px' }}>
                        <i class="fa-solid fa-bag-shopping mr-2 text-white ecom"></i><span className='ee'>E</span><span className='com'>commerce</span>
                    </div>
                </div>
                <div className='col-10 col-md-7 p-1 ml-auto' style={{ visibility: `${Sug.length == 0 ? 'hidden' : ''}`, }}>
                    <div className='col-12 card d-flex flex-comun' style={{ height: `${Sug.length > 10 ? '250px' : ''}`, overflow: `${Sug.length > 10 ? 'auto' : ''}` }}  >

                        {Sug && Sug.map((e) => {
                            return <small style={{ cursor: 'pointer' }} onClick={() => {
                                HandleNaviProduct(e)
                            }}>{e.split(" ").slice(0, 8).join(' ')}</small>
                        })}

                    </div>
                </div>
                <div className='mr-2 p-2 d-flex flex-row  mt-auto mb-auto ml-auto' style={{ visibility: 'hidden' }}>
                    <i class="fa-regular fa-circle-user mr-2 mt-ua h5 d-none d-md-block "></i>  <small className='d-none d-md-block ' style={{ color: 'gray', fontWeight: 'bold' }}> Profile</small>
                </div>
                <div className=' col-2 p-1 d-block d-md-none  mt-auto mb-auto ml-auto' style={{ visibility: 'hidden' }}>
                    <i class="fa-solid fa-ellipsis-vertical" style={{ fontSize: '25px' }}></i>
                </div>

            </div>
            <div className='mt-2 d-flex flex-column justify-content-start' style={{ overflowX: 'hidden' }} >
                <Footer />
            </div>
            {OProfile&&<>
                <div className='col-10 col-sm-7 col-md-5 col-lg-5 col-xl-3' style={{position:'absolute',top:'10px',right:'10px'}}>
                   <Profile HandleOpenprofile={HandleOpenprofile}  />       
                </div>
            </>}
            {OnClick && <div className='col-sm-11 col-md-6 col-lg-4 ' style={{ background: '#2457AA', position: 'absolute', top: '10px', left: '-20px', overflow: 'hidden' }} >
                <div className='col-12 d-flex flex-row justify-content-end mt-3  mb-2'>
                    <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {

                        setOnClick(false)
                    }} style={{ fontSize: '25px', borderRadius: '20px' }}></i>

                </div>
                {Catigories.slice().map((e, index) => {
                    return (
                        <>
                         {index == 0 && <>
                                <div key={index} className='card-footer text-start ml-2' style={{ height: '60px', background: '#2457AA', cursor: 'pointer', transitionDelay: `${index * 0.1}s`,visibility:'hidden' }} >

                                    <div className='d-flex flex-row'>
                                        <i className="fa-solid fa-arrow-right mt-2  mr-3 text-light" style={{ fontSize: '30px' }}></i>
                                        <h5 className='mt-2 text-light' onClick={() => {
                                            window.location.reload()
                                            navigate("/Product", { state: { Cat: e } })
                                        }}>{e}</h5>
                                    </div>
                                </div>
                            </>}
                            <div key={index} className='card-footer text-start ml-2' style={{ height: '60px', background: '#2457AA', cursor: 'pointer', transitionDelay: `${index * 0.1}s` }} >

                                <div className='d-flex flex-row'>
                                    <i className="fa-solid fa-arrow-right mt-2  mr-3 text-light" style={{ fontSize: '30px' }}></i>
                                    <h5 className='mt-2 text-light' onClick={() => {
                                        window.location.reload()
                                        navigate("/Product", { state: { Cat: e } })
                                    }}>{e}</h5>
                                </div>
                            </div>
                           
                        </>

                    )
                })}
            </div>}
        </>
    )
}

export default Status