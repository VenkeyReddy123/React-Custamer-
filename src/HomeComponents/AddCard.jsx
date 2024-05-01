import React, { useEffect, useRef, useState } from 'react';
import { Mobile_Data } from '../Data/Mobile_Data';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import DSidebar from '../DSidebar';
import { Catigories } from '../Data.jsx'
import Footer from '../Footer.jsx';



const AddCard = () => {
  const quantity = 1
  const navigate = useNavigate()
  const Data = Mobile_Data;
  const Data2 = Data.slice(2, 7);
  const [Data3, setData3] = useState(null)
  const Prices = [0]
  const [OnClick, setOnClick] = useState(false);
  const sectionRef = useRef(null);
  const [SendArr, setSendArr] = useState([])
  const Saving = []
  const Delivary = []
  const Callback = () => {
    setOnClick(!OnClick)

  }
  // let Pid=null
  const Cat = ['Electronics', 'Fashion', 'Home&Garden', 'Health&Beauty', 'Books&Media', 'Sports&OutDors', 'Toys&Games', 'Automotive', 'Jewelry&Accessories']
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {
      setdata(d.data)
    }).catch((e) => {

    })
    axios.get("http://127.0.0.1:8000/AddCardDetails/")
      .then((d) => {


        const Pid = d.data.filter(obj => obj.Custamer_Name.Email === localStorage.getItem('email')).map(obj => obj.Product_Name);
        return Pid;
      })
      .then((Pid) => {
        axios.get("http://127.0.0.1:8000/ProductDispalyView/")
          .then((d) => {
            const Data = d.data.filter(e => Pid.includes(e.Product_Name.id)).map(product => ({
              ...product,
              quantity: 1  // Assuming the default quantity is 1
            }));
            setData3(Data);
          })
          .catch((error) => {
            console.log('Error fetching product display data:', error);
          });
      })
      .catch((error) => {
        console.log('Error fetching card details:', error);
      });
  }, []);

  // REmobing Code

  const HandleRemove = (e) => {

    const Data = {
      "Product_Name": e.Product_Name.id,
      "Custamer_Name": (localStorage.getItem('email'))
    }
    console.log(Data)
    axios.delete("http://127.0.0.1:8000/AddCardDetails/", { data: Data })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {

      });
  }
  function sum(arr) {

    if (arr.length > 0) {
      let Sum = 0
      for (let va of arr) {
        Sum += Number(va)
      }
      return Sum
    }
  }
  const [DSide, setDSide] = useState(false)
  const DisplySidebar = () => {

    setDSide(!DSide)
  }
  const HandleSendCheck = () => {
    // 
    const FilterData3 = Data3.filter((e) => {
      if (e.Product_Name.Stack > 0) {
        return e
      }
    })
    navigate('/Check', { state: { Arr: FilterData3 } })

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

  return (

    <div className='d-flex flex-column'>
      <div className=''  >
            <div className='d-flex flex-row  p-2 card mt-1' style={{ backgroundColor: 'white' }}>
                <div className='col-md-3 col-lg-2 d-none d-md-block ml-auto'>
                    <div className='bg-primary p-2 web' style={{ borderRadius: '10px' }}>
                        <i class="fa-solid fa-bag-shopping mr-2 text-white ecom"></i><span className='ee'>E</span><span className='com'>commerce</span>
                    </div>
                </div>
                <div className='col-10 col-md-7 p-1 ml-auto' style={{ position: 'relative' }}>
                    <input onChange={HandleInputValue} value={inval} type="text" className='form-control web2' placeholder='search by Products Name' />
                </div>
                <div className='mr-2 p-2 d-flex flex-row  mt-auto mb-auto ml-auto '>
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

      </div>
      <div className='d-sm-flex flex-sm-column d-lg-flex flex-lg-row '>
        <div className='col-sm-12 col-lg-8'>
          <div className='d-flex flex-column'>
            {Data3 && Data3.slice().reverse().map((e, index) => {
              if (e.Product_Name.Delivary_Charges > 0) {
                Delivary.push(e.Product_Name.Delivary_Charges)
              }
              SendArr.push(e)
              Saving.push(quantity * Math.trunc((e.Product_Name.Price * (e.Product_Name.Discount / 100))))
              Prices.push(quantity * Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))))
              return (
                <>
                  <div key={index} className='card mt-3'>
                    <div className='card-body'>
                      <div className='row'>
                        <div className='col-lg-4 col-md-12 mb-3 mb-lg-0'>
                          <img src={e.ImageUrl} alt="" className='img-fluid' style={{ maxHeight: '200px' }} />
                        </div>
                        <div className='col-lg-8 col-md-12'>
                          <h6 className='text-success'>{e.Product_Name.Product_Name}</h6>
                          {e.Product_Name.Rating > 0 ? <>
                            <div>
                              <div style={{ width: '60px', height: '30px', background: 'green', borderRadius: '5px' }} className='d-flex flex-row shadow-lg p-1 text-center'>
                                <p className='text-white'>{e.Product_Name.Rating}</p><i style={{ fontSize: '20px' }} class=" ml-auto fa-regular fa-star text-white"></i>
                              </div>
                            </div>
                          </> : <>

                            <p>No More Revices</p>
                          </>}
                          <p className='text-primary'>
                            <span className='text-dark' style={{ fontSize: '15px' }}><i class="fa-solid fa-indian-rupee-sign mr-2"></i>{Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100)))}</span> <span className='text-dark mt-auto mb-auto ml-3'><del><i class="fa-solid fa-indian-rupee-sign mt-2"></i>{e.Product_Name.Price}</del></span ><span className='text-danger ml-2'></span><span className='text-success mt-auto mb-auto'>{e.Product_Name.Discount}%Off</span><br></br>
                            {e.Product_Name.Stack == 0 ? <><span className='text-danger' style={{ fontWeight: 'bolder' }}>Out Of Stack</span></> : <></>}
                          </p>
                          <div className='d-flex justify-content-between align-items-center'>
                            <button className='btn btn-danger' onClick={() => { HandleRemove(e) }} >
                              <i className="fa-solid fa-trash"></i> Remove
                            </button>
                            <button className={`btn btn-primary ${e.Product_Name.Stack == 0 ? 'disabled' : ''}`} onClick={() => {
                              if (e.Product_Name.Stack > 0) {
                                navigate('/Check', { state: { Product: [e] } })
                              }
                            }

                            }>
                              <i className="fa-solid fa-bolt-lightning" ></i> Buy Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </>
              )
            })}
            {Data3 && Data3.length > 0 ? <>
              <div className='d-flex flex-row  col-sm-12 ml-auto'>

                <div className='ml-auto p-3' >
                  <button onClick={() => { HandleSendCheck(Data3) }} style={{ backgroundColor: 'orangered', color: 'white', border: '1px white solid', fontWeight: 'bolder' }} className='p-3'>Place   Order</button>
                </div>

              </div>
            </> : <></>}


          </div>

        </div>

       
        <div className='col-sm-12 col-lg-4 mt-3'>
          <div className='card shadow-lg'>
            <div className='card-footer'>
              <h6>Price Details</h6>
            </div>
            <div className='card-body'>
              <div className='d-flex flex-row justify-content-between'>
                <h6>Price(Total Items)</h6>
                <h4><i class="fa-solid fa-indian-rupee-sign mt-1 mr-1" style={{ color: 'black' }}></i>{sum(Prices)}</h4>
              </div>
              <div className='d-flex flex-row justify-content-between mt-4'>
                {Delivary.length > 0 ? <>
                  <h6>Delivery Charges({Delivary.length}items)</h6>
                  <div className='d-flex flex-row'>
                    <h6 className='text-success ml-3'>{sum(Delivary)}</h6>
                  </div>
                </> : <>
                  <h6>Delivery Charges</h6>
                  <div className='d-flex flex-row'>
                    <del><i class="fa-solid fa-indian-rupee-sign mt-1 " style={{ color: 'black' }}></i></del>
                    <h6 className='text-success ml-3'>Free</h6>
                  </div>
                </>}
              </div>
              <div className='d-flex flex-row justify-content-between mt-3'>
                <h6>Total Items</h6>
                <h4>{Prices.length - 1}</h4>
              </div>
              <div className='d-flex flex-row justify-content-between mt-3'>
                <h6>Total</h6>
                <h4><i class="fa-solid fa-indian-rupee-sign mt-1 " style={{ color: 'black' }}></i>{sum(Prices)}</h4>
              </div>
            </div>
            <div className='card-footer'>
              <div className='d-flex flex-row justify-content-center mt-3'>

                <span className='text-success' style={{ fontWeight: 'bold' }}>Your Total Saving For This Order<i class="fa-solid fa-indian-rupee-sign mt-1 " style={{ color: 'black' }}></i>{sum(Saving)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className={`bg-light ${DSide ? 'dside' : 'ddside'}`} style={{ height: '100vh', position: 'absolute', top: '0px', right: '0px', overflow: 'hidden' }}>
        <DSidebar DisplySidebar={DisplySidebar} />
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
            {OnClick && <div className='col-sm-11 col-md-6 col-lg-4 ' style={{ background: '#2457AA', position: 'absolute', top: '10px', left: '-20px', overflow: 'hidden' }} >
                <div className='col-12 d-flex flex-row justify-content-end mt-3  mb-2'>
                    <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {

                        setOnClick(false)
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
    </div >
    

  );
};

export default AddCard;
