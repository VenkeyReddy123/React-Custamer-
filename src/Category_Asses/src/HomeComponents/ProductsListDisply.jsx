import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import parse from 'html-react-parser';
import '../PDIsply.css'
import Navbar from './Navbar';
import { Catigories } from '../Data.jsx'
import Category from './Category.jsx'
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
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {

            const Cat_Name = Location.state.Cat_Name
            const Filter = d.data.filter((e) => {
                return e.Product_Name.Category_Name.toLocaleLowerCase().includes(Cat_Name.toLocaleLowerCase())
            })
            SetData(Filter)

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
    return (

        <>

            <nav style={{ background: 'black', overflow: 'hidden' }} class="navbar navbar-expand-lg navbar-light  mt-2">

                <Navbar Callback={Callback} DisplySidebar={DisplySidebar} />
            </nav>
            <nav style={{ background: 'white', }} class="navbar navbar-expand-lg navbar-light  mt-2">

                <Category  HandleOverCat={HandleOverCat} HandleRemove={HandleRemove} />
            </nav>
            <div className='col-12 d-flex flex-row' onMouseEnter={HandleRemove}>
                <div className='d-none d-md-block col-md-3'>

                </div>
                <div className='col-md-9 row'>
                    {Data && Data.slice().reverse().map((e) => {
                        let Highlet = null
                        let SmallHighlet = null
                        try {
                            Highlet = parse(e.Product_Name.Hightlet)
                            // console.log(this.props.e.Product_Name.Hightlet)


                        } catch {

                        }
                        return (
                            <>
                                <div className='col-12 d-flex flex-row p-2 card'>
                                    <div className='col-3 col-md-3 p-2' >
                                        <img style={{ cursor: 'pointer' }} onClick={() => { navigate('/Dis', { state: { data: e } }) }} alt="" srcset={e.ImageUrl} width={'100%'} height={'90%'} />
                                    </div>
                                    <div className='col- col-md-5'>
                                        <div className='mt-2 mb-2'>
                                            <small className='mb-2 PName d-none d-md-block' style={{ cursor: 'pointer' }} onClick={() => { navigate('/Dis', { state: { data: e } }) }}>{e.Product_Name.Product_Name}</small>
                                            <span className='mb-2 PName d-block d-md-none' style={{ cursor: 'pointer' }} onClick={() => { navigate('/Dis', { state: { data: e } }) }}><TruncateWords text={e.Product_Name.Product_Name} maxLength={20} /></span>
                                            {e.Product_Name.Rating > 0 &&
                                                <div className='mt-2'>
                                                    <div style={{ width: '65px', height: '30px', background: 'green', borderRadius: '5px' }} className='d-flex flex-row shadow-lg p-1 text-center'>
                                                        <small className='text-white'>{e.Product_Name.Rating}</small><i style={{ fontSize: '15px' }} class=" ml-2 fa-regular fa-star text-white mt-auto mb-auto"></i>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        <small className='d-none d-md-block'>{Highlet}</small>
                                        <small className='d-block d-md-none limited-lines '>{Highlet}</small>
                                    </div>
                                    <small className='col-4 col-md-3 '>
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
            {Hand&&CatData&&<>
            <div className='p-5 shadow' style={{position:'absolute',top:'160px',background:'white',marginLeft:'20px'}}>
                  {CatData.map((e)=>{
                   
                    return (
                        <>
                          <li onClick={()=>{
                            window.location.reload()
                              navigate("/List",{state:{Cat_Name:e.slice(0,5)}})
                          }} style={{cursor:'pointer'}} className='p-2 Cat'>{e}</li>
                        </>
                    )
                  })}
            </div>
             </>}
        </>
    )
}

export default ProductsListDisply