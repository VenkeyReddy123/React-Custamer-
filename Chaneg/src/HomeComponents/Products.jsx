import React, { useEffect, useState } from 'react'
import { Mobile_Data } from '../Data/Mobile_Data'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Img1 from './Assets/heart.svg'
import ResizedImage from './ResizedImage';


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

const Products = () => {
    const navigate=useNavigate() 
    const [Data2, setData2] = useState(null)
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/TopDealsDetails/").then((d) => {
            console.log(d.data)
            setData2(d.data)
         

        }).catch((e) => {
            alert('Please Try AGian Later Somthing Eroor')
        })

    }, [])

    return (
        <>
        
            <div className='d-flex flex-column' style={{overflowX:'hidden'}}>
                <h5 className='p-3 text-primary'><i className="fa-solid fa-hashtag p-2 text-warning"></i>Top Deals Today</h5>
                <div className='d-flex flex-row  col-12 '  style={{ overflowX: 'auto',scrollbarWidth:'none' }}>   
                   {Data2 && Data2.slice().reverse().map((e,ind) => {
                        return (
                            <>
                                <div onClick={() => { navigate('/Dis', { state: { data: e } }) }} key={ind} className=' card col-8 col-md-3  col-lg-3 col-xl-2 mr-4 ml-auto' style={{ height: '300px',borderRadius:'20px',cursor:'pointer' }}>
                                    <div className='card-body' style={{ height: '150px',marginTop:'-10px',position:'relative' }}>
                                    {/* <ResizedImage imageUrl={e.ImageUrl.ImageUrl} widthPercentage={100} heightPercentage={100}/> */}
                                    <img src={e.ImageUrl.ImageUrl} width={'100%'} height={'100%'} alt="" srcset="" />
                                     </div> 
                                    <div className='card-body' onClick={()=>{navigate("/Dis", { state: {data:e } })}} >
                                       <h6 style={{cursor:'pointer'}} className='text-primary'><TruncateWords text={e.ImageUrl.Product_Name.Product_Name} maxLength={20} /></h6>
                                       <span className='text-dark'><del><i class="fa-solid fa-indian-rupee-sign mr-2"></i>{e.ImageUrl.Product_Name.Price}</del></span ><span className='text-danger ml-2'>{e.ImageUrl.Product_Name.Discount}%Off<br></br></span><span className='text-success'><i class="fa-solid fa-indian-rupee-sign mr-2"></i>{Math.trunc(e.ImageUrl.Product_Name.Price-(e.ImageUrl.Product_Name.Price*(e.ImageUrl.Product_Name.Discount/100)))}only</span>
                                    </div>
                                 
                                </div>
                            </>
                        )
                    })}

                </div>

            </div>

        </>
    )
}

export default Products;
