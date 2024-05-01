import React, { useEffect, useState } from 'react'
import { Mobile_Data } from './Data/Mobile_Data'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ResizedImage from './HomeComponents/ResizedImage'
import Navbar from './HomeComponents/Navbar'
import DSidebar from './DSidebar'
import Countdown from './Countdown'
import RandomNumberGenerator from './RandomRating'
import { Catigories } from './Data.jsx'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DisplayHTML from './DisplayHTML.jsx'

// function DisplayHTML({ htmlContent }) {
//     return (
//       <div>
//         <ReactQuill
//           theme="snow"
//           value={htmlContent}
//           readOnly={true} // Set the editor as read-only
//           modules={{ toolbar: false }} // Hide toolbar
//         />
//       </div>
//     );
//   }

class TruncateWords extends React.Component {
    truncateWords = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        const truncated = text.substr(0, text.lastIndexOf(' ', maxLength));
        return truncated + '...';
    };

    render() {
        const { text, maxLength } = this.props;
        const truncatedText = this.truncateWords(text, maxLength);

        return <span>{truncatedText}</span>
    }
}


const ProductDisplay = () => {
    const Cat = ['Electronics', 'Fashion', 'Home&Garden', 'Health', 'Books', 'Sports', 'Toys', 'Automotive', 'Jewelry&Accessories']
    const Location = useLocation()
    const Data2 = Location.state.data
    const navigate = useNavigate()
    const [count, SetCount] = useState(1)
    const [Data3, setData2] = useState(null)
    const [OnClick, setOnClick] = useState(false);
    const [data, setdata] = useState([])
    const [C_Ratings, setC_Ratings] = useState([])
    const [Ind, setInd] = useState(0)
    const [Obj, setObj] = useState({})
    const [LPop, setLPop] = useState(false)
    const[Add,setAdd]=useState(false)
    // const [Html,setHtml]=useHtml()
    const List_urls = []
    const Callback = () => {
        setOnClick(!OnClick)

    }
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {
            const Filter = d.data.filter((d) => {
                return Data2.Product_Name.Category == d.Product_Name.Category
            })
            setData2(Filter)
            const Filter2 = d.data.filter((d) => {
                return Data2.Product_Name.id == d.Product_Name.id
            })
            setdata(Filter2)
            const Obj = Filter2[0]
            setObj(Obj)
            axios.get("http://127.0.0.1:8000/RatingDetails/").then((d) => {
                const FilterRating = d.data.filter((e) => {
                    return e.Product_Name == Obj.Product_Name.id
                })
                setC_Ratings(FilterRating)


            })

        }).catch((e) => {
            alert('Please Try AGian Later Somthing Eroor')
        })


    }, [])
    const AddCard = (e) => {
        const email = localStorage.getItem('email') ? true : false
        if (email) {
            const Data = {

                "Custamer_Name": localStorage.getItem('email'),
                "Product_Name": e.Product_Name.id
            }
            axios.post("http://127.0.0.1:8000/AddCardDetails/", Data).then((e) => {
                setAdd(true)
            }).catch((e) => {
                alert('Already Added/Network Issuse Please Try Again lAtes')
            })
            return
        }
        else {
            setLPop(true)
        }
        return

    }
    const [DSide, setDSide] = useState(false)
    const DisplySidebar = () => {

        setDSide(!DSide)
    }
    const BuyNow = () => {
        Obj.quantity = count
        console.log(Obj)
        navigate('/Check', { state: { Product: [Obj] } })
    }

    const StarRating = ({ rating, Custamer_Name }) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;


        const stars = [];
        for (let i = 0; i < fullStars; i++) {
            stars.push(<i key={i} className="fas fa-star"></i>);
        }
        if (hasHalfStar) {
            stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
        }
        return <span style={{ fontSize: '10px' }} className='text-success'>{stars}<spna className='text-dark'>{Custamer_Name}</spna></span>;
    };

    return (
        <>

            {/*  */}
            <nav style={{ background: '#1F4C94' }} class="navbar navbar-expand-lg navbar-light  mt-2">

                <Navbar Callback={Callback} DisplySidebar={DisplySidebar} />
            </nav>
            {/*  */}
            <div>
                <div className='d-md-flex d-xl-flex  flex-md-row  flex-xl-row mt-5 ml-2 mr-2 ' style={{ overflowX: 'hidden', overflowY: 'auto', scrollbarWidth: 'none' }}>

                    {data && data.slice(0, 1).map((Data2) => {
                        
                        return (
                            <>
                                <div className='col-12 col-md-5  col-xl-4 d-flex flex-column  card p-2 ' style={{ height: '100%' }}>
                                    <div className=' d-flex flex-row justify-content-arround p-3'>
                                        <div className='col-3 col-sm-2 col-md-3'>
                                            {Data2.List_Urls && Data2.List_Urls.split(" ").slice(0, 4).map((e, ind) => {
                                                if (Data2.List_Urls.split(" ").length % 2 === 0) {
                                                    if (ind < 4) {
                                                        List_urls.unshift(e)
                                                    }
                                                }
                                                else {
                                                    if (ind < Data2.List_Urls.split(" ").length - 1) {
                                                        if (ind < 4) {
                                                            List_urls.unshift(e)
                                                        }
                                                    }
                                                }
                                                return (
                                                    <>
                                                        <div onClick={() => {
                                                            setInd(ind)
                                                        }} className='mt-2' style={{ cursor: 'pointer' }}>
                                                            <ResizedImage imageUrl={e} widthPercentage={100} heightPercentage={95} />
                                                        </div>
                                                    </>
                                                )
                                            })}
                                        </div>
                                        <div className='col-8 mt-3' >
                                            {Data2.List_Urls ? <><img src={Data2.List_Urls.split(" ")[Ind]} alt={Data2.Product_Name.Product_Name} width={'100%'} height={'100%'} /></> : <>
                                                <img src={Data2.ImageUrl} alt={Data2.Product_Name.Product_Name} width={'100%'} height={'100%'} />
                                            </>}
                                        </div>
                                    </div>
                                    <div className='d-flex flex-row justify-content-center mt-3 mb-3'>
                                        <button onClick={() => { AddCard(Data2) }} className='col-5 ml-auto p-2  btn  text-white d-flex flex-row justify-content-around  ' style={{ background: '#FF9F00', border: '2px solid #FF9F00' }}> <i class="fa-solid fa-heart-circle-check mt-1"></i><span>Add To Cart</span></button>
                                        <button onClick={() => {

                                            const email = localStorage.getItem('email') ? true : false
                                            if (email) {


                                                if (Data2.Product_Name.Stack > 0) {
                                                    BuyNow(Data2)
                                                }

                                            }
                                            else {
                                                setLPop(true)

                                            }
                                        }} className={` btn btn-primary col-5 ml-auto  text-white d-flex flex-row justify-content-around ${Data2.Product_Name.Stack === 0 ? 'disabled' : ''} `} style={{ border: '1px solid skyblue' }}><i className="fa-solid fa-cart-shopping mt-2"></i><span className='mt-1'>Buy Now</span></button>
                                    </div>

                                </div>

                                <div className=' col-md-7 col-lg-8  mt-2 ' style={{height:'80vh',marginBottom: '30px', overflow: 'auto', scrollbarWidth: 'none' }}>
                                    <h6>
                                        <small className=' text-dark d-inline-block  text-wrap text-break'>{Data2.Product_Name.Product_Name}</small>
                                        {Data2.Product_Name.Delivary_Charges == 0 ? <>
                                            <p className='text-'><del className='text-dark ml -2 mr-2'>No Charges</del>Free Delivary</p>
                                        </> : <>
                                        </>}
                                    </h6>
                                    {Data2.Product_Name.Rating > 0 ? <>
                                        <div>
                                            <div style={{ width: '70px', height: '30px', background: 'green', borderRadius: '5px' }} className='d-flex flex-row shadow-lg p-1 text-center'>
                                                <p className='text-white'>{Data2.Product_Name.Rating}</p><i style={{ fontSize: '20px' }} class=" ml-auto fa-regular fa-star text-white"></i>
                                            </div>
                                        </div>
                                    </> : <>

                                        <p>No More Revices</p>
                                    </>}
                                    <div>
                                        <span className='text-success mr-2'>Saving Amount<span className='text-success ml-2'><i class="fa-solid fa-indian-rupee-sign mr-2"></i>{Math.trunc((Data2.Product_Name.Price * (Data2.Product_Name.Discount / 100)))}</span></span>
                                    </div>
                                    <div className='d-flex flex-row align-center'>

                                        <span className='text-dark' style={{ fontSize: '25px' }}><i class="fa-solid fa-indian-rupee-sign mr-2"></i>{Math.trunc(Data2.Product_Name.Price - (Data2.Product_Name.Price * (Data2.Product_Name.Discount / 100)))}</span> <span className='text-dark mt-auto mb-auto ml-3'><del><i class="fa-solid fa-indian-rupee-sign mt-2"></i>{Data2.Product_Name.Price}</del></span ><span className='text-danger ml-2'></span><span className='text-success mt-auto mb-auto'>{Data2.Product_Name.Discount}%Off</span>
                                    </div>

                                    <div className='d-flex fex-row justify-content-stat'>

                                         <small>Colors</small>
                                         <small className='ml-1'>[{Data2.Product_Name.Color}]</small>
   
                                    </div>
                                    <div className='d-flex flex-row'>
                                        <h5 className='text-primary'>Special offer ends in </h5><h5 className='text-danger'><Countdown /></h5>
                                    </div>
                                    <div className='d-flex flex-row'>
                                        <span className='text-danger' style={{ fontWeight: 'bolder' }}>{Data2.Product_Name.Stack > 0 && Data2.Product_Name.Stack <= 5 ? <><span>OnlyFew Stack Is There</span></> : <></>}</span>
                                        <span className='text-danger' style={{ fontWeight: 'bolder' }}>{Data2.Product_Name.Stack == 0 ? <><span>Out Of Stack  </span></> : <></>}</span>
                                    </div>
                                    

                                    <div className='mt-2'>
                                        <h5>Quantity</h5>
                                        <div className='d-flex flex-row text-center mt-2 mb-2'>
                                            <button className='btn border-primary mr-2' onClick={() => SetCount(count + 1)}><i class="fa-solid fa-plus text-primary p-2"></i></button>
                                            <span className='h4 mt-2'>{count}</span>
                                            <button className='btn border-primary ml-2' onClick={() => { if (count > 1) { SetCount(count - 1) } }}><i class="fa-solid fa-minus text-primary p-2"></i></button>
                                        </div>
                                    </div>
                                     <div className='mt-2 mb-2'>
                                     {Data2.Product_Name.Description && <>
                                        <DisplayHTML htmlContent={Data2.Product_Name.Description} />

                                    </>}
                                     </div>
                                    <div className='mt-2 mb-2'>
                                    {Data2.Product_Name.Hightlet && <>
                                        <DisplayHTML htmlContent={Data2.Product_Name.Hightlet} />

                                    </>}
                                    <div className='mt-2'>
                                    {Data2.Product_Name.Specifications && <>
                                        <DisplayHTML htmlContent={Data2.Product_Name.Specifications} />

                                    </>}
                                    </div>
                                    </div>
                                    <div className='card-bdy' overflowY='auto'>
                                        Ratings
                                        {C_Ratings && C_Ratings.slice().reverse().map((e) => {
                                            return (
                                                <>
                                                    <div className=''>
                                                        <StarRating rating={e.Rating} Custamer_Name={e.Custamer_Name.Custamer_Name} />
                                                        <p style={{ fontSize: '13px' }}>{e.Rating_Lable}</p>
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </div>


                                </div>
                            </>
                        )
                    })}
                </div>

            </div>
            <div className='d-flex flex-column' style={{ overflowX: 'hidden' }}>
                <h5 className='p-3 text-primary'><i className="fa-solid fa-hashtag p-2 text-warning"></i>Suggest For You</h5>
                <div className='d-flex flex-row  col-12 ' style={{ overflowX: 'auto' }}>
                    {Data3 && Data3.slice(0, 7).map((e, ind) => {
                        return (
                            <>
                                <div key={ind} className=' card col-8  col-md-4 col-lg-3 col-xl-2 mr-4 ml-3' style={{ height: '300px', borderRadius: '50px', cursor: 'pointer' }} onClick={() => {
                                    window.location.reload()
                                    navigate("/Dis", {
                                        state: { data: e }

                                    })
                                }}>
                                    <div className='card-body' style={{ height: '150px', marginTop: '0px' }} >
                                        {/* <img className='shadow' src={e.ImageUrl} alt={e.Product_Name.Product_Name} width={'150px'} height={'150px'}  style={{ borderRadius: '10px' }} /> */}
                                        {/* <ResizedImage imageUrl={e.ImageUrl} height={150} width={150} /> */}
                                        <ResizedImage imageUrl={e.ImageUrl} widthPercentage={100} heightPercentage={100} />
                                    </div>
                                    <div className='card-body' >
                                        <h6 className='text-primary'><TruncateWords text={e.Product_Name.Product_Name} maxLength={20}
                                        /></h6>
                                        <span className='text-dark'><del><i class="fa-solid fa-indian-rupee-sign mr-2"></i>{e.Product_Name.Price}</del></span ><span className='text-danger ml-2'>{e.Product_Name.Discount}%Off</span><span className='text-success'><i class="fa-solid fa-indian-rupee-sign mr-2"></i>{Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100)))}only</span>
                                    </div>

                                </div>
                            </>
                        )
                    })}

                </div>

            </div>

            {OnClick && <div className='col-sm-11 col-md-6 col-lg-4' style={{ background: '#2457AA', position: 'absolute', top: '10px', left: '-20px', overflow: 'hidden' }} >
                <div className='col-12 d-flex flex-row justify-content-end mt-3  mb-2'>
                    <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {

                        setOnClick(false)
                    }} style={{ fontSize: '25px', borderRadius: '20px' }}></i>

                </div>
                {Catigories.slice().map((e, index) => { // Reversing the order of mapped elements
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
            <div className={`bg-light ${DSide ? 'dside' : 'ddside'}`} style={{ height: '100vh', position: 'absolute', top: '0px', right: '0px', overflow: 'hidden' }}>
                <DSidebar DisplySidebar={DisplySidebar} />
            </div>
            {LPop&&<><div className='col-12' style={{ position: 'absolute', top: '100px', right: '30px' }}>
                <div className='col-12 d-flex flex-row justify-content-end p-2'>
                    <div className=' col-6 col-sm-4 col-md-3 col-lg-2  bg-primary text-black' style={{ fontWeight: 'bold', borderRadius: '10px', fontStyle: 'intalic' }}>
                        <div className='col-12 d-flex flex-row justify-content-end'>
                            <i class="fa-regular fa-circle-xmark text-danger p-2" onClick={() => {
                                    setLPop(false)

                            }} style={{ fontSize: '15px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' }}></i>

                        </div>
                        <small className='p-2 mb-3 text-white' style={{ fontWeight: 'bold', borderRadius: '30px', fontStyle: 'intalic' }}>Please Login</small>
                    </div>
                </div>
            </div>
            </>}
            {Add&&<><div className='col-12' style={{ position: 'absolute', top: '100px', right: '30px' }}>
                <div className='col-12 d-flex flex-row justify-content-end p-2'>
                    <div className=' col-6 col-sm-4 col-md-3 col-lg-2  bg-primary text-black' style={{ fontWeight: 'bold', borderRadius: '10px', fontStyle: 'intalic' }}>
                        <div className='col-12 d-flex flex-row justify-content-end'>
                            <i class="fa-regular fa-circle-xmark text-danger p-2" onClick={() => {
                                    setAdd(false)

                            }} style={{ fontSize: '15px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' }}></i>

                        </div>
                        <small className='p-2 mb-3 text-white' style={{ fontWeight: 'bold', borderRadius: '30px', fontStyle: 'intalic' }}>Added Successfully</small>
                    </div>
                </div>
            </div>
            </>}


        </>
    )
}

export default ProductDisplay
