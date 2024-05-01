import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ResizedImage from '../HomeComponents/ResizedImage'
import axios from 'axios'
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


    useEffect(() => {
  
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
                  
                    // console.log(FilterData)
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
            "OrderCancel": "Yes"
        }
        axios.patch("http://127.0.0.1:8000/OrderDetails/",Data).then((d)=>{
            window.location.reload()
        }).catch((e)=>{
            alert("error")
        })
    }
    return (
        <>
            <div className='col-12'>
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
                                <span className={`mt-2 ml-2 col-12 ${OrderDetals.OrderCancel == "No" ? "btn-danger btn" : "p-2"}`}>{OrderDetals.OrderCancel == "No" ? <span className='text-black' onClick={() => {
                                    SetCancel(true)
                                }}>Cancel</span> : "Canceled"}</span>
                            </div>
                            <small className='col-3'>
                                <small><TruncateWords text={Product.Product_Name} maxLength={50} /></small><br></br>
                                <small><i class="fa-solid fa-indian-rupee-sign"></i>{OrderDetals.Selling_Price}</small><br></br>

                            </small>
                            <small style={{ position: 'relative' }} className='d-flex flex-column '>
                                <div><span><i class="fa-solid fa-check text-white bg-success mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></span><span className=''>Order Conformed Date, {new Date(OrderDetals.Date).toDateString().slice(3, new Date(OrderDetals.Date).toDateString().length).slice(0, 7)}</span></div>
                                <div><span><i class="fa-solid fa-check text-white bg-success mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></span> <span className='mt-3' style={{ marginTop: '30px' }}>Shipped</span><br></br></div>
                                <div><span><i class="fa-solid fa-check text-white bg-success mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></span> <span className='mt-auto'>Out For Delivery</span><br></br></div>
                                <div><span><i class="fa-solid fa-check text-white bg-success mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></span> <span className=''>Delivare</span></div>
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
                                <div><span><i class="fa-solid fa-check text-white bg-success mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></span> <span className='mt-3' style={{ marginTop: '30px' }}>Shipped</span><br></br></div>
                                <div><span><i class="fa-solid fa-check text-white bg-success mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></span> <span className='mt-auto'>Out For Delivery</span><br></br></div>
                                <div><span><i class="fa-solid fa-check text-white bg-success mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></span> <span className=''>Delivare</span></div>



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
        </>
    )
}

export default Status