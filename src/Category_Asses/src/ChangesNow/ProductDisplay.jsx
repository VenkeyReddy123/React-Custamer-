import React, { useEffect, useState } from 'react'
import { Mobile_Data } from './Data/Mobile_Data'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ResizedImage from './HomeComponents/ResizedImage'
import Navbar from './HomeComponents/Navbar'
import DSidebar from './DSidebar'
import Countdown from './Countdown'
import RandomNumberGenerator from './RandomRating'



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
                alert('Addee Success')
            }).catch((e) => {
                alert('Already Added/Network Issuse Please Try Again lAtes')
            })
            return
        }
        else {
            alert('Please Login')
        }
        return

    }
    const [DSide, setDSide] = useState(false)
    const DisplySidebar = () => {

        setDSide(!DSide)
    }
    const BuyNow = () => {
        Data2.quantity = count
        navigate('/Check', { state: { Product: Data2 } })
    }
    
const StarRating = ({ rating,Custamer_Name }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;


    const stars = [];
    for (let i = 0; i < fullStars; i++) {
        stars.push(<i key={i} className="fas fa-star"></i>);
    }
    if (hasHalfStar) {
        stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    return <span style={{fontSize:'10px'}} className='text-success'>{stars}<spna className='text-dark'>{Custamer_Name}</spna></span>;
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
                                <div className='col-md-6 col-lg-6 card   mt-2' style={{ height: '400px', marginBottom: '30px' }}>
                                    <div className='text-center mt-2' style={{ overflow: 'hidden' }}>    
                                        <img src={Data2.ImageUrl} alt={Data2.Product_Name.Product_Name} height={300} />
                                    </div>

                                    <div className='d-flex flex-row justify-content-center mt-2  '>
                                        <button onClick={() => { AddCard(Data2) }} className='col-5 ml-auto p-2  text-white d-flex flex-row justify-content-around  ' style={{ background: '#FF9F00' }}> <i class="fa-solid fa-heart-circle-check mt-1"></i><span>Add To Card</span></button>
                                        <button onClick={() => { 

                                            const email = localStorage.getItem('email') ? true : false
                                            if (email) {
                                                
                                                
                                                if(Data2.Product_Name.Stack>0){
                                                    BuyNow(Data2)
                                                }

                                            }
                                            else {
                                                alert('Please Login')
                                    
                                            }
                                        }} className={` btn btn-primary col-5 ml-auto  text-white d-flex flex-row justify-content-around ${Data2.Product_Name.Stack===0?'disabled':''} `} style={{border:'1px solid skyblue'  }}><i className="fa-solid fa-cart-shopping mt-2"></i><span className='mt-1'>Buy Now</span></button>
                                    </div>
                                </div>
                                <div className=' col-md-6 col-lg-6 border border-info mt-2 ' style={{ height: '400px', marginBottom: '30px',overflow:'auto', scrollbarWidth:'none'  }}>
                                    <h6>
                                        <span className='h5 text-dark d-inline-block w-100 text-wrap text-break'>{Data2.Product_Name.Product_Name}</span>
                                        {Data2.Product_Name.Delivary_Charges<0?<>
                                        <p className='text-'><del className='text-dark ml -2 mr-2'>No Charges</del>Free Delivary</p>
                                        </>:<>
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

                                    <div>



                                    </div>
                                    <div className='d-flex flex-row'>
                                        <h5 className='text-primary'>Special offer ends in </h5><h5 className='text-danger'><Countdown /></h5>
                                    </div>
                                    <div className='d-flex flex-row'>
                                        <span className='text-danger' style={{fontWeight:'bolder'}}>{Data2.Product_Name.Stack>0&&Data2.Product_Name.Stack<=5?<><span>OnlyFew Stack Is There</span></>:<></>}</span>
                                        <span className='text-danger' style={{fontWeight:'bolder'}}>{Data2.Product_Name.Stack==0?<><span>Out Of Stack  </span></>:<></>}</span>
                                    </div>
                                    <div className='mt-2'>
                                        <h5>Quantity</h5>
                                        <div className='d-flex flex-row text-center mt-2 mb-2'>
                                            <button className='btn border-primary mr-2' onClick={() => SetCount(count + 1)}><i class="fa-solid fa-plus text-primary p-2"></i></button>
                                            <span className='h4 mt-2'>{count}</span>
                                            <button className='btn border-primary ml-2' onClick={() => { if (count > 1) { SetCount(count - 1) } }}><i class="fa-solid fa-minus text-primary p-2"></i></button>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        {Data2.Product_Name.Description &&<>
                                            <span> Description Of Product</span><br></br>
                                        {Data2.Product_Name.Description}</>}
                                    </div>
                                    <div>
                                        {Data2.Product_Name.Hightlet &&<>
                                            <span>Highelts Of Product</span><br></br>
                                        {Data2.Product_Name.Hightlet}</>}
                                    </div>
                                    <div className='card-bdy' overflowY='auto'>
                                        Ratings
                                        {C_Ratings && C_Ratings.slice().reverse().map((e) => {
                                            return (
                                                <>
                                                    <div className=''>
                                                        <StarRating rating={e.Rating} Custamer_Name={e.Custamer_Name.Custamer_Name} />
                                                        <p style={{fontSize:'13px'}}>{e.Rating_Lable}</p>
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
                                <div key={ind} className=' card col-8  col-md-4 col-xl-2 mr-4 ml-3' style={{ height: '300px', borderRadius: '50px',cursor:'pointer' }}  onClick={() => {
                                        window.location.reload()
                                         navigate("/Dis", { state: { data: e }

                                 }) }}>
                                    <div className='card-body' style={{ height: '150px', marginTop: '-10px' }} >
                                        {/* <img className='shadow' src={e.ImageUrl} alt={e.Product_Name.Product_Name} width={'150px'} height={'150px'}  style={{ borderRadius: '10px' }} /> */}
                                        <ResizedImage  imageUrl={e.ImageUrl} height={150} width={150} />
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
            {OnClick && <div className='col-sm-10 col-md-6 col-lg-3' style={{ height: '100%', position: 'absolute', top: '175px', left: '-20px', overflow: 'hidden' }} >
                {Cat.slice().reverse().map((e, index) => { // Reversing the order of mapped elements
                    return (
                        <div key={index} className='card-footer text-start ml-2' style={{ height: '55px', background: '#2457AA', cursor: 'pointer', transitionDelay: `${index * 0.1}s` }} >
                            <div className='d-flex flex-row'>
                                <i className="fa-solid fa-arrow-right mt-2  mr-3 text-light" style={{ fontSize: '30px' }}></i>
                                <h5 className='mt-2 text-light' onClick={() => { navigate("/Product", { state: { Cat: e } }) }}>{e}</h5>
                            </div>
                        </div>
                    )
                })}
                {/* <Carosels/>  */}
            </div>}
            <div className={`bg-dark ${DSide ? 'dside' : 'ddside'}`} style={{ height: '65vh', position: 'absolute', top: '24%', right: '0px', overflow: 'hidden' }}>
                <DSidebar />
            </div>


        </>
    )
}

export default ProductDisplay
