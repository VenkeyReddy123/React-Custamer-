import axios from 'axios'
import React, { useEffect, useState } from 'react'
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

const Recamandete = () => {
    const navigate=useNavigate()
    const [index, setIndex] = useState(null)
    const [index2, setIndex2] = useState(null)
    const [index3, setIndex3] = useState(null)
    const [Data2, setData2] = useState(null)
    const [isHovered, setIsHovered] = useState(false);
    // const [index, setIndex] = useState(null)
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {
            setData2(d.data)
  
  
        }).catch((e) => {
            alert('Please Try AGian Later Somthing Eroor')
        })
  
    }, [])
    const AddCard=(e)=>{
        const email=localStorage.getItem('email')?localStorage.getItem('email'):false
        if(email){
              const Data={
        
            "Custamer_Name":email,
            "Product_Name":e.Product_Name.id
        }
         axios.post("http://127.0.0.1:8000/AddCardDetails/",Data).then((e)=>{
            alert('Addee Success')
         }).catch((e)=>{
             alert('Already Added/Network Issuse Please Try Again lAtes')
         })
            return
        }
        else{
            alert('Please Login')
        }
        return
    
    }

  
  return (
   <>
       <div className=' col-12 d-flex flex-row justify-content-between'>
             <div className=' col-12 d-flex flex-column'>
                   <h3>Recamandeate Products</h3>
                    <div style={{ width: '100%', borderBottom: '2px solid yellow' }}>

                    </div>
             </div>
        </div>
       <div className='col-lg-12 mt-4 ml-1 d-flex flex-row' style={{overflowX:'auto',scrollbarWidth:'none'}}>
        {/* {Data2 && Data2.slice(54,63).map((e, ind) => {
                    return (
                        <>
                            <div className='bg-white col-sm-6 col-md-3 text-center' onMouseEnter={() => { setIndex3(ind) }}  onMouseLeave={() => { setIsHovered(!isHovered) }} style={{ borderRight: '2px solid black',cursor:'pointer' }} style={{ borderRight: '1px solid black' }} >
                                <div className='p-2' style={{ height: '200px', overflow: 'hidden' }}>
                                    <img src={e.ImageUrl} alt="" height={'100%'} />
                                </div>
                                <div className='' style={{ height: '150px' }}>
                                    <span className='text-warning' style={{ textAlign: 'start' }}><StarRating rating={(Math.random() * (4.5 - 3.5) + 3).toFixed(1)} /></span><br></br>
                                    <span style={{ textAlign: 'start' }}><TruncateWords text={e.Product_Name.Product_Name} maxLength={30} /></span><br></br>
                                    <i class="fa-solid fa-indian-rupee-sign  text-success ml-2"></i><span className='text-success' style={{ textAlign: 'start', fontWeight: 'bold' }}>{e.Product_Name.Price}</span>
                                    {index === ind ? (<>
                                        <div className='d-flex flex-row justify-content-center  col-12 '>
                                            <div className='p-1 btn btn-primary mr-auto ml-auto  '>
                                                <i onClick={() => { AddCard(e)}}  style={{ fontSize: '25px' }} class="fa-solid fa-cart-shopping  text-dark "></i>
                                            </div>
                                            <div className='p-1 btn btn-primary mr-auto ml-auto  '>
                                                <i onClick={() => { navigate('/Dis', { state: { data: e } }) }} style={{ fontSize: '25px' }} class="fa-solid fa-eye  text-dark"></i>
                                            </div>
                                        </div>
                                    </>) : (<></>)}
                                </div>

                            </div>
                        </>
                    )
                })} */}
                {Data2 && Data2.slice(0, 12).map((e, ind) => {
                    return (
                        <>
                            <div onClick={() => { navigate('/Dis', { state: { data: e } }) }}  className='bg-white col-sm-6 col-md-4 text-center' onMouseEnter={() => { setIndex(ind) }} onMouseLeave={() => { setIsHovered(!isHovered) }} style={{ borderRight: '2px solid black',cursor:'pointer' }} >
                                <div className='p-2' style={{ height: '190px', overflow: 'hidden' }}>
                                    <img src={e.ImageUrl} alt="" height={'100%'} />
                                </div>
                                <div className='' style={{ height: '150px' }}>
                                    <span className='text-warning' style={{ textAlign: 'start' }}><StarRating rating={(Math.random() * (4.5 - 3.5) + 3).toFixed(1)} /></span><br></br>
                                    <span style={{ textAlign: 'start' }}><TruncateWords text={e.Product_Name.Product_Name} maxLength={30} /></span><br></br>
                                    <i class="fa-solid fa-indian-rupee-sign  text-success ml-2"></i><span className='text-success' style={{ textAlign: 'start', fontWeight: 'bold' }}>{e.Product_Name.Price}</span>
                                    {index === ind ? (<>
                                        <div className='d-flex flex-row justify-content-center  col-12 '>
                                            <div className='p-1 btn btn-primary mr-auto ml-auto  '>
                                                <i onClick={() => { AddCard(e)}}  style={{ fontSize: '25px' }} class="fa-solid fa-cart-shopping  text-dark "></i>
                                            </div>
                                            <div className='p-1 btn btn-primary mr-auto ml-auto  '>
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
   </>
  )
}

export default Recamandete