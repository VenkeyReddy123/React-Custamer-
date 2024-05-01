import React, { useEffect, useState } from 'react'
import { Mobile_Data } from '../Data/Mobile_Data'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
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
const Product2 = () => {
    const navigate=useNavigate()
    
    const [Data2, setData2] = useState(null)
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {
            setData2(d.data)
            

        }).catch((e) => {
            alert('Please Try AGian Later Somthing Eroor')
        })

    }, [])
  return (
   <>

        <div className='d-flex flex-column' style={{overflowX:'hidden'}}>
                <h5 className='p-3 text-primary'><i className="fa-solid fa-hashtag p-2 text-warning"></i>Top Deals Today</h5>
                <div className='d-flex flex-row  col-12 ' style={{ overflowX: 'auto',scrollbarWidth:'none' }}>   
                   {Data2 && Data2.slice(48,55).map((e,ind) => {
                        return (
                            <>
                                <div onClick={() => { navigate('/Dis', { state: { data: e } }) }} key={ind} className=' card col-8   col-md-3 col-xl-2 mr-4 ml-3' style={{ height: '300px',borderRadius:'50px',cursor:'pointer' }}>
                                    <div className='card-body' style={{ height: '200px',marginTop:'',overflow:'hidden' }}>
                                        {/* <img  className='shadow' src={e.ImageUrl}alt={e.Product_Name.Product_Name}  height={'200px'} width={170} style={{borderRadius:'0px',marginLeft:'0px'}} /> */}
                                        <ResizedImage imageUrl={e.ImageUrl} height={180} width={170} />
                                    </div>
                                    <div className='card-body' onClick={()=>{navigate("/Dis", { state: {data:e } })}} >
                                       <h6 style={{cursor:'pointer'}} className='text-primary'><TruncateWords text={e.Product_Name.Product_Name} maxLength={20} 
                                         /></h6>
                                       <span className='text-dark'><del><i class="fa-solid fa-indian-rupee-sign mr-2"></i>{e.Product_Name.Price}</del></span ><span className='text-danger ml-2'>{e.Product_Name.Discount}%Off<br></br></span><span className='text-success'><i class="fa-solid fa-indian-rupee-sign mr-2"></i>{Math.trunc(e.Product_Name.Price-(e.Product_Name.Price*(e.Product_Name.Discount/100)))}only</span>
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

export default Product2