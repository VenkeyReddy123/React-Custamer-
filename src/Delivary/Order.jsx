import React, { useEffect, useState } from 'react'
import { Mobile_Data } from '../Data/Mobile_Data'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../HomeComponents/Navbar'
import DSidebar from '../DSidebar'
import RandomNumberGenerator from '../RandomRating'
import { Catigories } from '../Data.jsx'
import Footer from '../Footer.jsx'
import Profile from '../Accounts/Profile.jsx'

const Order = () => {
    const Data = Mobile_Data
    const navigate = useNavigate()
    const Data2 = ['Arriving Today', 'Shiped']
    const Cat = ['Electronics', 'Fashion', 'Home&Garden', 'Health&Beauty', 'Books&Media', 'Sports&OutDors', 'Toys&Games', 'Automotive', 'Jewelry&Accessories']
    
    const [Show, setShow] = useState(false)
    const [count, setCount] = useState(0)
    const [fr1, setfr1] = useState(true)
    const [fr2, setfr2] = useState(true)
    const [fr3, setfr3] = useState(true)
    const [fr4, setfr4] = useState(true)
    const [fr5, setfr5] = useState(true)
    const [Refres, SetRefresh] = useState([])
    const [FilterList, SetFilterList] = useState([])
    const [E, setE] = useState([])
    const [R, setR] = useState("")
    const [RIndex, SetRIndex] = useState(0)
    const [RInd, SetRInd] = useState(0)
    const [WhiteArr, SetWhiteArry] = useState([])
    const [GreenArry, SetGreenArry] = useState([])
    const [GiveRatingPop, setGiveRatingPop] = useState(false)
    
    const [Data3, setData3] = useState([])
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
            const Rating = d.data
            if (d.data) {
                axios.get("http://127.0.0.1:8000/LCODetails/").then((d) => {
                    const FilterData = d.data.filter((e) => {
                        return e.Custamer_Name.Email === localStorage.getItem('email')
                    })
                    FilterData.map((e) => {

                        Rating.map((e1) => {

                            if (e1.Product_Name === e.Order_Id.Product_Name.id && e.Custamer_Name.Email == e1.Custamer_Name.Email) {
                                e.Rating = true
                            }
                        })
                        return e
                    })


                    setData3(FilterData)
                    SetRefresh(FilterData.slice().reverse())



                }).catch((e) => {

                })
            }
        }).catch((e) => {

        })


    }, [])

    const Rating = () => {
        const Data = {
            "Product_Name": E.Order_Id.Product_Name.id,
            "Rating": count,
            "Rating_Lable": R,
            "Custamer_Name": localStorage.getItem('email')

        }
        const Data2 = {
            "pk": E.Order_Id.Product_Name.id,
            "username": E.Order_Id.username,
            "Rating": count
        }
        axios.post("http://127.0.0.1:8000/RatingDetails/", Data).then((d) => {

            axios.patch("http://127.0.0.1:8000/RatingAddProductDetails/", Data2).then((d) => {
                window.location.reload()
            }).catch((e) => {

            })

        }).catch((e) => {

        })

    }
    const HandleonCHnage = (event) => {
        const value = event.target.value
        if (value.length > 3) {
            const Filter = Refres.filter((e) => {
                console.log(e.Order_Id.Product_Name.Product_Name.toLowerCase())
                if (e.Order_Id.Product_Name.Product_Name.toLowerCase().includes(value.toLowerCase())) {
                    return e
                }
            })
            setData3(Filter)
        } else {
            setData3(Refres)
        }
    }
    useEffect(() => {
        if (FilterList.length > 0) {
            const List = []
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
            const getY1 = new Date().getFullYear() - 1
            const getY2 = new Date().getFullYear() - 2
            const getY3 = new Date().getFullYear() - 3
            const Filters = FilterList.filter((val) => {
                const Fi = Refres.filter((e) => {
                    const ToDay = new Date().toLocaleDateString()
                    const orderdate = new Date(e.Order_Id.Date).toLocaleDateString()
                    const oderyear = new Date(e.Order_Id.Date).getFullYear()


                    if (((e.Order_Id.Delivary == 'Yes') && 'Delivary'.toLocaleLowerCase().includes(val)) || ((e.Order_Id.OrderCancel == 'Yes' && (e.Order_Id.Delivary == 'No') && 'Canceled'.toLocaleLowerCase().includes(val)))
                        || (orderdate <= ToDay && orderdate >= thirtyDaysAgo.toLocaleDateString()) && ('last 30'.includes(val.toLocaleLowerCase()) || (oderyear == getY1 && val == getY1) ||
                            (oderyear == getY2 && val == getY2) || (oderyear == getY3 && val == getY3) || (oderyear < getY3 && val == 'old')
                            || (e.Order_Id.OrderCancel == 'No' && (e.Order_Id.Delivary == 'No') && ('ontheway'.includes(val))))
                    ) {
                        List.unshift(e)
                        return e
                    }
                })
            })
            setData3([...new Set(List)])

        } else {
            setData3(Refres)
        }
    }, [FilterList])
    useEffect(() => {
        let War = [];
        for (let val = 0; val < (5 - RIndex); val++) {
            War.push(val);
        }
        SetWhiteArry(War);
        let Grr = [];
        for (let val = 0; val < RIndex; val++) {
            Grr.push(val);
        }
        SetGreenArry(Grr);

    }, [RIndex]);
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
            <div className=''  >
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
            </div>
            <nav  style={{ background: '#1F4C94' }} class="navbar navbar-expand-lg navbar-light  mt-2">

                <Navbar Callback={Callback} DisplySidebar={DisplySidebar} />
            </nav>
            <div className='d-flex flex-column flex-sm-row flex-lg-row'>
                <div className='d-none d-lg-block col-3 mt-3'>
                    <div className='card-footer '>
                        <h3>Filters</h3>
                    </div>
                    <div className='card-body'>
                        <form>
                            <h5>Order Status</h5>
                            <div className='d-flex flex-column'>
                                <div className='d-flex flex-row'>
                                    <input type="checkbox" value={'onthe'} onChange={(e) => {
                                        if (e.target.checked) {
                                            const Value = e.target.value
                                            const List = [...FilterList, Value]
                                            SetFilterList(List)
                                        }
                                        else {
                                            const List = FilterList.filter((e1) => {
                                                if (e.target.value == e1) {

                                                } else {
                                                    return e
                                                }
                                            })
                                            SetFilterList(List)
                                        }
                                    }} /><span className='ml-3'>On The Way</span>
                                </div>
                                <div className='d-flex flex-row'>
                                    <input type="checkbox" onChange={(e) => {
                                        if (e.target.checked) {
                                            const Value = e.target.value
                                            const List = [...FilterList, Value]
                                            SetFilterList(List)

                                        } else {
                                            const List = FilterList.filter((e1) => {
                                                if (e.target.value == e1) {

                                                } else {
                                                    return e
                                                }

                                            })
                                            SetFilterList(List)
                                        }
                                    }} value={'deliv'} /><span className='ml-3'>Delivered</span>
                                </div>
                                <div className='d-flex flex-row'>
                                    <input type="checkbox" onChange={(e) => {
                                        if (e.target.checked) {
                                            const Value = e.target.value
                                            const List = [...FilterList, Value]
                                            SetFilterList(List)
                                        }
                                        else {
                                            const List = FilterList.filter((e1) => {
                                                if (e.target.value == e1) {

                                                } else {
                                                    return e
                                                }
                                            })
                                            SetFilterList(List)
                                        }
                                    }} value={'cancel'} /><span className='ml-3'>Cancelled</span>
                                </div>
                                <div className='d-flex flex-row'>
                                    <input type="checkbox" onChange={(e) => {
                                        if (e.target.checked) {
                                            const Value = e.target.value
                                            const List = [...FilterList, Value]
                                            SetFilterList(List)
                                        }
                                        else {
                                            const List = FilterList.filter((e1) => {
                                                if (e.target.value == e1) {

                                                } else {
                                                    return e
                                                }
                                            })
                                            SetFilterList(List)
                                        }
                                    }} value={'retun'} /><span className='ml-3'>Retuned</span>
                                </div>
                            </div>
                            <h6>Order Time</h6>
                            <div className='d-flex flex-column'>
                                <div className='d-flex flex-row'>
                                    <input type="checkbox" onChange={(e) => {
                                        if (e.target.checked) {
                                            const Value = e.target.value
                                            const List = [...FilterList, Value]
                                            SetFilterList(List)
                                        }
                                        else {
                                            const List = FilterList.filter((e1) => {
                                                if (e.target.value == e1) {

                                                } else {
                                                    return e
                                                }
                                            })
                                            SetFilterList(List)
                                        }
                                    }} value={'last 30'} /><span className='ml-3'>Last 30 Days</span>
                                </div>
                                <div className='d-flex flex-row'>
                                    <input type="checkbox" onChange={(e) => {
                                        if (e.target.checked) {
                                            const Value = e.target.value
                                            const List = [...FilterList, Value]
                                            SetFilterList(List)
                                        }
                                        else {
                                            const List = FilterList.filter((e1) => {
                                                if (e.target.value == e1) {

                                                } else {
                                                    return e
                                                }
                                            })
                                            SetFilterList(List)
                                        }
                                    }} value={`${new Date().getFullYear() - 1}`} /><span className='ml-3'>{new Date().getFullYear() - 1}</span>
                                </div>
                                <div className='d-flex flex-row'>
                                    <input type="checkbox" onChange={(e) => {
                                        if (e.target.checked) {
                                            const Value = e.target.value
                                            const List = [...FilterList, Value]
                                            SetFilterList(List)
                                        }
                                        else {
                                            const List = FilterList.filter((e1) => {
                                                if (e.target.value == e1) {

                                                } else {
                                                    return e
                                                }
                                            })
                                            SetFilterList(List)
                                        }
                                    }} value={`${new Date().getFullYear() - 2}`} /><span className='ml-3'>{new Date().getFullYear() - 2}</span>
                                </div>
                                <div className='d-flex flex-row'>
                                    <input type="checkbox" onChange={(e) => {
                                        if (e.target.checked) {
                                            const Value = e.target.value
                                            const List = [...FilterList, Value]
                                            SetFilterList(List)
                                        }
                                        else {
                                            const List = FilterList.filter((e1) => {
                                                if (e.target.value == e1) {

                                                } else {
                                                    return e
                                                }
                                            })
                                            SetFilterList(List)
                                        }
                                    }} /><span className='ml-3' value={`${new Date().getFullYear() - 3}`}>{new Date().getFullYear() - 3}</span>
                                </div>
                                <div className='d-flex flex-row'>
                                    <input type="checkbox" onChange={(e) => {
                                        if (e.target.checked) {
                                            const Value = e.target.value
                                            const List = [...FilterList, Value]
                                            SetFilterList(List)
                                        }
                                        else {
                                            const List = FilterList.filter((e1) => {
                                                if (e.target.value == e1) {

                                                } else {
                                                    return e
                                                }
                                            })
                                            SetFilterList(List)
                                        }
                                    }} value={'old'} /><span className='ml-3'>older</span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='col-sm-12 col-lg-8'>
                    <div className='d-flex flex-column'>
                        <div className='d-flex flex-row card-body'>
                            <input type="text" placeholder='Search Your Order' onChange={HandleonCHnage} className='col-lg-9 form-control' />
                            <button className='d-block d-lg-none btn btn-primary ml-2'>Filters</button>
                        </div>
                        {Data3 && Data3.slice().reverse().map((e, ind) => {

                            const index = Math.floor(Math.random() * Data2.length);
                            return (
                                <>
                                    <div className='card-footer mt-2 d-flex flex-row ' style={{ background: 'F1F3F6', position: 'relative' }}>
                                        <div className='col-3' onClick={() => {
                                            navigate("/Sta", { state: { Product: e } })
                                        }}>
                                            <img style={{ cursor: 'pointer' }} src={e.ImageUrl.ImageUrl} alt="" srcset="" width={'100px'} height={'110px'} />
                                        </div>
                                        <div className='d-flex-flex-column ml-5'>
                                            <div className='d-flex flex-row justify-content-between'>

                                                {e.Order_Id.Delivary == 'Yes' ? <><small style={{ fontWeight: 'bold', color: 'gray' }}>Delivered on {new Date(e.Order_Id.Delivary_Date).toDateString().slice(0, 11)}</small></> : <>{e.Order_Id.OrderCancel == 'No' ? <></> : <small className='text-danger h6'>Your Order Is Canceled</small>}</>}
                                            </div>
                                            <span>{e.Order_Id.Product_Name.Product_Name}</span><br></br>
                                            <div className='d-flex flex-row mt-2 justify-content-start col-12 ml-2 '>
                                                {e.Order_Id.Product_Name.Rating > 0 ? <>
                                                    <div>
                                                        <div style={{ width: '50px', height: '30px', background: 'green', borderRadius: '5px' }} className='d-flex flex-row shadow-lg p-1 text-center'>
                                                            <p className='text-white'>{e.Order_Id.Product_Name.Rating.slice(0, 3)}</p><i style={{ fontSize: '20px' }} class=" ml-auto fa-regular fa-star text-white"></i>
                                                        </div>
                                                    </div>
                                                </> : <>


                                                </>}

                                                
                                            </div>
                                            <div className='mt-2 d-flex flex-row justify-content-start col-12 '>
                                            {e.Rating ? <></> : <>{<h6 onClick={() => {
                                                    setE(e)
                                                    SetRInd(ind)
                                                    setShow(!Show)
                                                }} className=' ml-2 btn  btn-success text-white p-2  ' > <i class="fa-regular fa-star"></i> Give  Rating</h6>}</>}
                                            </div>
                                            <div>{e.Order_Id.AdminWrite && e.Order_Id.Delivary == 'No' && <><small className='text-danger' style={{ fontWeight: 'bold' }}>{e.Order_Id.AdminWrite}</small></>}</div>

                                        </div>
                                        {Show && ind == RInd && <>

                                            <form action="" onSubmit={(e) => {
                                                e.preventDefault()
                                                if (GreenArry.length == 0) {
                                                    setGiveRatingPop(true)
                                                    return
                                                }
                                                Rating()

                                            }}>
                                                <div className=' col-10  col-sm-7 col-md-6 col-lg-5 col-xl-4  shadow-lg' style={{ background: 'lightgray', height: '170px', position: 'absolute', top: '0px', right: '20px', overflow: 'hidden', borderRadius: '20px' }}>
                                                    <div className='d-flex flex-row justify-content-between'>

                                                        {GreenArry.map((e, ind) => (
                                                            <span key={ind} onClick={() => {
                                                                SetRIndex(5 - WhiteArr.length - ind - 1)
                                                                setCount(5 - WhiteArr.length - ind - 1)
                                                            }} style={{ fontSize: '30px', color: 'green', cursor: 'pointer' }}>
                                                                <i className="fa-solid fa-star"></i>
                                                            </span>
                                                        ))}
                                                        {WhiteArr.map((e, ind) => (
                                                            <span key={ind} onClick={() => {

                                                                SetRIndex(GreenArry.length + ind + 1)
                                                                setCount(GreenArry.length + ind + 1)
                                                            }} style={{ fontSize: '30px', color: 'white', cursor: 'pointer' }}>
                                                                <i className="fa-solid fa-star"></i>
                                                            </span>
                                                        ))}
                                                        <span style={{ color: 'red', fontSize: '20px', cursor: 'pointer' }} onClick={() => {
                                                            SetRIndex(0)
                                                            setCount(0)
                                                            setShow(!Show)
                                                        }}><i class="fa-solid fa-circle-xmark"></i></span>
                                                    </div>
                                                    {count >= 1 && count <= 2 && <><span style={{ fontSize: '20px', color: 'white' }}><i class="fa-regular fa-face-frown-open"></i></span></>}
                                                    {count > 2 && count < 4 && <><span style={{ fontSize: '20px', color: 'white' }}><i class="fa-regular fa-face-smile-beam"></i></span></>}
                                                    {count >= 4 && <><span style={{ fontSize: '20px', color: 'white' }}><i class="fa-solid fa-face-laugh-beam"></i></span></>}




                                                    <div className='mt-1' height='30px'>
                                                        <input required onChange={(e) => { setR(e.target.value) }} className='form-control' height='100%' name="" id="" cols="30" rows="10" fontSize='10px' placeholder='Type Your Rating' />
                                                    </div>
                                                    <button type='submit' className='mt-2 mb-2 btn-primary btn ' >Submit</button><br></br>

                                                    {GiveRatingPop && <><span className='text-danger h6'>Select Rating</span></>}

                                                </div>
                                            </form>

                                        </>}


                                    </div>


                                </>
                            )

                        })}
                        {Data3.length == 0 && <><span className='text-center'>No More Orders</span></>}
                    </div>
                </div>
            </div>
            {OnClick && <div className='col-sm-11 col-md-6 col-lg-4' style={{ background: '#2457AA', position: 'absolute', top: '10px', left: '-20px', overflow: 'hidden' }} >
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
            <div className={`bg-light ${DSide ? 'dside' : 'ddside'}`} style={{ height: '100%', position: 'absolute', top: '0px', right: '0px', overflow: 'hidden' }}>
                <DSidebar DisplySidebar={DisplySidebar} Value={DSide} />
            </div>
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


        </>
    )
}

export default Order

