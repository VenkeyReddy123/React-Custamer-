import React, { useEffect, useRef, useState } from 'react'
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
import parse from 'html-react-parser';
import './PDIsply.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Footer from './Footer.jsx'
import Profile from './Accounts/Profile.jsx'


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
    const [Add, setAdd] = useState(false)
    const [PDRE, SetPDRE] = useState(false)
    const [OStack, SetOStack] = useState(false)
    const [PRRM, SetPRRM] = useState(false)
    const [scrollPosition, setScrollPosition] = useState(0);
    const [step, setStep] = useState(0);
    const containerRef = useRef(null);
    const columnRef = useRef(null);
    const List_urls = []
    const [OProfile, SetOProfile] = useState(false)
    const HandleOpenprofile = () => {
        SetOProfile(false)
    }
    const Callback = () => {
        setOnClick(!OnClick)

    }
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {
            setdata2(d.data)
            const Filter = d.data.filter((d) => {
                return Data2.Product_Name.Category_Name == d.Product_Name.Category_Name
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
        return <span className='text-success'>{stars}<spna className='text-dark'>{Custamer_Name}</spna></span>;
    };
    useEffect(() => {
        const container = containerRef.current;
        const column = columnRef.current;
        if (!container || !column) return;

        const containerWidth = container.offsetWidth;
        const colWidth = column.offsetWidth;

        setStep(colWidth);
    }, [Data3]);

    const handleScroll = (direction) => {
        const container = containerRef.current;
        if (!container) return;

        if (direction === 'right') {
            if (scrollPosition < Data3.length - 1) {
                container.scrollTo({
                    left: container.scrollLeft + step + 50,
                    behavior: 'smooth',
                });
                setScrollPosition(scrollPosition + 1);
            }
        } else if (direction === 'left') {
            if (scrollPosition > 0) {
                container.scrollTo({
                    left: container.scrollLeft - step - 55,
                    behavior: 'smooth',
                });
                setScrollPosition(scrollPosition - 1);
            }
        }
    };
    const [data2, setdata2] = useState([])
    const [Sug, setSug] = useState([])
    const [DataList, SetDataLIst] = useState([])
    const [inval, setinval] = useState('')
    useEffect(() => {

        if (data2.length > 0) {
            const List = []
            data2.map((e) => {
                List.unshift(e.Product_Name.Product_Name)
            })
            SetDataLIst(List)

        }
    }, [data2])
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
                <div className='mr-2 p-2 d-flex flex-row  mt-auto mb-auto ml-auto ' onClick={() => { SetOProfile(true) }} style={{ cursor: 'pointer' }}>
                    <i class="fa-regular fa-circle-user mr-2 mt-ua h5 d-none d-md-block "></i>  <small className='d-none d-md-block ' style={{ color: 'gray', fontWeight: 'bold' }}> Profile</small>
                </div>
                <div className=' col-2 p-1 d-block d-md-none  mt-auto mb-auto ml-auto'>
                    <i class="fa-solid fa-ellipsis-vertical" style={{ fontSize: '25px' }}></i>
                </div>

            </div>
            </div>

            <nav style={{ background: '#1F4C94' }} class="navbar navbar-expand-lg navbar-light  mt-2">

                <Navbar Callback={Callback} DisplySidebar={DisplySidebar} />
            </nav>

            <div>
                <div className='d-md-flex d-xl-flex  flex-md-row  flex-xl-row mt-5 ml-2 mr-2 ' style={{ overflowX: 'hidden', overflowY: 'auto', scrollbarWidth: 'none' }}>

                    {data && data.slice(0, 1).map((Data2) => {

                        const reactElements = parse(Data2.Product_Name.Description)


                        let Highlets = null
                        let Specification = null
                        try {
                            Highlets = parse(Data2.Product_Name.Hightlet)
                            Specification = parse(Data2.Product_Name.Specifications)
                        } catch {

                        }
                        const Divide = [];
                        let Fi = [];
                        const HTags = []

                        try {
                            if (Specification[0].type.includes('h')) {
                                Specification.forEach((e, ind) => {

                                    if (e.type.includes('h')) {
                                        HTags.push(e)
                                        if (Fi.length > 0) {
                                            Divide.push(Fi);
                                            Fi = [];
                                        }
                                    } else {
                                        Fi.push(e);
                                    }
                                });

                                if (Fi.length > 0) {
                                    Divide.push(Fi);
                                }

                            } else {
                                Specification.forEach((e, ind) => {
                                    if (e.type.includes('h')) {
                                        if (Fi.length > 0) {
                                            HTags.push(e.props.children.props.children)
                                            Divide.push(Fi);
                                            Fi = [];
                                        }
                                        if (ind === 0) {
                                            Specification.map((e) => {


                                            })
                                        }
                                    }
                                });

                                if (Fi.length > 0) {
                                    Divide.push(Fi);
                                }
                            }



                        } catch {

                        }

                        return (
                            <>
                                <div className='col-12 col-md-5  col-xl-4 d-flex flex-column  card p-2  pCon ' style={{ height: '100%' }} >
                                    <div className=' d-flex flex-row justify-content-arround p-3' >
                                        <div className='col-3 col-sm-2 col-md-3'>
                                            {Data2.List_Urls && Data2.List_Urls.split(" ").slice(0, 5).map((e, ind) => {
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
                                                            <img src="" alt="" srcset={e} width={'100%'} height={'70%'} />
                                                        </div>
                                                    </>
                                                )
                                            })}
                                        </div>
                                        <div className='col-8 mt-3'  >
                                            {Data2.List_Urls ? <><img src={Data2.List_Urls.split(" ")[Ind]} alt={Data2.Product_Name.Product_Name} width={'100%'} height={'100%'} /></> : <>
                                                <img src={Data2.ImageUrl} alt={Data2.Product_Name.Product_Name} width={'100%'} height={'auto'} />
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

                                <div className=' col-md-7 col-lg-8  mt-2 PCon2 ' style={{ marginBottom: '30px', overflowY: 'auto', scrollbarWidth: 'none', height: '100%' }}>
                                    <h6>
                                        <small className='  d-inline-block  text-wrap text-break' style={{ color: 'gray', fontWeight: 'bold' }}>{Data2.Product_Name.Product_Name}</small>
                                        {Data2.Product_Name.Delivary_Charges == 0 ? <>
                                            <p className='text-'><del className='text-dark ml -2 mr-2'><small>No Charges</small></del><small className='text-success'>Free Delivary</small></p>
                                        </> : <>
                                        </>}
                                    </h6>
                                    {Data2.Product_Name.Rating > 0 ? <>
                                        <div>
                                            <div style={{ width: '45px', height: '30px', background: 'green', borderRadius: '5px' }} className='d-flex flex-row shadow-lg p-1 text-center'>
                                                <p className='text-white'><small>{Data2.Product_Name.Rating.slice(0, 3)}</small></p><i style={{ fontSize: '15px' }} class=" ml-auto mt-auto mb-auto fa-regular fa-star text-white"></i>
                                            </div>
                                        </div>
                                    </> : <>

                                        <p><small>No More Revices</small></p>
                                    </>}
                                    <div>
                                        <span className='text-success mr-2'><small>Saving Amount</small><span className='text-success ml-2'><i class="fa-solid fa-indian-rupee-sign mr-2"></i><small>{Math.trunc((Data2.Product_Name.Price * (Data2.Product_Name.Discount / 100)))}</small></span></span>
                                    </div>
                                    <div className='d-flex flex-row align-center'>

                                        <small className='text-dark' style={{ fontSize: '20px' }}><i class="fa-solid fa-indian-rupee-sign mr-2"></i>{Math.trunc(Data2.Product_Name.Price - (Data2.Product_Name.Price * (Data2.Product_Name.Discount / 100)))}</small> <small className='text-dark mt-auto mb-auto ml-3'><del><i class="fa-solid fa-indian-rupee-sign mt-2"></i>{Data2.Product_Name.Price}</del></small ><span className='text-danger ml-2'></span><span className='text-success mt-auto mb-auto'><small>{Data2.Product_Name.Discount}%Off</small></span>
                                    </div>

                                    <div className='d-flex fex-row justify-content-stat'>
                                    </div>
                                    <div className='d-flex flex-row'>
                                        <small className='text-primary'>Special offer ends in </small><span className='text-danger'><Countdown /></span>
                                    </div>
                                    <div className='d-flex flex-column'>
                                        <span className='text-danger' style={{ fontWeight: 'bolder' }}>{Data2.Product_Name.Stack > 0 && Data2.Product_Name.Stack <= 5 ? <><span>OnlyFew Stack Is There</span></> : <></>}</span>
                                        <div>{<><span className='text-danger' style={{ fontWeight: 'bolder' }}>{Data2.Product_Name.Stack == 0 ? <><span>Out Of Stack  </span></> : <></>}</span></>}
                                            {OStack && <><span className='text-danger' style={{ fontWeight: 'bold' }}><small>Out Of Task</small></span></>}</div>
                                    </div>
                                    <div className='mt-2'>
                                        <span style={{ fontWeight: 'bold', color: 'gray' }}>Quantity</span>
                                        <div className='d-flex flex-row text-center mt-2 mb-2'>
                                            <button className='btn border-primary mr-2' onClick={() => {
                                                if (count < Data2.Product_Name.Stack) {
                                                    SetCount(count + 1)

                                                } else {
                                                    SetOStack(true)
                                                }
                                            }

                                            }><i class="fa-solid fa-plus text-primary p-2"></i></button>
                                            <span className='h4 mt-2'>{count}</span>
                                            <button className='btn border-primary ml-2' onClick={() => {
                                                if (count > 1) {
                                                    SetCount(count - 1)
                                                    SetOStack(false)
                                                }
                                            }}><i class="fa-solid fa-minus text-primary p-2"></i></button>
                                        </div>
                                    </div>
                                    {Highlets && <>
                                        <div className='mt-2 ml mb-2 d-flex row justify-content-' style={{}}>
                                            {Data2.Product_Name.Hightlet && <>
                                                <div className='ml-3 '>
                                                    <small style={{ color: 'gray', fontWeight: 'bold' }}>Highlets</small>
                                                </div>
                                                <div className='ml-2'>
                                                    <small><small>{Highlets && Highlets}</small></small>

                                                </div>
                                            </>}
                                        </div>
                                    </>}
                                    <div className='mt-2 mb-2 d-flex flex-column' style={{ border: '2px solid gray' }}>
                                        {Data2.Product_Name.Description && <>
                                            <div className='' style={{ border: '1px solid gray' }}>
                                                <h5 className='p-3'>Product Descrition</h5>
                                            </div>
                                            <div className='d-flex flex-row justify-content-between p-1'>
                                                <small style={{ color: 'gray', fontWeight: 'bolder' }}>descritption</small>


                                                <span><small className=''>{reactElements}</small></span>
                                            </div>
                                        </>}

                                    </div>

                                    <div className='mt-2 card' style={{ border: '2px solidray' }}>
                                        {Data2.Product_Name.Specifications && <>
                                            <div className=''>
                                                <div className='card ' style={{ border: '' }} >
                                                    <h4 className='p-3'>Specifications</h4>
                                                </div>
                                                {Divide.length > 0 ? <>
                                                    {Divide.map((arr, ind) => {
                                                        return (
                                                            <>
                                                                {ind == 0 && !PDRE && <>
                                                                    <div className='card'>
                                                                        <small className='head p-3'>{HTags[ind]}</small>
                                                                        <div className='d-flex flex-column' style={{ position: 'relative' }}>
                                                                            <small className='p-3 '>{arr}</small>
                                                                        </div>
                                                                    </div>
                                                                    <div className='card p-3'>
                                                                        <small className='text-success' style={{ bottom: '0px', right: '10px', fontSize: '20px', cursor: 'pointer' }} onClick={() => { SetPDRE(true) }}>{Divide.length > 1 && ind == 0 && !PDRE && <>Readmore</>}</small>
                                                                    </div>




                                                                </>}
                                                                {PDRE && <>
                                                                    <div className='card'>
                                                                        <small className='head p-3'>{HTags[ind]}</small>
                                                                        <div className='d-flex flex-column' style={{ position: 'relative' }}>
                                                                            <small className='p-3 '>{arr}</small>
                                                                        </div>
                                                                    </div>

                                                                </>}


                                                            </>
                                                        )
                                                    })}
                                                    {PDRE && <>
                                                        <div className='card p-3'>
                                                            <small className='text-success' style={{ bottom: '0px', right: '10px', fontSize: '20px', cursor: 'pointer' }} onClick={() => { SetPDRE(false) }}>{<>Readless</>}</small>
                                                        </div>
                                                    </>}
                                                </> : <></>}


                                            </div>

                                        </>}
                                    </div>
                                    <div className='card p-1' overflowY='auto' >

                                        {C_Ratings && <>
                                            {C_Ratings.length > 0 && <span className='card p-2 h5 mt-1'>Ratings&Riviews</span>}
                                            {C_Ratings.slice().reverse().map((e, ind) => {
                                                return (
                                                    <>
                                                        {(ind <= 10 && !PRRM) && <>
                                                            <div className='card p-3 mt-1'>
                                                                <StarRating rating={e.Rating} Custamer_Name={e.Custamer_Name.Custamer_Name} />
                                                                <p>{e.Rating_Lable}</p>
                                                            </div></>}
                                                        {PRRM && <>
                                                            <div className='card p-3 mt-1'>
                                                                <StarRating rating={e.Rating} Custamer_Name={e.Custamer_Name.Custamer_Name} />
                                                                <p>{e.Rating_Lable}</p>
                                                            </div>
                                                        </>}
                                                    </>
                                                )
                                            })}
                                            {!PRRM && C_Ratings.length > 10 && <>
                                                <div className='card p-3'>
                                                    <span className='text-primary h6' style={{ cursor: 'pointer' }} onClick={() => { SetPRRM(true) }}> Read All {C_Ratings.length} Reviews </span>
                                                </div>
                                            </>}

                                        </>}
                                        {PRRM && <>
                                            <div className='card p-3 '>
                                                <span className='text-primary h6' style={{ cursor: 'pointer' }} onClick={() => { SetPRRM(false) }}> Read less Reviews </span>
                                            </div>
                                        </>}





                                    </div>


                                </div>
                            </>
                        )
                    })}
                </div>

            </div>
            <div className='d-flex flex-column mb-4' style={{ overflowX: 'hidden' }}>

                <div className='col-12 d-flex flex-row justify-content-between'>
                    <h5 className='p-3 text-primary'><i className="fa-solid fa-hashtag p-2 text-warning"></i>Suggest For You</h5>
                    <div className=''>
                        <span className='btn  mr-3' onClick={() => handleScroll('left')} style={{ background: 'lightgray ' }}   ><i class="fa-solid fa-angles-left"></i></span>
                        <span className='btn btn- ml-2' onClick={() => handleScroll('right')} style={{ background: 'lightgray ' }} ><i class="fa-solid fa-angles-right"></i></span>
                    </div>
                </div>
                <div className='d-flex flex-row  col-12 ' id='scroll-container' ref={containerRef} style={{ overflowX: 'auto', scrollbarWidth: 'none' }}>


                    {Data3 && Data3.slice().reverse().slice(0, 10).map((e, ind) => {
                        return (
                            <>
                                <div style={{ width: '50px', background: 'red', visibility: 'hidden' }}>
                                    ffrtsdfgdsfg
                                </div>
                                <div ref={columnRef} className='card col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2  pdis ' style={{ height: '230px', boxShadow: '0px 0px 5px 2px lightgray ' }}>

                                    <LazyLoadImage className='p-3 ml-auto mr-auto zoom-effect' src={e.ImageUrl} onClick={() => { navigate('/Dis', { state: { data: e } }) }} alt="Description of the image" effect="blur" height={'80%'} width={'100%'} style={{ cursor: 'pointer' }} />
                                    <small className='ml-auto mr-auto mt-auto mb-auto'><TruncateWords text={e.Product_Name.Product_Name} maxLength={20} /></small>
                                    <div className='d-flex flex-row ml-auto mr-auto mt-auto mb-auto'>
                                        <small className='text-success'><i class="fa-solid fa-indian-rupee-sign"></i>{Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100)))}</small>
                                        <small className='text- mt-auto mb-auto ml-1'><del><i class="fa-solid fa-indian-rupee-sign "></i>{e.Product_Name.Price}</del></small >
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
            <div className={`bg-light ${DSide ? 'dside' : 'ddside'}`} style={{ height: '100%', position: 'absolute', top: '0px', right: '0px', overflow: 'hidden', background: 'lightgray' }}>
                <DSidebar DisplySidebar={DisplySidebar} Value={DSide} />
            </div>
            {LPop && <><div className='col-12' style={{ position: 'absolute', top: '100px', right: '30px' }}>
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
            {Add && <><div className='col-12' style={{ position: 'absolute', top: '100px', right: '30px' }}>
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
            {OProfile && <>
                <div className='col-10 col-sm-7 col-md-5 col-lg-5 col-xl-3' style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    <Profile HandleOpenprofile={HandleOpenprofile} />
                </div>
            </>}


        </>
    )
}

export default ProductDisplay
