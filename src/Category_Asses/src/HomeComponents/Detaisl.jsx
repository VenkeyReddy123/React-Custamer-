import React, { useEffect, useState } from 'react'
import img1 from './Assets/Ele1.jpg'
import img2 from './Assets/Fur1.jpeg'
import img3 from './Assets/Fa3.webp'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'


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
const Detaisl = () => {
  const navigate=useNavigate()
  const [index, setIndex] = useState(null)
  const [index2, setIndex2] = useState(null)
  const [index3, setIndex3] = useState(null)
  const [Data2, setData2] = useState(null)
  const [isHovered, setIsHovered] = useState(false);
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
      <div className=' container d-lg-flex mt-4 flex-lg-row mt-3'>
     
        <div className='d-block d-lg-none d-flex flex-row justify-content-between'>
             <div className='d-flex flex-column'>
                   <h3>Electronics</h3>
                    <div style={{ width: '70%', borderBottom: '2px solid yellow' }}>

                    </div>
             </div>
              <button className='col-4 btn btn-warning' onClick={() => { navigate('/Product',{state:{Cat:'Elec'}}) }} >View All</button>
        </div>
       
        <div className='col-lg-3 d-none d-lg-block mr-1' style={{ height: '350px', overflow: 'hidden', position: 'relative' }}>
              <img src={img1} alt="" style={{ height: '100%' }} />
                 <button className='col-12 btn btn-warning' style={{ width: '50%', position: 'absolute', bottom: '40%', left: '20%' }} onClick={() => { navigate('/Product',{state:{Cat:'Elec'}}) }} >View All</button>

                     <div className='d-flex flex-column' style={{ position: 'absolute', top: '10%', left: '20%' }}>
                        <h2 className='text-white'>Electronics</h2>
                         <div style={{ width: '50%', position: 'absolute', top: '90%', left: '-0%', borderBottom: '2px solid yellow' }}>

                        </div>
                   </div>
        </div>
        <div className='col-lg-9 mt-4 ml-1 d-flex flex-row' style={{overflowX:'auto',scrollbarWidth:'none'}}>
        {Data2 && Data2.slice(0, 1).map((e, ind) => {
                    return (
                        <>
                            <div onClick={() => { navigate('/Dis', { state: { data: e } }) }}  className='bg-white col-sm-6 col-md-4 text-center' onMouseEnter={() => { setIndex(ind) }} onMouseLeave={() => { setIsHovered(!isHovered) }} style={{ borderRight: '2px solid black',cursor:'pointer' }} >
                                <div className='p-2' style={{ height: '190px', overflow: 'hidden' }}>
                                    <img src={e.ImageUrl} alt="" height={'100%'} />
                                </div>
                                <div className='' style={{ height: '150px' }}>
                                    <span className='text-warning' style={{ textAlign: 'start' }}>{e.Product_Name.rating>0&&<><StarRating rating={e.Product_Name.rating} /></>}</span><br></br>
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


      </div>

      {/* Furnitures */}


      <div className=' container d-lg-flex mt-4 flex-lg-row mt-3'>
        {/* Dispaly Only SMall */}
        <div className='d-block d-lg-none d-flex flex-row justify-content-between'>
             <div className='d-flex flex-column'>
                   <h3>Furnitures</h3>
                    <div style={{ width: '70%', borderBottom: '2px solid yellow' }}>

                    </div>
             </div>
              <button className='col-4 btn btn-warning' onClick={() => { navigate('/Product',{state:{Cat:'Hom'}}) }} >View All</button>
        </div>
        {/*  */}
        {/* Image in Large */}
        <div className='col-lg-3 d-none d-lg-block mr-1' style={{ height: '350px', overflow: 'hidden', position: 'relative' }}>
              <img src={img2} alt="" style={{ height: '100%' }} />
                 <button className='col-12 btn btn-warning' style={{ width: '50%', position: 'absolute', bottom: '40%', left: '20%' }} onClick={() => { navigate('/Product',{state:{Cat:'Home'}}) }} >View All</button>

                     <div className='d-flex flex-column' style={{ position: 'absolute', top: '10%', left: '20%' }}>
                        <h2 className='text-white'>Furnitures </h2>
                         <div style={{ width: '50%', position: 'absolute', top: '90%', left: '-0%', borderBottom: '2px solid yellow' }}>

                        </div>
                   </div>
        </div>
        <div className='col-lg-9 mt-4 ml-1 d-flex flex-row' style={{overflowX:'auto',scrollbarWidth:'none'}}>
        {Data2 && Data2.slice(13,21).map((e, ind) => {
            alert(e.Product_Name.rating)
                    return (
                        <>
                            <div  onClick={() => { navigate('/Dis', { state: { data: e } }) }}  className='bg-white col-sm-6 col-md-4 text-center' onMouseEnter={() => { setIndex2(ind) }} onMouseLeave={() => { setIndex2(ind) }} style={{ borderRight: '2px solid black',cursor:'pointer' }} >
                                <div className='p-2' style={{ height: '180px', overflow: 'hidden' }}>
                                    <img src={e.ImageUrl} alt="" height={'100%'} />
                                </div>
                                <div className='' style={{ height: '150px' }}>
                                    <span className='text-warning' style={{ textAlign: 'start' }}><StarRating rating={(Math.random() * (4.5 - 3.5) + 3).toFixed(1)} /></span><br></br>
                                    <span style={{ textAlign: 'start' }}><TruncateWords text={e.Product_Name.Product_Name} maxLength={30} /></span><br></br>
                                    <i class="fa-solid fa-indian-rupee-sign  text-success ml-2"></i><span className='text-success' style={{ textAlign: 'start', fontWeight: 'bold' }}>{e.Product_Name.Price}</span>
                                    {index2 === ind ? (<>
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


      </div>

      {/* Fashions */}

      <div className=' container d-lg-flex mt-4 flex-lg-row mt-3'>
        {/* Dispaly Only SMall */}
        <div className='d-block d-lg-none d-flex flex-row justify-content-between'>
             <div className='d-flex flex-column'>
                   <h3>Fashions</h3>
                    <div style={{ width: '70%', borderBottom: '2px solid yellow' }}>

                    </div>
             </div>
              <button className='col-4 btn btn-warning' onClick={() => { navigate('/Product',{state:{Cat:'Cloth'}}) }}>View All</button>
        </div>
        {/*  */}
        {/* Image in Large */}
        <div className='col-lg-3 d-none d-lg-block mr-1' style={{ height: '350px', overflow: 'hidden', position: 'relative' }}>
              <img src={img3} alt="" style={{ height: '100%' }} />
                 <button className='col-12 btn btn-warning' style={{ width: '50%', position: 'absolute', bottom: '40%', left: '20%' }}  onClick={() => { navigate('/Product',{state:{Cat:'Fash'}}) }} >View All</button>

                     <div className='d-flex flex-column' style={{ position: 'absolute', top: '10%', left: '20%' }}>
                        <h2 className='text-white'>Fashions </h2>
                         <div style={{ width: '50%', position: 'absolute', top: '90%', left: '-0%', borderBottom: '2px solid yellow' }}>

                        </div>
                   </div>
        </div>
        <div className='col-lg-9 mt-4 ml-1 d-flex flex-row' style={{overflowX:'auto',scrollbarWidth:'none'}}>
        {Data2 && Data2.slice(4,13).map((e, ind) => {
                    return (
                        <>
                            <div onClick={() => { navigate('/Dis', { state: { data: e } }) }}  className='bg-white col-sm-6 col-md-4 text-center' onMouseEnter={() => { setIndex3(ind) }} onMouseLeave={() => { setIndex3(ind) }} style={{ borderRight: '2px solid black',cursor:'pointer' }} >
                                <div className='p-2' style={{ height: '180px', overflow: 'hidden' }}>
                                    <img src={e.ImageUrl} alt="" height={'100%'} />
                                </div>
                                <div className='' style={{ height: '150px' }}>
                                    <span className='text-warning' style={{ textAlign: 'start' }}><StarRating rating={(Math.random() * (4.5 - 3.5) + 3).toFixed(1)} /></span><br></br>
                                    <span style={{ textAlign: 'start' }}><TruncateWords text={e.Product_Name.Product_Name} maxLength={30} /></span><br></br>
                                    <i class="fa-solid fa-indian-rupee-sign  text-success ml-2"></i><span className='text-success' style={{ textAlign: 'start', fontWeight: 'bold' }}>{e.Product_Name.Price}</span>
                                    {index3 === ind ? (<>
                                        <div  className='d-flex flex-row justify-content-center  col-12 '>
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


      </div>
    </>
  )
}

export default Detaisl