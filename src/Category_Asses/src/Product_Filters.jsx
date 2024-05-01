import React, { useEffect, useState } from 'react'
import { Mobile_Data } from './Data/Mobile_Data'
import { useLocation, useNavigate } from 'react-router-dom'
import './Product_Filter.css'
import { Catigories } from './Data.jsx'



import './Filter.css'
import axios from 'axios'
import Filter from './Filter'
import Navbar from './HomeComponents/Navbar'
import DSidebar from './DSidebar'
import Nav2 from './Nav2'
import ResizedImage from './HomeComponents/ResizedImage'
import FilterSideBar from './FilterSideBar'
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
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {
            if (val) {
                const val2 = Location.state.Filter? true : false
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
                }
            } else {
                setData2(d.data);
            }

        }).catch((e) => {
            // alert('Please Try AGian Later Somthing Eroor')
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
    const HandleFilters = (Values, Range, Func) => {
        axios.get("http://127.0.0.1:8000/ProductDispalyView/")
            .then((data) => {


                const dataFiltered = data.data.filter((e) => {
                    let condition = false;
                    for (let word of Values) {



                        if (e.Product_Name.Product_Name.toLowerCase().includes(word.toLowerCase()) ||
                            e.Product_Name.Category.toLowerCase().includes(word.toLowerCase()) ||
                            e.Product_Name.Category_Name.toLowerCase().includes(word.toLowerCase())) {
                            condition = true;
                            break;
                        }
                    }
                    if (Range) {
                        if (e.Product_Name.Price > Range) {
                            condition = true;
                        }
                    }



                    return condition;
                });

                FilterData(dataFiltered)
                if (Func) {
                    HandleClick();
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);

            });



    };
    return (

        <>
            <div style={{ width: '100%', overflowX: 'hidden' }} >
                <Nav2 />
            </div>

            <nav style={{ background: '#1F4C94' }} class="navbar navbar-expand-lg navbar-light  mt-2">

                <Navbar Callback={Callback} DisplySidebar={DisplySidebar}  />
            </nav>
            {/*  */}
            <div className=' bg-primary d-block d-md-none ' style={{ cursor: 'pointer', }} >
                <h6 style={{ fontSize: '25px' }} onClick={HandleClick}><i class="fa-solid fa-filter" style={{ fontSize: '25px' }}></i>Filter</h6>
            </div>

            <div className='d-flex flex-row' style={{ height: '100vh', background: '#F5F7FA', overflowX: 'hidden' }}>

                <div className='d-none d-md-block' style={{ width: '300px', height: '100vh', overflowY: 'auto', scrollbarWidth: 'none' }}>
                    <FilterSideBar FilterData={FilterData} />
                </div>

                <div className=' col-12 col-md-9 ml-1 mt-2' style={{ overflowY: 'auto', overflowX: 'hidden', position: 'relative', scrollbarWidth: 'none', }}>
                    <div className='row' style={{ width: '100%', overflowX: 'hidden' }}>
                        {Data2 && Data2.slice().reverse().map((e) => {
                            
                            return (
                                <div key={e.id} className='model ml-auto mr-auto  mt-2 ' style={{ display: 'flex', flexWrap: 'wrap', boxShadow: '0px 4px 8px black', overflow: 'hidden' }}>
                                    <div className="p-1 ml-1" style={{ display: 'flex', flexDirection: 'column', background: '#F5F7FA', width: '100%', height: '100%' }}>
                                        <img  alt="" srcset={e.ImageUrl} width={'95%'} height={'70%'} />
                                        <div className=" mt-3 d-flex flex-column" style={{ cursor: 'pointer' }}>
                                            <h6 onClick={() => { navigate('/Dis', { state: { data: e } }) }} className='text-primary'><TruncateWords text={e.Product_Name.Product_Name} maxLength={25} /></h6>
                                            <span className='text-success'><i className="fa-solid fa-indian-rupee-sign mr-2"></i>{e.Product_Name.Price}</span>
                                        </div>
                                        <div className="mt-2" style={{ height: '', width: '100%', cursor: 'pointer' }}>
                                            <span className='btn btn-primary col-12' style={{ width: '100%' }} onClick={() => { navigate('/Dis', { state: { data: e } }) }} >Buy Now<i className="fa-solid fa-cart-plus ml-2"></i></span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
                {OnClick && <div style={{ position: 'absolute', top: '130px', width: '100%', background: 'white' }}>
                    <div>
                        <div className='col-12 d-flex flex-row justify-content-end mt-2 '>
                            <i onClick={() => { HandleClick() }} class="fa-regular fa-circle-xmark p-1  text-white bg-danger" style={{ fontSize: '25px', borderRadius: '30px', position: 'fixed' }}></i>
                        </div>
                        <Filter FilterData={FilterData} HandleClick={HandleClick} />
                    </div>
                </div>}
            </div>
            {OnClick2 && <div className='col-sm-11 col-md-6 col-lg-4' style={{ background: '#2457AA', position: 'absolute', top: '10px', left: '-20px', overflow: 'hidden' }} >
                <div className='col-12 d-flex flex-row justify-content-end mt-3  mb-2'>
                    <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {

                        setOnClick2(false)
                    }} style={{ fontSize: '25px', borderRadius: '20px' }}></i>

                </div>
                {Catigories.slice().map((e, index) => { // Reversing the order of mapped elements
                    return (
                        <div key={index} className='card-footer text-start ml-2' style={{ height: '60px', background: '#2457AA', cursor: 'pointer', transitionDelay: `${index * 0.1}s` }} >

                            <div className='d-flex flex-row'>
                                <i className="fa-solid fa-arrow-right mt-2  mr-3 text-light" style={{ fontSize: '30px' }}></i>
                                <h5 className='mt-2 text-light' onClick={() => {
                                    window.location.reload()
                                    navigate("/Product", { state: { Cat: e } })
                                }}>{e}</h5>
                            </div>
                        </div>
                    )
                })}
            </div>}
            <div className={`bg-light ${DSide ? 'dside' : 'ddside'}`} style={{ height: '100vh', position: 'absolute', top: '0px', right: '0px', overflow: 'hidden' }}>
                <DSidebar DisplySidebar={DisplySidebar} />
            </div>


        </>
    )
}

export default Product_Filters







