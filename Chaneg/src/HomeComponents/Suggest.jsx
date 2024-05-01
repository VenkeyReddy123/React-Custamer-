
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


const Suggest = () => {
    const navigate = useNavigate()
    const [Data2, setData2] = useState(null)

    const maxLengthSmallScreen = 10;
    const maxLengthLargeScreen = 20;


    useEffect(() => {
        axios.get("http://127.0.0.1:8000/SuggestDetails/").then((d) => {
            setData2(d.data)
           

        }).catch((e) => {
            alert('Please Try AGian Later Somthing Eroor')
        })

    }, [])
    return (
        <>
            <div className='col-12 d-sm-flex flex-sm-column d-md-flex flex-md-row' style={{overflowX:'hidden',}}>
                <div className='col-sm-11 col-md-4 card-body mt-2' style={{ background: '#B4926D',cursor:'pointer',height:'440px' }}>
                      <div className='col-12 row ' >
                       
                            {/* {Data2 && Data2.slice().reverse().slice(0,4).map((e) => {
                                return (
                                    <>   
                                    <div className='col-6 mt-auto p-2 card-body' style={{ height: '200px', overflow: 'hidden', borderRadius:'20px' }}>
                                        <img  onClick={() => { navigate('/Dis', { state: { data: e } }) }} src={e.ImageUrl.ImageUrl} alt="" srcset="" style={{ height: '200px',width:'100%',borderRadius:'30px' }} />
                                        </div>
                                    </>
                                )
                            })} */}
                              {Data2 && Data2.slice().reverse().slice(0,2).map((e) => {
                                return (
                                    <>   
                                    <div className='col-12 mt-1 p-2 card-body ' style={{ height: '200px', overflow: 'hidden', borderRadius:'20px',background:'white' }}>
                                        <div className='d-flex flex-row col-12'>
                                                    <div> 
                                                    <h6 style={{cursor:'pointer'}} className='text-black'><TruncateWords text={e.ImageUrl.Product_Name.Product_Name} maxLength={50} /></h6>
                                                    <span className='text- mr-2'>Saving Amount<span className='text-success ml-2'><i class="fa-solid fa-indian-rupee-sign mr-2"></i>{Math.trunc((e.ImageUrl.Product_Name.Price*(e.ImageUrl.Product_Name.Discount/100)))}</span></span><br />
                                                    <span className='text-info'>Offer is {e.ImageUrl.Product_Name.Discount }%</span><br></br>
                                                    <span className='text-dark'>Pay Only  {Math.trunc(e.ImageUrl.Product_Name.Price-(e.Product_Name.Price*(e.ImageUrl.Product_Name.Discount/100)))} <i class="fa-solid fa-indian-rupee-sign"></i></span>
                                                    <span className='text-primary'>No Cost Emi | Best Offer </span>
                                                    </div>
                                                     <img className='col-5'  onClick={() => { navigate('/Dis', { state: { data: e } }) }} src={e.ImageUrl.ImageUrl} alt="" srcset="" style={{ height: '180px',borderRadius:'30px',}} />
                                        </div>
                                        </div>
                                    </>
                                )
                            })}
                        
                       
                    </div>
                </div>
                <div className='col-sm-11 col-md-4 card-body mt-2' style={{ background: '#BE5C59',cursor:'pointer',height:'440px' }}>
                      <div className='col-12 row ' >
                       
                      {Data2 && Data2.slice().reverse().slice(2,4).map((e) => {
                                return (
                                    <>   
                                    <div className='col-12 mt-1 p-2 card-body ' style={{ height: '200px', overflow: 'hidden', borderRadius:'20px',background:'white' }}>
                                        <div className='d-flex flex-row col-12'>
                                                    <div> 
                                                    <h6 style={{cursor:'pointer'}} className='text-black'><TruncateWords text={e.ImageUrl.Product_Name.Product_Name} maxLength={50} /></h6>
                                                    <span className='text-success mr-2'>Saving Amount<span className='text-success ml-2'><i class="fa-solid fa-indian-rupee-sign mr-2"></i>{Math.trunc((e.ImageUrl.Product_Name.Price*(e.ImageUrl.Product_Name.Discount/100)))}</span></span><br />
                                                    <span className='text-info'>Offer is {e.ImageUrl.Product_Name.Discount }%</span><br></br>
                                                    <span className='text-dark'>Pay Only  {Math.trunc(e.ImageUrl.Product_Name.Price-(e.Product_Name.Price*(e.ImageUrl.Product_Name.Discount/100)))} <i class="fa-solid fa-indian-rupee-sign"></i></span><br></br>
                                                    <span className='text-primary'>No Cost Emi | Best Offer </span>
                                                    </div>
                                                     <img className='col-5'  onClick={() => { navigate('/Dis', { state: { data: e } }) }} src={e.ImageUrl.ImageUrl} alt="" srcset="" style={{ height: '180px',borderRadius:'30px',}} />
                                        </div>
                                        </div>
                                    </>
                                )
                            })}
                        
                       
                    </div>
                </div>
                <div className='col-sm-11 col-md-4 card-body mt-2' style={{ background: '#C3853C',cursor:'pointer',height:'440px' }}>
                      <div className='col-12 row ' >
                       
                      {Data2 && Data2.slice().reverse().slice(4,6).map((e) => {
                                return (
                                    <>   
                                    <div className='col-12 mt-1 p-2 card-body ' style={{ height: '200px', overflow: 'hidden', borderRadius:'20px',background:'white' }}>
                                        <div className='d-flex flex-row col-12'>
                                                    <div> 
                                                    <h6 style={{cursor:'pointer'}} className='text-black'><TruncateWords text={e.ImageUrl.Product_Name.Product_Name} maxLength={50} /></h6>
                                                    <span className='text-success mr-2'>Saving Amount<span className='text-success ml-2'><i class="fa-solid fa-indian-rupee-sign mr-2"></i>{Math.trunc((e.ImageUrl.Product_Name.Price*(e.ImageUrl.Product_Name.Discount/100)))}</span></span><br />
                                                    <span className='text-info'>Offer is {e.ImageUrl.Product_Name.Discount }%</span><br></br>
                                                    <span className='text-dark'>Pay Only  {Math.trunc(e.ImageUrl.Product_Name.Price-(e.Product_Name.Price*(e.ImageUrl.Product_Name.Discount/100)))} <i class="fa-solid fa-indian-rupee-sign"></i></span>
                                                    <span className='text-primary'>No Cost Emi | Best Offer </span>
                                                    </div>
                                                     <img className='col-5'  onClick={() => { navigate('/Dis', { state: { data: e } }) }} src={e.ImageUrl.ImageUrl} alt="" srcset="" style={{ height: '180px',borderRadius:'30px',}} />
                                        </div>
                                        </div>
                                    </>
                                )
                            })}
                        
                       
                    </div>
                </div>
                
                
                
            </div>


        </>
    )
}

export default Suggest