import React, { useEffect, useState } from 'react'
import { Mobile_Data } from './Data/Mobile_Data'
import { useLocation, useNavigate } from 'react-router-dom'
import './Product_Filter.css'
import { Catigories } from './Data.jsx'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';



import './Filter.css'
import axios from 'axios'
import Filter from './Filter'
import Navbar from './HomeComponents/Navbar'
import DSidebar from './DSidebar'
import Nav2 from './Nav2'
import ResizedImage from './HomeComponents/ResizedImage'
import FilterSideBar from './FilterSideBar'
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

        return <span>{truncatedText}</span>;
    }
}

const Product_Filters = () => {
    const Cat = ['Electronics', 'Fashion', 'Home&Garden', 'Health&Beauty', 'Books&Media', 'Sports&OutDors', 'Toys&Games', 'Automotive', 'Jewelry&Accessories']
    const [DSide, setDSide] = useState(false)

    const Location = useLocation()
    const val = Location.state ? true : false
    const navigate = useNavigate()
    const [OnClick, setOnClick] = useState(false);
    const [Data2, setData2] = useState()
    const [Refresh, SetRefresh] = useState([])
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {
            setdata(d.data)
            if (val) {
                const val2 = Location.state.Filter ? true : false
                if (val2) {
                    setData2(Location.state.Filter)
                    console.log(Location.state.Filter)
                } else {
                    const word = Location.state.Cat.slice(0, 4).toLowerCase();
                    const FilterData = d.data.filter((e) => {
                        return e.Product_Name.Product_Name.toLowerCase().includes(word.toLowerCase()) ||
                            e.Product_Name.Category.toLowerCase().includes(word.toLowerCase()) ||
                            e.Product_Name.Category_Name.toLowerCase().includes(word.toLowerCase())
                    });
                    setData2(FilterData);
                    SetRefresh(FilterData)
                }
            } else {
                setData2(d.data);
            }

        }).catch((e) => {

        })

    }, [])

    const HandleClick = () => {


        setOnClick(!OnClick)
    }

    const [OnClick2, setOnClick2] = useState(false);
    const Callback = () => {
        setOnClick2(!OnClick2)


    }


    const DisplySidebar = () => {
        setDSide(!DSide)
    }
    const FilterData = (dataFiltered) => {

        setData2(dataFiltered)

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
    const [OProfile, SetOProfile] = useState(false)
    const HandleOpenprofile = () => {
        SetOProfile(false)
    }


    return (

        <> <div className=''  >
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
            <div style={{ width: '100%', overflowX: 'hidden' }} >
                <Nav2 />
            </div>

            <nav style={{ background: '#1F4C94' }} class="navbar navbar-expand-lg navbar-light  mt-2">

                <Navbar Callback={Callback} DisplySidebar={DisplySidebar} />
            </nav>
            {/*  */}
            <div className=' bg-primary d-block d-md-none ' style={{ cursor: 'pointer', }} >
                <h6 style={{ fontSize: '25px' }} onClick={() => {
                    setOnClick(true)
                }}><i class="fa-solid fa-filter" style={{ fontSize: '25px' }}></i>Filter</h6>
            </div>

            <div className='d-flex flex-row' style={{ height: '100vh', background: '#F5F7FA', overflowX: 'hidden' }}>

                <div className='d-none d-md-block' style={{ width: '300px', height: '100vh', overflowY: 'auto', scrollbarWidth: 'none' }}>
                    <FilterSideBar FilterData={FilterData} />
                </div>

                <div className=' col-12 col-md-9 ml-1 mt-2' style={{ overflowY: 'auto', overflowX: 'hidden', position: 'relative', scrollbarWidth: 'none', }}>
                    <div className='row' style={{ width: '100%', overflowX: 'hidden' }}>
                        {Data2 && Data2.slice().reverse().map((e) => {

                            return (
                                <div key={e.id} className='model ml-auto mr-auto  mt-2 p-3 ' style={{ display: 'flex', flexWrap: 'wrap', boxShadow: '0px 4px 8px black', overflow: 'hidden' }}>
                                    <div className=" ml-1 cont" style={{ display: 'flex', flexDirection: 'column', background: '#F5F7FA', width: '100%' }}>
                                        <LazyLoadImage className='ml-2 p-3 img' src={e.ImageUrl} alt="Description of the image" effect="blur" style={{ boxShadow: '2px 3px 60px 0px lightgray' }} />
                                    </div>
                                    <div className="d-flex flex-column mt-auto mb-auto  " style={{ cursor: 'pointer' }}>
                                        <h6 onClick={() => { navigate('/Dis', { state: { data: e } }) }} className='text-primary'><TruncateWords text={e.Product_Name.Product_Name} maxLength={20} /></h6>
                                        <span className='text-success'><i className="fa-solid fa-indian-rupee-sign mr-2"></i>{Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100)))}</span>
                                    </div>
                                    <div className="" style={{ height: '', width: '100%', cursor: 'pointer' }}>
                                        <span className='btn btn-primary col-12' style={{ width: '100%' }} onClick={() => { navigate('/Dis', { state: { data: e } }) }} >Buy Now<i className="fa-solid fa-cart-plus ml-2"></i></span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
                {OnClick && <div style={{ position: 'absolute', top: '10px', width: '100%', background: 'white' }}>
                    <div>
                        <Filter FilterData={FilterData} HandleClick={HandleClick} Data2={Data2} />
                    </div>
                </div>}
            </div>
            {OnClick2 && <div className='col-sm-11 col-md-6 col-lg-4' style={{ background: '#2457AA', position: 'absolute', top: '10px', left: '-20px', overflow: 'hidden' }} >
                <div className='col-12 d-flex flex-row justify-content-end mt-1  mb-2'>
                    <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {

                        setOnClick2(false)
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
            <div className={`bg-light ${DSide ? 'dside' : 'ddside'}`} style={{ height: '100%', position: 'absolute', top: '0px', right: '0px', overflow: 'hidden', background: 'gray' }}>
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
            {OProfile && <>
                <div className='col-10 col-sm-7 col-md-5 col-lg-5 col-xl-3' style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    <Profile HandleOpenprofile={HandleOpenprofile} />
                </div>
            </>}



        </>
    )
}

export default Product_Filters







