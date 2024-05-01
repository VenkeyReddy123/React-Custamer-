import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import img1 from './Assets/Shop1.jpg'
import img2 from './Assets/Shop3.jpg'
import { useNavigate } from 'react-router-dom';

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


const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;


    const stars = [];
    for (let i = 0; i < fullStars; i++) {
        stars.push(<i key={i} className="fas fa-star"></i>);
    }
    if (hasHalfStar) {
        stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    return <div>{stars}</div>;
};


const ArrivalItems = ({ AddCartFunc }) => {
    const navigate = useNavigate()
    const [isHovered, setIsHovered] = useState(false);
    const [index, setIndex] = useState(null)
    const [Data2, setData2] = useState(null)
    const [LPop, setLPop] = useState(false)
    const [Ind, setInd] = useState(0)
    const [ClickInd, setClickInd] = useState()
    const [scrollPosition, setScrollPosition] = useState(0);
    const [step, setStep] = useState(0);
    const containerRef = useRef(null);
    const columnRef = useRef(null);
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {
            setData2(d.data)


        }).catch((e) => {
            alert('Please Try AGian Later Somthing Eroor')
        })

    }, [])
    useEffect(() => {
        const container = containerRef.current;
        const column = columnRef.current;
        if (!container || !column) return;

        const containerWidth = container.offsetWidth;
        const colWidth = column.offsetWidth;

        setStep(colWidth);
    }, [Data2]);
    const handleScroll = (direction) => {
        const container = containerRef.current;
        if (!container) return;

        if (direction === 'right') {
            if (scrollPosition < Data2.length - 1) {
                container.scrollTo({
                    left: container.scrollLeft + step,
                    behavior: 'smooth',
                });
                setScrollPosition(scrollPosition + 1);
            }
        } else if (direction === 'left') {
            if (scrollPosition > 0) {
                container.scrollTo({
                    left: container.scrollLeft - step,
                    behavior: 'smooth',
                });
                setScrollPosition(scrollPosition - 1);
            }
        }
    };
    const AddCard = (e) => {
        const email = localStorage.getItem('email') ? localStorage.getItem('email') : false
        if (email) {
            const Data = {

                "Custamer_Name": email,
                "Product_Name": e.Product_Name.id
            }
            axios.post("http://127.0.0.1:8000/AddCardDetails/", Data).then((e) => {
                window.location.reload()
            }).catch((e) => {
                AddCartFunc()
            })
            return
        }
        else {
            setLPop(true)
        }
        return

    }
    return (
        <>
            <div style={{ overflow: 'hidden', position: 'relative', }}>
                <div className=' container-fluid d-flex flex-row justify-content-between' style={{ overflow: 'hidden', position: 'relative', }}>
                    <h4>New Arrival Items</h4>
                    <div className='mb-1'>
                    <span className='btn  mr-3' onClick={() => handleScroll('left')} style={{background:'lightgray '}}   ><i class="fa-solid fa-angles-left"></i></span>
                        <span className='btn btn- ml-2' onClick={() => handleScroll('right')} style={{background:'lightgray '}} ><i class="fa-solid fa-angles-right"></i></span>
                    </div>

                </div>
                <div className='container-fluid mb-2' style={{ borderBottom: '2px solid gray' }}>
                    <span className='text-white'></span>
                </div>
                <div id='scroll-container' ref={containerRef} className='col-12 mt-5 container-fluid  d-flex flex-row' style={{ height: '400px', overflowX: 'auto', scrollbarWidth: 'none' }}>
                    {Data2 && Data2.slice().reverse().slice(1, 15).map((e, ind) => {
                        return (
                            <>
                                <div ref={columnRef} className='bg-white col-sm-6 col-md-3 text-center' onMouseEnter={() => {
                                    setIndex(ind)
                                }} onMouseLeave={() => {
                                    setIsHovered(!isHovered)
                                    setIndex(null)
                                }} style={{ borderRight: '2px solid black' }} >
                                    <div className='p-5' style={{ height: '250px', overflow: 'hidden' }}>
                                        <img onClick={() => { navigate('/Dis', { state: { data: e } }) }} style={{ cursor: 'pointer' }} src={e.ImageUrl} alt="" height={'100%'} />
                                       

                                    </div>
                                    <div className='' style={{ height: '150px' }}>
                                        {e.Product_Name.Rating > 0 ? <>
                                            <div className='col-12 d-flex flex-row justify-content-center mb-2'>
                                                <div style={{ width: '70px', height: '30px', background: 'green', borderRadius: '5px' }} className='d-flex flex-row shadow-lg p-1 text-center'>
                                                    <p className='text-white'>{e.Product_Name.Rating}</p><i style={{ fontSize: '20px' }} class=" ml-auto fa-regular fa-star text-white"></i>
                                                </div>
                                            </div>
                                        </> : <>
                                        </>}
                                        <span style={{ textAlign: 'start' }}><TruncateWords text={e.Product_Name.Product_Name} maxLength={30} /></span><br></br>
                                        <span className='text-success'><i class="fa-solid fa-indian-rupee-sign mr-2"></i>{Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100)))}</span> <span className='text-dark mt-auto mb-auto ml-3'><del><i class="fa-solid fa-indian-rupee-sign mt-2"></i>{e.Product_Name.Price}</del></span ><span className='text-danger ml-2'></span><span className='text-success mt-auto mb-auto'>{e.Product_Name.Discount}%Off</span>
                                        {index === ind ? (<>
                                            <div className='d-flex flex-row justify-content-center  col-12 '>
                                                <div className='p-1 btn  mr-auto ml-auto  ' style={{background:'lightgray'}}>
                                                    <i onClick={() => { AddCard(e) }} style={{ fontSize: '25px' }} class="fa-solid fa-cart-shopping  text-w "></i>
                                                </div>
                                                <div className='p-1 btn  mr-auto ml-auto  ' style={{background:'lightgray'}}>
                                                    <i onClick={() => { navigate('/Dis', { state: { data: e } }) }} style={{ fontSize: '25px' }} class="fa-solid fa-eye  text-dark"></i>
                                                </div>
                                            </div>
                                        </>) : (<></>)}
                                    </div>

                                </div>
                            </>
                        )
                    })}
                </div>
                <div className='container-fluid mt-5'>
                    {/* <h4>Deal Of The Day</h4> */}
                    {/* <div style={{ borderBottom: '3px solid lightgray' }}>
                        <span className='text-white'>j</span>
                    </div> */}
                    <div className='d-sm-flex mt-5 flex-sm-column d-md-flex flex-md-row' style={{ border: '2px solid black' }}>
                        <div className=' col-sm-12 mt-3  col-md-3 d-flex flex-row p-3 mb-2 ' style={{ borderRight: '2px solid blue' }}>
                            <div>
                                <i style={{ fontSize: '30px' }} class="fa-solid fa-truck-fast p-2 mr-3"></i>
                            </div>
                            <div className='d-flex flex-column'>
                                <h6>Free Ship WorldWide</h6>
                                <span>Above 20 Items</span>
                            </div>
                        </div>
                        <div className=' col-sm-12  col-md-3  d-flex flex-row  p-3 mb-2 mt-3  ' style={{ borderRight: '2px solid blue' }}>
                            <div className=''>
                                <i style={{ fontSize: '30px' }} class="fa-solid fa-sack-dollar p-2 mr-3"></i>
                            </div>
                            <div className='d-flex flex-column '>
                                <h6>Save 20% When You</h6>
                                <span>Take Membership</span>
                            </div>

                        </div>
                        <div className=' col-sm-12  col-md-3  d-flex flex-row  p-3 mb-2 mt-3  ' style={{ borderRight: '2px solid blue' }}>
                            <div className=''>
                                <i style={{ fontSize: '30px' }} class="fa-solid fa-headset p-2 mr-3"></i>
                            </div>
                            <div className='d-flex flex-column '>
                                <h6>24/7 Customer Care  </h6>
                                <span>Best Support</span>
                            </div>

                        </div>
                        <div className=' col-sm-12  col-md-3  d-flex flex-row  p-3 mb-2 mt-3  ' >
                            <div className=''>
                                <i style={{ fontSize: '30px' }} class="fa-solid fa-piggy-bank p-2 mr-3 "></i>
                            </div>
                            <div className='d-flex flex-column '>
                                <h6>Money Back Guarantee </h6>
                                <span>If you are unable</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='container mt-5 d-sm-flex flex-sm-column d-md-flex flex-md-row'>
                    <div className='col-sm-12 col-md-8 col-lg-8 mt-2' style={{ height: '250px', overflow: 'hidden', position: 'relative' }}>
                        <img className='col-12' src={img1} alt="" height={'100%'} />
                        <div className='d-flex flex-column' style={{ position: 'absolute', top: '20%', left: '15%' }}>
                            <h4 className='text-danger'>Month End Offers</h4>
                            <span className='text-primary h6'>T-Shirts,Jeans,Shirts,Formal Weras $<br></br>All Other Latest Items</span>
                            <button className='btn btn-warning' onClick={() => { navigate('/Product') }} >ShopNow</button>
                        </div>
                    </div>
                    <div className='col-sm-12 col-md-4 col-lg-4 mt-2' style={{ height: '250px', overflow: 'hidden', position: 'relative' }}>
                        <img className='col-12' src={img2} alt="" height={'100%'} width={"100%"} />
                        <div className='d-flex flex-column' style={{ position: 'absolute', top: '20%', left: '10%' }}>
                            <h4 className='text-primary'>Great Deals</h4>
                            <span className='text-light h6'>EarPhones,Speakers,Laptops<br></br>Console & More</span>
                            <button className=' col-9 btn btn-success' onClick={() => { navigate('/Product') }}>ShopNow</button>
                        </div>
                    </div>

                </div> */}
                {LPop && <>
                    <div className='d-flex flex-row justify-content-end bg-danger p-2 ' style={{ position: 'absolute', top: '20%', right: '20px', borderRadius: '10px' }}>

                        <small className='mr-3 text-light'>Please Login</small>

                        <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                            setLPop(false)
                        }} style={{ fontSize: '20px', borderRadius: '20px' }}></i>


                    </div>
                </>}
            </div>

        </>
    )
}

export default ArrivalItems