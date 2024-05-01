import React, { useEffect, useState } from 'react'
import Card_Details from '../HomeComponents/Card_Details'
import { Mobile_Data } from '../Data/Mobile_Data'
import { json, useLocation, useNavigate } from 'react-router-dom'
import Adress from '../Delivary/Adress'
import axios from 'axios'
import Navbar from '../HomeComponents/Navbar'
import DSidebar from '../DSidebar'
import { Catigories } from '../Data'
import Footer from '../Footer'

const Checking = () => {

    const Data = Mobile_Data
    const Prices = [0]
    const Location = useLocation()
    const [List, setList] = useState([])
    const [quantity, SetQuantity] = useState(1)
    const navigate = useNavigate()
    const [Even, SetEven] = useState(false)
    const [Chnage, setChange] = useState(true)
    const Discount = [0]
    const Delivary = []
    const [Cls, setCls] = useState(false)
    const [setAdd, SetAddres] = useState([])
    const [Add, SetAdd] = useState([])
    const [AddWarning, SetAddWarning] = useState()
    const [ListWarning, setListWaning] = useState(false)
    const [Button, setButton] = useState(false)
    const [AddPop, SetAddPop] = useState(false)
    useEffect(() => {
        if (Location.state.Product ? true : false) {
            setList(Location.state.Product)


        }
        else {
            console.log(Location.state.Arr)
            setList(Location.state.Arr)
        }

        axios.get("http://127.0.0.1:8000/AdressListDetails/").then((d) => {


            const Filter = d.data.filter((d) => {
                return d.Custamer_Name === Number(localStorage.getItem('id'))
            })

            if (Filter.length > 0) {
                const Ind = localStorage.getItem('Ind') ? Number(localStorage.getItem('Ind')) : 0
                const Obj = Filter[0]
                const Arr2 = Obj.Adrss_List.split("@")
                const Ind2 = Ind < Arr2.length ? Ind : 0


                const Convesion = Arr2.map((e) => {
                    return JSON.parse(e)
                })
                SetAdd([Convesion[Ind2]])
                setChange(true)
            } else {
                SetEven(true)
                setButton(true)
            }
        }).catch((e) => {

        })


    }, [])
    const Dissplay = () => {
        axios.get("http://127.0.0.1:8000/AdressListDetails/").then((d) => {


            const Filter = d.data.filter((d) => {
                return d.Custamer_Name === Number(localStorage.getItem('id'))
            })

            if (Filter.length > 0) {
                const Ind = localStorage.getItem('Ind') ? Number(localStorage.getItem('Ind')) : 0
                const Obj = Filter[0]
                const Arr2 = Obj.Adrss_List.split("@")
                const Ind2 = Ind < Arr2.length ? Ind : 0

                const Convesion = Arr2.map((e) => {
                    return JSON.parse(e)
                })
                SetAdd([Convesion[Ind2]])
                setChange(true)
                SetEven(false)
                setButton(false)
            } else {
                SetEven(true)
                setButton(true)
            }
        }).catch((e) => {

        })


    }
    const [editIndex, setEditIndex] = useState(null); // Keep track of the index of the product being edited
    const [Index, setIndex] = useState(null)

    const handleQuantityChange = (index, quan, type) => {
        setEditIndex(index)
        if (type == 'inc') {
            const updatedList = List.map((e, ind) => {
                if (ind === index) {
                    if (e.quantity === e.Product_Name.Stack) {
                        setCls(true)
                        setIndex(index)
                        return e
                    }
                    else {
                        const Quan = quan + 1
                        return { ...e, quantity: Quan };
                    }

                }
                else {
                    return e
                }





            });
            setList(updatedList)
        }
        else {
            const updatedList = List.map((e, ind) => {
                if (ind === index) {
                    if (e.quantity > 1) {
                        setCls(false)
                        const Quan = e.quantity - 1
                        return { ...e, quantity: Quan };
                    }
                    else {
                        return e
                    }

                } else {
                    return e;
                }

            });
            setList(updatedList);
            return


        }





    };
    function sum(arr) {

        if (arr.length > 0) {
            let Sum = 0
            for (let va of arr) {
                Sum += Number(va)
            }
            return Sum
        }
    }
    const [OnClick, setOnClick] = useState(false);
    const Callback = () => {
        setOnClick(!OnClick)

    }
    const [DSide, setDSide] = useState(false)
    const DisplySidebar = () => {

        setDSide(!DSide)
    }
    const RemoveItem = (index) => {
        const Filter = List.filter((e, ind) => {
            return ind !== index
        })

        setList(Filter)
    }
    
   

    return (
        <>

            <nav style={{ background: '#1F4C94' }} class="navbar navbar-expand-lg navbar-light  mt-2">

                <Navbar Callback={Callback} DisplySidebar={DisplySidebar} />
            </nav>

            <h6 className='text-center text-danger' style={{ fontWeight: 'bold' }}>Order-Summery</h6>
            <div className='col-md-12 col-sm-12 card-body ml-auto mr-auto' style={{ background: '#F5F7FA' }} >
                <div className='d-flex flex-row justify-content-between '>
                    <h6>Delivary to:</h6>
                    {Button ? <><button className='btn btn-danger' onClick={() => {
                        setChange(false)
                        SetEven(true)
                        Dissplay()
                    }} >Cancel</button></> : <button className='btn btn-success' onClick={() => {
                        setChange(false)
                        SetEven(true)
                        setButton(true)
                        // Dissplay()
                    }} >Change</button>}
                </div>
                <div style={{ overflowX: 'hidden' }}>
                    {Chnage && Add && Add.map((Add) => {

                        return (
                            <>
                                <span className='text-primary'>{Add.Name}</span><br></br>
                                <span className='text-dark'>{Add.House}<br></br>{Add.Road}<br></br>{Add.State}{Add.City},Pin:-{Add.Pin}</span>



                            </>
                        )
                    })}
                </div>
                {Even && Even &&
                    <div style={{ height: '100%' }}>
                        <Adress Display={Dissplay} />
                    </div>
                }
            </div>

            {/*  */}
            <div className='d-sm-flex flex-sm-column d-lg-flex flex-lg-row'>
                <div className='col-sm-12 col-lg-8'>
                    {List && List.map((Product, index) => {

                        if (Product.Product_Name.Delivary_Charges > 0) {
                            Delivary.push(Product.Product_Name.Delivary_Charges)
                        }
                        Discount.push(Product.quantity * Math.trunc((Product.Product_Name.Price * (Product.Product_Name.Discount / 100))))
                        Prices.push(Product.quantity * Math.trunc(Product.Product_Name.Price - (Product.Product_Name.Price * (Product.Product_Name.Discount / 100))))
                        return (
                            <React.Fragment key={index}>
                                <div key={index} className='card-body col-md-12 mr-auto col-sm-12 mt-2' style={{ background: '#F5F7FA', border: '1px solid black' }}>
                                    <div className='col-12 d-flex flex-row justify-content-end '>
                                        <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                            RemoveItem(index)

                                        }} style={{ fontSize: '25px', borderRadius: '20px' }}></i>

                                    </div>
                                    <div className='col-sm-12 mt-3 d-flex flex-row' style={{ overflowX: 'hidden' }}>
                                        <div className='col-6 ' style={{ overflow: 'hidden' }}>
                                            {Product.ImageUrl ? <><img src={Product.ImageUrl} alt="" height={'130px'} /></> : <img src={Product.ImageUrl.ImageUrl} alt="" height={'130px'} />}
                                        </div>
                                        <div className='col-6'>
                                            <h6>{Product.Product_Name.Product_Name}</h6>
                                            <span className='text-dark' style={{ fontSize: '15px' }}><i class="fa-solid fa-indian-rupee-sign mr-2"></i>{Math.trunc(Product.Product_Name.Price - (Product.Product_Name.Price * (Product.Product_Name.Discount / 100)))}</span> <span className='text-dark mt-auto mb-auto ml-3'><del><i class="fa-solid fa-indian-rupee-sign mt-2"></i>{Product.Product_Name.Price}</del></span ><span className='text-danger ml-2'></span><span className='text-success mt-auto mb-auto'>{Product.Product_Name.Discount}%Off</span><br></br>
                                            {Cls && Index == index && editIndex === index && <span className='text-danger'> You Reached Out Of Stack</span>}

                                        </div>
                                    </div>
                                    <div className='col-sm-12 col-md-4 mt-2'>

                                        <div className='col-12 d-flex flex-row'>

                                            <button className={`btn btn-primary p-1 col-4`} onClick={() => {
                                                handleQuantityChange(index, Product.quantity, 'inc')
                                            }}
                                            >
                                                <i className="fa-solid fa-plus"></i>
                                            </button>
                                            {editIndex === index ? <h2>{Product.quantity}</h2> : <h2>{Product.quantity}</h2>}

                                            <button className={`btn btn-danger col-4 `} onClick={() => handleQuantityChange(index, Product.quantity, 'dec')}>
                                                <i className="fa-solid fa-minus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    })}

                </div>
                <div className={`bg-light ${DSide ? 'dside' : 'ddside'}`} style={{ height: '100%', position: 'absolute', top: '0px', right: '0px', overflow: 'hidden' }}>
                <DSidebar DisplySidebar={DisplySidebar} Value={DSide} />
            </div>

                <div className='col-sm-12 col-lg-4 mt-3'>
                    <div className='card shadow-lg'>
                        <div className='card-footer'>
                            <h6>Price Details</h6>
                        </div>
                        <div className='card-body'>
                            <div className='d-flex flex-row justify-content-between'>
                                <h6>Price</h6>
                                <h4><i class="fa-solid fa-indian-rupee-sign mt-1 mr-1" style={{ color: 'black' }}></i>{sum(Prices)}</h4>
                            </div>
                            <div className='d-flex flex-row justify-content-between mt-4'>

                                {Delivary.length > 0 ? <>
                                    <h6>Delivery Charges({Delivary.length}items)</h6>
                                    <div className='d-flex flex-row'>
                                        <h6 className='text-success ml-3'>{sum(Delivary)}</h6>
                                    </div>
                                </> : <>
                                    <h6>Delivery Charges</h6>
                                    <div className='d-flex flex-row'>
                                        <del><i class="fa-solid fa-indian-rupee-sign mt-1 " style={{ color: 'black' }}></i></del>
                                        <h6 className='text-success ml-3'>Free</h6>
                                    </div>
                                </>}
                            </div>
                            <div className='d-flex flex-row justify-content-between mt-3'>
                                <h6>Total Items</h6>
                                <h4>{Prices.length - 1}</h4>
                            </div>
                            <div className='d-flex flex-row justify-content-between mt-3'>
                                <h6>Total</h6>
                                <h4><i class="fa-solid fa-indian-rupee-sign mt-1 " style={{ color: 'black' }}></i>{Delivary.length>0?<>{sum(Prices)+sum(Delivary)}</>:<>{sum(Prices)}</>}</h4>
                            </div>
                        </div>
                        <div className='card-footer'>
                            <div className='d-flex flex-row justify-content-center mt-3'>
                                <span className='text-success' style={{ fontWeight: 'bold' }}>Your Total Saving For This Order<i class="fa-solid fa-indian-rupee-sign mt-1 " style={{ color: 'black' }}></i>{sum(Discount)}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className='container  d-flex flex-row justify-content-center mt-4 mb-5'>

                <button className='btn btn-warning col-sm-7 col-lg-3' onClick={() => {
                    if (List.length == 0) {
                        setListWaning(true)
                        return
                    }
                    if (Add.length == 0) {
                        SetAddPop(true)
                        return
                    }
                    localStorage.setItem('Address2', JSON.stringify(Add[0]))
                    if (!Add) {
                        alert('Please ENter Adress')
                    }
                    navigate("/Pay", {
                        state: {
                          ArrList: List,
                          Price: (sum(Delivary) ? sum(Prices) + sum(Delivary) : sum(Prices)),
                          Saving: sum(Discount),
                          Delivary: sum(Delivary)?sum(Delivary):0,
                          Total: Prices.length - 1
                        }
                      });

                }}
                >Continue</button>
            </div>
            {AddWarning && <>
                <div className='col-12 d-flex flex-row justify-content-end' style={{ position: 'relative', top: '-300px', right: '30px' }}>
                    <div className='d-flex flex-row bg-danger col-10 col-md-4 col-lg-3  justify-content-center'>

                        <span className='text-white mt-auto mb-auto'>Please Select Adress</span>
                        <i class="fa-regular btn fa-circle-xmark text-white  " onClick={() => {
                            SetAddWarning(false)
                            window.location.reload()
                        }} style={{ fontSize: '15px', borderRadius: '100px' }}></i>
                    </div>
                </div>
            </>}
            {ListWarning && <>
                <div className='col-12 d-flex flex-row justify-content-end' style={{ position: 'relative', top: '-300px', right: '30px' }}>
                    <div className='d-flex flex-row bg-danger col-11 col-md-5 col-lg-4  justify-content-center p-2' style={{ borderRadius: '10px' }}>

                        <span className='text-white mt-auto mb-auto'>Please Select Atleast One Product</span>
                        <i class="fa-regular btn fa-circle-xmark text-white  " onClick={() => {
                            setListWaning(false)
                            window.location.reload()
                        }} style={{ fontSize: '15px', borderRadius: '100px' }}></i>
                    </div>
                </div>
            </>}
            {AddPop && <>
                <div className='col-12 d-flex flex-row justify-content-end' style={{ position: 'relative', top: '-300px', right: '30px' }}>
                    <div className='d-flex flex-row bg-primary col-8 col-sm-5 col-md-3 col-lg-3  justify-content-center p-3 sty' style={{ borderRadius: '10px' }}>

                        <span className='text-white mt-auto mb-auto'>Please Select Adress</span>
                        <i class="fa-regular btn fa-circle-xmark text-danger  " onClick={() => {
                            SetAddPop(false)
                        }} style={{ fontSize: '15px', borderRadius: '100px' }}></i>
                    </div>
                </div>
            </>}
            {OnClick && <div className='col-sm-11 col-md-6 col-lg-4' style={{ background: '#2457AA', position: 'absolute', top: '10px', left: '-20px', overflow: 'hidden' }} >
                <div className='col-12 d-flex flex-row justify-content-end mt-3  mb-2'>
                    <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {

                        setOnClick(false)
                    }} style={{ fontSize: '25px', borderRadius: '20px' }}></i>

                </div>
                {Catigories.slice().map((e, index) => {
                    return (
                        <div key={index} className='card-footer text-start ml-2' style={{ height: '60px', background: '#2457AA', cursor: 'pointer', transitionDelay: `${index * 0.1}s` }} >

                            <div className='d-flex flex-row'>
                                <i className="fa-solid fa-arrow-right mt-2  mr-3 text-light" style={{ fontSize: '30px' }}></i>
                                <h5 className='mt-2 text-light' onClick={() => { navigate("/Product", { state: { Cat: e } }) }}>{e}</h5>
                            </div>
                        </div>
                    )
                })}
            </div>}
            <div className='mt-2 d-flex flex-column justify-content-start' style={{ overflowX: 'hidden' }} >
                <Footer />
            </div>


        </>
    )
}

export default Checking