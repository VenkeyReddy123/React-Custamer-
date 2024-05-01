import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import parse from 'html-react-parser';
import '../PDIsply.css'
import '../Dsidebar.css'
import Navbar from './Navbar';
import { Catigories } from '../Data.jsx'
import Category from './Category.jsx'
import { keyboard } from '@testing-library/user-event/dist/keyboard/index.js';
import ResizedImage from './ResizedImage.jsx';
import Footer from '../Footer.jsx';
import Profile from '../Accounts/Profile.jsx';
import DSidebar from '../DSidebar.jsx';
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
const ProductsListDisply = () => {
    const [OnClick, setOnClick] = useState(false);
    const [DSide, setDSide] = useState(false)
    const Location = useLocation()
    const navigate = useNavigate()
    const [Data, SetData] = useState()
    const [Brand, SetBrand] = useState([])
    const [angel, setangel] = useState(false)
    const [angel2, setangel2] = useState(false)
    const [angel3, setangel3] = useState(false)
    const [angel4, setangel4] = useState(false)
    const [MinRange, SetMinRange] = useState(0)
    const [MaxRange, SetMaxRanger] = useState(0)
    const [CatNameData, SetCatData] = useState([])
    const [Discount, SetDisCount] = useState([])
    const [LowPrice, SetLowPrice] = useState(0)
    const [MaxPrice, SetMaxPrice] = useState(0)
    const [Ratings, SetRatings] = useState([])
    const [MiddelPrice, SetMiddelPrice] = useState(0)
    const [PriceFilter, SetPriceFilters] = useState([])
    const [ALlArray, SetAllArray] = useState([])
    const [DisCountFilter, setDisCountFilter] = useState([])
    let [RatingFilter, SetRatingFilter] = useState([])
    const [Lp, setLp] = useState(0)
    const [Hp, setHp] = useState(0)
    const [BarndList, setBrandList] = useState([])
    const [ShowFilter, SetShowFilter] = useState(false)
    
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {
            setdata(d.data)
            const Cat_Name = Location.state.Cat_Name
            const Filter = d.data.filter((e) => {
                return e.Product_Name.Category_Name.toLocaleLowerCase().includes(Cat_Name.toLocaleLowerCase())
            })
            let Discount = []
            let Prices = []
            let Rating = []
            Filter.map((e) => {
                Discount.push(e.Product_Name.Discount)
                Prices.push(Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))))
                Rating.push(e.Product_Name.Rating)
                return e
            })
            SetAllArray(Filter)
            SetDisCount([...new Set(Discount)].sort((a, b) => b - a))
            SetLowPrice(Math.min(...Prices))
            setLp(Math.min(...Prices) + 1)
            SetMaxPrice(Math.max(...Prices))
            setHp(Math.trunc(Math.max(...Prices) / 2) + 1)
            SetMinRange(Math.min(...Prices))
            SetMaxRanger(Math.max(...Prices))
            SetMiddelPrice(Math.trunc(Math.max(...Prices) / 2))
            const PriceFilters = []
            PriceFilters.unshift(Math.min(...Prices))
            PriceFilters.push(Math.max(...Prices))
            SetPriceFilters(PriceFilters)
            SetData(Filter)
            const Data = Location.state.Cat
            SetCatData(Data)
            let Brands = []
            Filter.map((e) => {
                if (e.Product_Name.Brand) {
                    Brands.push(e.Product_Name.Brand.toLocaleLowerCase())
                }
            })
            const uniqueBrands = [...new Set(Brands)];
            SetBrand(uniqueBrands);
            const Filter2 = Rating.filter((e) => {
                if (e >= 3) {
                    return Math.trunc(e)
                }
            })
            SetRatings([...new Set(Filter2)].sort((a, b) => b - a))
        })

    }, [])
    const Callback = () => {
        setOnClick(!OnClick)

    }
    const DisplySidebar = () => {

        setDSide(!DSide)
    }
    const [Hand, setHan] = useState(false)
    const [CatData, setCatData] = useState([])
    const HandleOverCat = (Data) => {
        setCatData(Data)
        setHan(true)
    }
    const HandleRemove = () => {
        setCatData([])
        setHan(false)
    }
    const HandlingFilter = () => {
        let DFil = []
        if (DisCountFilter.length > 0) {
            const Low = Math.min(...DisCountFilter)
            const Filter = ALlArray.filter((e) => {
                return e.Product_Name.Discount >= Low
            })
            DFil.unshift(...Filter)
        }
        let PFil = []
        if (Lp < MinRange || Hp < MiddelPrice) {
            const Filter = ALlArray.filter((e) => {
                const DisPrice = Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100)))
                if (DisPrice >= MinRange && DisPrice <= MaxRange) {
                    return e
                }
            })
            PFil.unshift(...Filter)
        }
        let RFil = []
        if (RatingFilter.length > 0) {
            const LowRating = Math.min(...RatingFilter)
            const Filter = ALlArray.filter((e) => {
                if (e.Product_Name.Rating >= LowRating) {
                    return e
                }
            })
            RFil.unshift(...Filter)
        }
        let BFil = []
        if (BarndList.length > 0) {

            BarndList.map((br) => {
                const Filter = ALlArray.filter((e) => {
                    if (e.Product_Name.Brand) {
                        if (e.Product_Name.Brand.toUpperCase().includes(br.toUpperCase())) {
                            BFil.unshift(e)
                        }
                    }
                })

            })
        }
        if (PFil.length > 0 || DFil.length > 0 || RFil.length > 0 || BFil.length > 0) {
            SetData([...new Set([...PFil, ...DFil, ...RFil, ...BFil])])
        }
    }
    useEffect(() => {
        HandlingFilter()
    }, [DisCountFilter])
    useEffect(() => {
        HandlingFilter()
    }, [MinRange])
    useEffect(() => {
        HandlingFilter()
    }, [MaxRange])
    useEffect(() => {
        HandlingFilter()
    }, [RatingFilter])
    useEffect(() => {
        HandlingFilter()
    }, [BarndList])
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
    const [OProfile, SetOProfile] = useState(false)
    const HandleOpenprofile = () => {
        SetOProfile(false)
    }
    return (

        <>

            <div className='' onMouseEnter={HandleRemove}  >
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

            <nav onMouseEnter={HandleRemove} style={{ background: '#1F4C94', overflow: 'hidden' }} class="navbar navbar-expand-lg navbar-light  mt-2">

                <Navbar Callback={Callback} DisplySidebar={DisplySidebar} />
            </nav>
            <nav style={{ background: 'white', }} class="navbar navbar-expand-lg navbar-light  mt-2">

                <Category HandleOverCat={HandleOverCat} HandleRemove={HandleRemove} />
            </nav>
            <div className='d-block d-md-none col-12 ' >
                <span className=' bg-dangser p-1 text1 text-light ml-3' onClick={() => {

                    SetShowFilter(true)
                }} style={{ background: 'lightgray', borderRadius: '10px', cursor: 'pointer' }} >filter <i class="fa-solid fa-filter mt-auto mb-auto ml-2"></i> </span>
            </div>
            <div className=' d-flex flex-row' style={{ height: '100%' }} onMouseDownCapture={() => {

            }}>
                <div className='d-none d-md-block col-md-3 mt-1'  style={{ background: '#F5F7FA' }} >
                    <span className='card p-2 mt-1'>Filter</span>

                    <div className='col-12 justify-content-center card' onMouseEnter={HandleRemove} >
                        <div className='d-flex flex-column'>
                            <small><small>{angel2 ? <i class="fa-solid fa-angle-left" style={{ cursor: 'pointer' }} onClick={() => {
                                setangel2(false)
                            }}></i> : <i class="fa-solid fa-angle-down" style={{ cursor: 'pointer' }} onClick={() => {
                                setangel2(true)
                            }}></i>}</small>Categorie Names</small>
                            {!angel2 && <>
                                <div className='d-flex flex-column ml-2'>
                                    {CatNameData && CatNameData.map((e) => {
                                        return (
                                            <>
                                                <small onClick={() => {
                                                    window.location.reload()
                                                    navigate("/List", { state: { Cat_Name: e.slice(0, 5), Cat: CatNameData } })
                                                }} className='CatName' style={{ cursor: 'pointer' }}><small>{e}</small></small>
                                            </>
                                        )
                                    })}
                                </div>
                            </>}
                        </div>
                        <small>{angel ? <i class="fa-solid fa-angle-left" style={{ cursor: 'pointer' }} onClick={() => {
                            setangel(false)
                        }}></i> : <i class="fa-solid fa-angle-down" style={{ cursor: 'pointer' }} onClick={() => {
                            setangel(true)
                        }}></i>}Brands</small>
                        {!angel && <>
                            <div className='col-12 d-flex flex-column'>
                                {Brand && Brand.map((e) => {
                                    return (
                                        <>
                                            <div className='d-flex flex-row'>
                                                <input type="checkbox" name="" id="" onChange={((e) => {
                                                    if (e.target.checked) {
                                                        const filter = [e.target.value, ...BarndList]
                                                        setBrandList(filter)
                                                    } else {
                                                        const filter = BarndList.filter((e1) => {
                                                            return e1 != e.target.value
                                                        })
                                                        setBrandList(filter)
                                                    }
                                                })} value={e} className='mr-2' /><small>{e.slice(0, 1).toUpperCase() + e.slice(1, e.length)}</small>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </>}

                        <small className='mt-2'>Price Ranges</small>
                        <form className='col-12'>

                            <div>
                                <input type="range" name='rr' className='col-6' min={LowPrice} onChange={(e) => {
                                    SetMinRange(e.target.value)


                                }} max={MiddelPrice} />
                                <input type="range" name='rr' className='col-6' min={MiddelPrice} onChange={(e) => {
                                    SetMaxRanger(e.target.value)


                                }} max={MaxPrice + 100} />
                            </div>
                            <div className='d-flex flex-row justify-content-around mb-2' >
                                <small className='card col-6 d-flex flex-row'><i class="fa-solid fa-indian-rupee-sign mt-1 mr-1"></i><small>{MinRange}</small></small>
                                <small className='card col-6 d-flex flex-row'><i class="fa-solid fa-indian-rupee-sign mt-1 mr-1 "></i><small>{MaxRange && MiddelPrice}</small></small>
                            </div>
                            <div className='d-flex flex-row justify-content-around mb-2' >
                                <small className='card col-6 d-flex flex-row'><small>min</small></small>
                                <small className='card col-6 d-flex flex-row'><small>max</small></small>
                            </div>
                        </form>

                        <small>{angel3 ? <i class="fa-solid fa-angle-left" style={{ cursor: 'pointer' }} onClick={() => {
                            setangel3(false)
                        }}></i> : <i class="fa-solid fa-angle-down" style={{ cursor: 'pointer' }} onClick={() => {
                            setangel3(true)
                        }}></i>}Discount</small>
                        {!angel3 && <>
                            <div className='d-flex flex-column ml-3'>
                                {Discount && Discount.map((e) => {
                                    return (
                                        <>
                                            <div className='d-flex flex-row mt-2'>
                                                <input type="checkbox" onChange={async (e) => {
                                                    const selectedDiscount = e.target.value;
                                                    if (e.target.checked) {

                                                        setDisCountFilter([...DisCountFilter, selectedDiscount]);
                                                    } else {

                                                        setDisCountFilter(DisCountFilter.filter(discount => discount !== selectedDiscount));
                                                    }
                                                }} className='mr-3' name='rr' id="" value={e} /> <small>{e}% or more</small>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </>}
                        {Ratings.length > 0 && <>
                            <small>{angel4 ? <i class="fa-solid fa-angle-left" style={{ cursor: 'pointer' }} onClick={() => {
                                setangel4(false)
                            }}></i> : <i class="fa-solid fa-angle-down" style={{ cursor: 'pointer' }} onClick={() => {
                                setangel4(true)
                            }}></i>}Customer Ratings</small>
                            {!angel4 && <>
                                {Ratings.map((e) => {
                                    return (
                                        <>
                                            <div className='d-flex flex-row mt-2 ml-3'>
                                                <input onChange={(e) => {
                                                    const selectedDiscount = e.target.value;
                                                    if (e.target.checked) {

                                                        SetRatingFilter([...RatingFilter, selectedDiscount]);
                                                    } else {

                                                        SetRatingFilter(RatingFilter.filter(discount => discount !== selectedDiscount));
                                                    }
                                                }} type="checkbox" className='mr-3' name='rr' id="" value={e} /> <small>{e} <i class="fa-solid fa-star"></i> {!e == 5 && <>More</>}</small>
                                            </div>
                                        </>
                                    )
                                })}
                            </>}
                        </>}
                    </div>
                </div>
                <div className='col-md-9 row' onMouseEnter={() => {
                    if (Data.length == 0 || Data.length == 1) {
                        HandleRemove()
                    }
                }}>
                    {Data && Data.slice().reverse().map((e, ind) => {
                        let Highlet = null
                        let SmallHighlet = null
                        try {
                            Highlet = parse(e.Product_Name.Hightlet)

                        } catch {

                        }
                        return (
                            <>
                                <div className=' d-flex flex-row p-2 card image-container  ' onMouseEnter={() => {
                                    if (ind > 0) {
                                        HandleRemove()
                                    }

                                }}>
                                    <div className='col-4 col-md-3 p-2' style={{ height: '250px' }} >
                                        {/* <img  className='' style={{ cursor: 'pointer',maxHeight:'250px',maxHeight:'100%',objectFit:'cover' }} onClick={() => { navigate('/Dis', { state: { data: e } }) }} alt="" srcset={e.ImageUrl} width={'100%'} height={'100%'}   /> */}
                                        <ResizedImage imageUrl={e.ImageUrl} widthPercentage={'90'} heightPercentage={'100'} />
                                    </div>
                                    <div className='col-4 col-md-5'>
                                        <div className='mt-2 mb-2'>
                                            <small className='mb-2 PName d-none d-md-block' style={{ cursor: 'pointer' }} onClick={() => { navigate('/Dis', { state: { data: e } }) }}>{e.Product_Name.Product_Name}</small>
                                            <span className='mb-2 PName d-block d-md-none' style={{ cursor: 'pointer' }} onClick={() => { navigate('/Dis', { state: { data: e } }) }}><TruncateWords text={e.Product_Name.Product_Name} maxLength={20} /></span>
                                            {e.Product_Name.Rating > 0 &&
                                                <div className='mt-2'>
                                                    <div style={{ width: '50px', height: '30px', background: 'green', borderRadius: '5px' }} className='d-flex flex-row shadow-lg p-1 text-center'>
                                                        <small className='text-white'>{e.Product_Name.Rating.slice(0, 3)}</small><i style={{ fontSize: '15px' }} class=" ml-1 fa-regular fa-star text-white mt-auto mb-auto"></i>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        <small className='d-none d-md-block'><small>{Highlet}</small></small>
                                        <small className='d-block d-md-none limited-lines '><small>{Highlet}</small></small>
                                    </div>
                                    <small className='col-6 col-md-3 p-3 '>
                                        <small style={{ fontSize: '15px', color: 'black', fontWeight: 'bold' }}>
                                            <i class="fa-solid fa-indian-rupee-sign mr-2"></i>{Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100)))}</small><br></br>
                                        <small style={{ color: 'gray' }} className=' mt-auto mb-auto'><del><i class="fa-solid fa-indian-rupee-sign mt-2"></i>{e.Product_Name.Price}</del></small >
                                        <small className='text-danger ml-1'></small><small className='text-success mt-auto mb-auto'>{e.Product_Name.Discount}%Off</small><br></br>
                                        <small>{e.Product_Name.Delivary_Charges == 0 && <>Free Delivery</>}</small>
                                    </small>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
            <div className={`bg-light ${DSide ? 'dside' : 'ddside'}`} style={{ height: '100%', position: 'absolute', top: '0px', right: '0px', overflow: 'hidden' }}>
                <DSidebar DisplySidebar={DisplySidebar} Value={DSide} />
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
            {Hand && CatData && <>
                <div className='p-5 shadow' style={{ position: 'absolute', top: '160px', background: 'white', marginLeft: '20px' }}>
                    {CatData.map((e) => {

                        return (
                            <>
                                <li onClick={() => {
                                    window.location.reload()
                                    navigate("/List", { state: { Cat_Name: e.slice(0, 5), Cat: CatNameData } })
                                }} style={{ cursor: 'pointer' }} className='p-2 Cat'>{e}</li>
                            </>
                        )
                    })}
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
            {ShowFilter && <>
                <div className='col-11 col-sm-8 card p-2 ' style={{ position: 'absolute', top: '100px', left: '0px', }}>
                    <i class="fa-regular fa-circle-xmark ml-auto bg-danger text-light " onClick={() => {
                        SetShowFilter(false)
                    }} style={{ fontSize: '20px', borderRadius: '15px', cursor: 'pointer' }}></i>
                    <div className='col-md-3 mt-1' style={{}} >
                        <span className='card p-2 mt-1'>Filter</span>

                        <div className='col-12 justify-content-center card' >
                            <div className='d-flex flex-column'>
                                <small><small>{angel2 ? <i class="fa-solid fa-angle-left" style={{ cursor: 'pointer' }} onClick={() => {
                                    setangel2(false)
                                }}></i> : <i class="fa-solid fa-angle-down" style={{ cursor: 'pointer' }} onClick={() => {
                                    setangel2(true)
                                }}></i>}</small>Categorie Names</small>
                                {!angel2 && <>
                                    <div className='d-flex flex-column ml-2'>
                                        {CatNameData && CatNameData.map((e) => {
                                            return (
                                                <>
                                                    <small onClick={() => {
                                                        window.location.reload()
                                                        navigate("/List", { state: { Cat_Name: e.slice(0, 5), Cat: CatNameData } })
                                                    }} className='CatName' style={{ cursor: 'pointer' }}><small>{e}</small></small>
                                                </>
                                            )
                                        })}
                                    </div>
                                </>}
                            </div>
                            <small>{angel ? <i class="fa-solid fa-angle-left" style={{ cursor: 'pointer' }} onClick={() => {
                                setangel(false)
                            }}></i> : <i class="fa-solid fa-angle-down" style={{ cursor: 'pointer' }} onClick={() => {
                                setangel(true)
                            }}></i>}Brands</small>
                            {!angel && <>
                                <div className='col-12 d-flex flex-column'>
                                    {Brand && Brand.map((e) => {
                                        return (
                                            <>
                                                <div className='d-flex flex-row'>
                                                    <input type="checkbox" name="" id="" onChange={((e) => {
                                                        if (e.target.checked) {
                                                            const filter = [e.target.value, ...BarndList]
                                                            setBrandList(filter)
                                                        } else {
                                                            const filter = BarndList.filter((e1) => {
                                                                return e1 != e.target.value
                                                            })
                                                            setBrandList(filter)
                                                        }
                                                    })} value={e} className='mr-2' /><small>{e.slice(0, 1).toUpperCase() + e.slice(1, e.length)}</small>
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>
                            </>}

                            <small className='mt-2'>Price Ranges</small>
                            <form className='col-12'>

                                <div>
                                    <input type="range" name='rr' className='col-6' min={LowPrice} onChange={(e) => {
                                        SetMinRange(e.target.value)


                                    }} max={MiddelPrice} />
                                    <input type="range" name='rr' className='col-6' min={MiddelPrice} onChange={(e) => {
                                        SetMaxRanger(e.target.value)


                                    }} max={MaxPrice + 100} />
                                </div>
                                <div className='d-flex flex-row justify-content-around mb-2' >
                                    <small className='card col-6 d-flex flex-row'><i class="fa-solid fa-indian-rupee-sign mt-1 mr-1"></i><small>{MinRange}</small></small>
                                    <small className='card col-6 d-flex flex-row'><i class="fa-solid fa-indian-rupee-sign mt-1 mr-1 "></i><small>{MaxRange && MiddelPrice}</small></small>
                                </div>
                                <div className='d-flex flex-row justify-content-around mb-2' >
                                    <small className='card col-6 d-flex flex-row'><small>min</small></small>
                                    <small className='card col-6 d-flex flex-row'><small>max</small></small>
                                </div>
                            </form>

                            <small>{angel3 ? <i class="fa-solid fa-angle-left" style={{ cursor: 'pointer' }} onClick={() => {
                                setangel3(false)
                            }}></i> : <i class="fa-solid fa-angle-down" style={{ cursor: 'pointer' }} onClick={() => {
                                setangel3(true)
                            }}></i>}Discount</small>
                            {!angel3 && <>
                                <div className='d-flex flex-column ml-3'>
                                    {Discount && Discount.map((e) => {
                                        return (
                                            <>
                                                <div className='d-flex flex-row mt-2'>
                                                    <input type="checkbox" onChange={async (e) => {
                                                        const selectedDiscount = e.target.value;
                                                        if (e.target.checked) {

                                                            setDisCountFilter([...DisCountFilter, selectedDiscount]);
                                                        } else {

                                                            setDisCountFilter(DisCountFilter.filter(discount => discount !== selectedDiscount));
                                                        }
                                                    }} className='mr-3' name='rr' id="" value={e} /> <small>{e}% or more</small>
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>
                            </>}
                            {Ratings.length > 0 && <>
                                <small>{angel4 ? <i class="fa-solid fa-angle-left" style={{ cursor: 'pointer' }} onClick={() => {
                                    setangel4(false)
                                }}></i> : <i class="fa-solid fa-angle-down" style={{ cursor: 'pointer' }} onClick={() => {
                                    setangel4(true)
                                }}></i>}Customer Ratings</small>
                                {!angel4 && <>
                                    {Ratings.map((e) => {
                                        return (
                                            <>
                                                <div className='d-flex flex-row mt-2 ml-3'>
                                                    <input onChange={(e) => {
                                                        const selectedDiscount = e.target.value;
                                                        if (e.target.checked) {

                                                            SetRatingFilter([...RatingFilter, selectedDiscount]);
                                                        } else {

                                                            SetRatingFilter(RatingFilter.filter(discount => discount !== selectedDiscount));
                                                        }
                                                    }} type="checkbox" className='mr-3' name='rr' id="" value={e} /> <small>{e} <i class="fa-solid fa-star"></i> {!e == 5 && <>More</>}</small>
                                                </div>
                                            </>
                                        )
                                    })}
                                </>}
                            </>}
                        </div>
                    </div>
                </div>
            </>}
        </>
    )
}

export default ProductsListDisply