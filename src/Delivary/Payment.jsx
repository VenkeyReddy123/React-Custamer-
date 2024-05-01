import React, { useState } from 'react'
// import { Mobile_Data } from '../Data/Mobile_Data'
import axios, { Axios } from 'axios'
import { json, useLocation, useNavigate } from 'react-router-dom'
import CuponPage from '../CuponPage'
import ResizedImage from '../HomeComponents/ResizedImage'
import Navbar from '../HomeComponents/Navbar'
import DSidebar from '../DSidebar'
import { Catigories } from '../Data'
import Footer from '../Footer'
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

const Payment = () => {
    const email = localStorage.getItem('email')
    const navigate = useNavigate()
    const Location = useLocation()
    const [CChek, setCChek] = useState(false)
    const [Off, setOff] = useState(null)
    const [Code, SetCode] = useState(null)
    const [Val, setVal] = useState(false)
    const [Click, setClick] = useState(false)
    const [Select, SetSelect] = useState(false)
    const [Item, SetItem] = useState([])
    const storedAddress = localStorage.getItem('Address2');
    const Add = JSON.parse(storedAddress)
    const ArrList = Location.state.ArrList
    const [Arr, setArr] = useState(ArrList)
    const Price = Location.state.Price
    const Saving = Location.state.Saving
    const Delivary = Location.state.Delivary
    const Total = Location.state.Total
    const [Cupon, setCupon] = useState([])
    const [PayPop, setPayPop] = useState(false)
    let Pay2 = null
    let PayOp = null
    const handleOptionChange = (event) => {
        PayOp = event.target.value
        Pay2 = event.target.value
    };
    const BookOder = async () => {

        if (PayOp) {

        }
        else {
            setPayPop(true)
            return
        }
        let Status = null
        if (PayOp == 'Cash On Delevary') {
            Status = 'Pending'
        }
        else {
            Status = 'Compleate'
        }

        Arr.map(async (Product) => {
            const SPrice = Math.trunc(Product.Product_Name.Price - (Product.Product_Name.Price * (Product.Product_Name.Discount / 100)))
            const Data = {
                "username": Product.Product_Name.username,
                "Product_Name": Product.Product_Name.id,
                "Payment_Status": Status,
                "Custamer_Name": email,
                "Delivary_Type": PayOp,
                "Selling_Price": SPrice,
                "Code_Using": 0,

            }
            await axios.post("http://127.0.0.1:8000/OrderDetails/", Data).then((d) => {
                const Data = {
                    "ImageUrl": Product.ImageUrl,
                    "username": d.data.username,
                    "Product_Name": Product.Product_Name.id,
                    "Full_Name": Add.Name,
                    "City": Add.City,
                    "Quantity": Product.quantity,
                    "Total_Amount": Product.quantity * SPrice,
                    "Adress": JSON.stringify(Add),
                    "Custamer_Name": d.data.Custamer_Name,

                }
                axios.post("http://127.0.0.1:8000/CustamerDetails/", Data).then((d) => {


                })
                const Data3 = {
                    "pk": Product.Product_Name.id,
                    "Stack": Product.Product_Name.Stack - Product.quantity
                }
                axios.patch("http://127.0.0.1:8000/ProductDetails/", Data3).then((e) => {

                })
            }).catch((e) => {
                console.log('error')
            })
        })

        Item.map((Product) => {
            let SPrice = 0
            const SP = Math.trunc(Product.Product_Name.Price - (Product.Product_Name.Price * (Product.Product_Name.Discount / 100)))
            SPrice = SP
            const Price = []
            const Code = []
            if (Cupon.Discount_Type.includes('Amount')) {
                Price.unshift(SPrice - Cupon.Code_Off)
                Code.unshift(Cupon.Code_Off)
            }
            else {
                const Sp2 = Math.trunc(SPrice - (SPrice * (Cupon.Code_Off / 100)))
                Code.unshift(SPrice * (Cupon.Code_Off / 100))
                Price.unshift(Sp2)
            }
            const Data = {
                "username": Product.Product_Name.username,
                "Product_Name": Product.Product_Name.id,
                "Payment_Status": Status,
                "Custamer_Name": email,
                "Delivary_Type": PayOp,
                "Selling_Price": Price[0],
                "Code_Using": Code[0],

            }
            axios.post("http://127.0.0.1:8000/OrderDetails/", Data).then((d) => {
                const Data = {
                    "ImageUrl": Product.ImageUrl,
                    "username": d.data.username,
                    "Product_Name": Product.Product_Name.id,
                    "Full_Name": Add.Name,
                    "City": Add.City,
                    "Quantity": Product.quantity,
                    "Total_Amount": Product.quantity * SPrice,
                    "Adress": JSON.stringify(Add),
                    "Custamer_Name": d.data.Custamer_Name,

                }
                axios.post("http://127.0.0.1:8000/CustamerDetails/", Data).then((d) => {
                })
                const Data3 = {
                    "pk": Product.Product_Name.id,
                    "Stack": Product.Product_Name.Stack - Product.quantity
                }
                axios.patch("http://127.0.0.1:8000/ProductDetails/", Data3).then((d) => {
                })
            }).catch((e) => {
                console.log('Error')
            })
            const Data1 = {
                "Code_Name": Cupon.Code_Name,
                "Custamer_Name": Number(localStorage.getItem('id'))
            }
            axios.post("http://127.0.0.1:8000/CheckCodeDetails/", Data1).then((d) => {

            }).catch((e) => {
                alert("Code Error")
            })
        })
        const Total = [...Arr, ...Item]
        localStorage.setItem('TotalItems', Total.length)
        localStorage.setItem('TotalPrice', Price)
        navigate('/Book', { state: { Items: { Total } } })
    }
    const UpdateOff = (Arr, type, Mess) => {

        if (type === 'Succ') {
            const Obj = Arr[0]
            setCupon(Arr[0])
            if (Obj.Discount_Type.toLowerCase().includes('Amount'.toLowerCase())) {
                setOff(`You Won The Amount ${Obj.Code_Off} Rupees On One Product  `)
                if (ArrList.length > 0) {
                    setOff(`You Won The Amount ${Obj.Code_Off} Rupees On One Product  `)
                    const Ind = Math.floor(Math.random() * ArrList.length)
                    const Obj2 = ArrList[Ind]
                    SetItem([Obj2])
                    const FilterData = ArrList.filter((e, ind) => {
                        return ind != Ind
                    })
                    setArr(FilterData)
                    setCChek(false)
                } else {

                    setOff(`You Won The Amount ${Obj.Code_Off} Rupees On  Product  `)
                    SetItem(ArrList)
                    setArr([])
                    setCChek(false)
                }
            } else {
                const Obj = Arr[0]
                setCupon(Arr[0])
                if (ArrList.length > 0) {
                    setOff(`You Get The Off ${Obj.Code_Off} % On One Product`)
                    const Ind = Math.floor(Math.random() * ArrList.length)
                    const Obj2 = ArrList[Ind]
                    SetItem([Obj2])
                    const FilterData = ArrList.filter((e, ind) => {
                        return ind != Ind
                    })

                    setArr(FilterData)
                    setCChek(false)
                } else {
                    setOff(`You Get The Off ${Obj.Code_Off} % On One Product`)

                    SetItem(ArrList)
                    setArr([])
                    setCChek(false)
                }
            }
        }
        else if (type === 'Error') {

            setOff(Mess)
        }
        else if (type === 'Expi') {
            setOff("Code expired")
        }
        else {

        }
    }

    const CuponSending = () => {

        const filteredArray = ArrList.filter((e) => {
            return e.id !== Item.id;
        });
        setArr(filteredArray)

    }
    const [OnClick, setOnClick] = useState(false);
    const Callback = () => {
        setOnClick(!OnClick)

    }
    const [DSide, setDSide] = useState(false)
    const DisplySidebar = () => {

        setDSide(!DSide)
    }

    return (
        <>   <nav style={{ background: '#1F4C94' }} class="navbar navbar-expand-lg navbar-light  mt-2">

                <Navbar Callback={Callback} DisplySidebar={DisplySidebar} />
           </nav>
            <div className='d-flex  flex-column d-lg-flex flex-lg-row col-12'>
                <div className='col-sm-12 col-lg-8 d-flex flex-column'>

                    <div className='card col-12 mt-2' style={{ maxHeight: '100px' }}>
                        <div className='d-flex flex-column'>
                            <h2>Login<i class="fa-solid fa-check ml-2 text-success"></i></h2>
                            <span className='mb-2 text-danger' style={{ fontWeight: 'bold' }}>Flipcard Custemer <span className='text-primary' style={{ fontWeight: 'bold' }}>+91 {localStorage.getItem("mobile_number")}</span></span>
                        </div>
                    </div>

                    <div className='card col-12' style={{ maxHeight: '200px' }}>
                        <div className='d-flex flex-row justify-content-between '>
                            <h2>Delivery Adress<i class="fa-solid fa-check ml-2 text-success"></i></h2>
                        </div>
                        <div className='d-flex flex-column flex-wrap' style={{ overflowX: 'hidden' }}>
                            <span className='text-primary'>{Add.Name}</span><br></br>
                            <span className='text-dark'>{Add.House}<br></br>{Add.Road}<br></br>{Add.State}{Add.City},Pin:-{Add.Pin}</span>
                        </div>
                    </div>
                    {/*  */}
                    <div >
                        <div style={{ textAlign: 'end' }}>
                            <i class="fa-solid fa-plus mt-2" style={{ fontSize: '25px' }} onClick={() => {

                                setCChek(!CChek)
                            }} ></i>Enter Coupon Code
                        </div>
                        {CChek && <>
                            <CuponPage UpdateOff={UpdateOff} />
                        </>}

                    </div>
                    {/*  */}
                    {Off && <span className='ml-3 text-success'>{Off}</span>}
                    <div className='card col-12 mt-2 mb-3 ' style={{ maxHeight: '300px', background: '#F5F7FA' }} >
                        <h2 className='text-center'>Payment Options</h2>
                        <div className='d-flex flex-column flex-wrap card-body' style={{ overflowX: 'hidden', }}>
                            <form>
                                <div className='d-flex flex-row justify-content-bteween card mt-2'>
                                    <input type="radio" name='py' value="Upi" onChange={handleOptionChange} />
                                    <label htmlFor="">Upi</label>
                                </div>
                                <div className='d-flex flex-row justify-content-bteween card mt-2'>
                                    <input type="radio" name="py" value="Wallets" onChange={handleOptionChange} />
                                    <label htmlFor="">Wallets</label>
                                </div>
                                <div className='d-flex flex-row justify-content-bteween card mt-2'>
                                    <input type="radio" name='py' value="Credit/Debit" onChange={handleOptionChange} />
                                    <label htmlFor="">Credet/Debit Card</label>
                                </div>
                                <div className='d-flex flex-row justify-content-bteween card mt-2'>
                                    <input type="radio" name="py" value="Net Banking" onChange={handleOptionChange} />
                                    <label htmlFor="">Net Banking</label>
                                </div>
                                <div className='d-flex flex-row justify-content-bteween card mt-2 '>
                                    <input type="radio" name="py" value="Cash On Delevary" onChange={handleOptionChange} />
                                    <label htmlFor="">Cash On Deleivary</label>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                </div>
                <div className='col-sm-12 col-lg-4 mt-3'>
                    <div className='card shadow-lg'>
                        <div className='card-footer'>
                            <h6>Price Details</h6>
                        </div>
                        <div className='card-body'>
                            <div className='d-flex flex-row justify-content-between'>
                                <h6>Price</h6>
                                <h4><i class="fa-solid fa-indian-rupee-sign mt-1 mr-1" style={{ color: 'black' }}></i>{Price - Delivary}</h4>
                            </div>
                            <div className='d-flex flex-row justify-content-between mt-4'>

                                {Delivary > 0 ? <>
                                    <h6>Delivery Charges({Delivary.length}items)</h6>
                                    <div className='d-flex flex-row'>
                                        <h6 className='text-success ml-3'>{Delivary}</h6>
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
                                <h4>{Total}</h4>
                            </div>
                            <div className='d-flex flex-row justify-content-between mt-3'>
                                <h6>Total</h6>
                                <h4><i class="fa-solid fa-indian-rupee-sign mt-1 " style={{ color: 'black' }}></i>{Price}</h4>
                            </div>
                        </div>
                        <div className='card-footer'>
                            <div className='d-flex flex-row justify-content-center mt-3'>
                                <span className='text-success' style={{ fontWeight: 'bold' }}>Your Total Saving For This Order<i class="fa-solid fa-indian-rupee-sign mt-1 " style={{ color: 'black' }}></i>{Saving}</span>
                            </div>
                        </div>
                    </div>
                    {Click == 0 ? <>
                        <div className={`mt-3 text-center`}>

                            <button type='button' className={`btn btn-danger ml-3`} onClick={() => {
                                setClick(Click + 1)
                                BookOder()
                            }}   >Click To Book</button>
                        </div>
                    </> : <>
                        <div className={`mt-3 text-center`}>

                            <button type='button' className={`btn btn-danger ml-3 disabled`} onClick={() => {
                                BookOder()
                            }}   >Click To Book</button>
                        </div>
                    </>}
                </div>

            </div>
            <div className='mt-3 d-flex flex-column justify-content-start' style={{ overflowX: 'hidden' }} >
               
            </div>
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
            <div className={`bg-light ${DSide ? 'dside' : 'ddside'}`} style={{ height: '100%', position: 'absolute', top: '0px', right: '0px', overflow: 'hidden' }}>
                <DSidebar DisplySidebar={DisplySidebar} Value={DSide} />
            </div>
            {PayPop && <>
                <div className='col-12 mb-3 d-flex flex-row justify-content-end' style={{ position: 'absolute', top: '60vh' }}>
                    <div className='  col-10 col-sm-7 col-md-3 bg-danger p-2' style={{ borderRadius: '10px' }}>
                        <div className='col-12 d-flex flex-row justify-content-end '>
                            <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                setPayPop(false)

                            }} style={{ fontSize: '25px', borderRadius: '20px' }}></i>

                        </div>
                        <span className='text-white'>Please Select Payment Option</span>
                    </div>
                </div>
            </>}
            <div className='mt-4 d-flex flex-column justify-content-start' style={{ overflowX: 'hidden' }} >
                <Footer />
            </div>

        </>
        
    )
}

export default Payment