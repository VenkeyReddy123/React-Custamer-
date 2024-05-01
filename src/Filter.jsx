// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import {Electrinics} from './Data.jsx'
// import {Clothing} from './Data.jsx'
// import {Footware} from './Data.jsx'
// import {Accesories} from './Data.jsx'
// import {Beauty_PersonCare} from './Data.jsx'
// import {Home_Kitchen} from './Data.jsx'
// import {Furniture} from './Data.jsx'
// import {Books_Music} from './Data.jsx'
// import {Sports} from './Data.jsx'
// import {Health} from './Data.jsx'
// import {Toys_Games} from './Data.jsx'
// import { useNavigate } from 'react-router-dom'


// const Filter = ({FilterData,HandleClick}) => {
//     const [Range,setRange]=useState(0)
//     const [Ele,setEle]=useState('')
//     const [Home,setHome]=useState('')
//     const [Cloth,setCloth]=useState('')
//     const [For,setFor]=useState('')
//     const [Auto,setAuto]=useState('')
//     const [Toy,setToy]=useState('')
//     const [Hel,setHel]=useState('') 
//     const [Foot,SetFoot]=useState("")
//     const[Acc,setAcc]=useState('')
//     const[Bea,setBea]=useState("")
//     const[Books,SetBook]=useState("")
//     const[Sport,SetSport]=useState("")
//     const navigate=useNavigate()
//     useEffect(()=>{    
       


//     },[])
//     const HandleSubmit=()=>{
        
//         const Arr=[Ele,Home,Cloth,For,Toy,Hel,Foot,Acc,Bea,Books,Sport]
//         const Values=[]
//          for(let word of Arr){
//             if(word){
//                Values.push(word)
//             }
//          }
//          HandleFilters(Values,Range)
//        }
//        const HandleFilters = (Values, Range) => {
//         axios.get("http://127.0.0.1:8000/ProductDispalyView/")
//             .then((data) => {
//                 const dataFiltered = data.data.filter((e) => {
//                     let condition = false;
//                     for (let word of Values) {
//                         if (
//                             e.Product_Name.Category_Name.toLowerCase().includes(word.toLowerCase())) {
//                             condition = true;
//                             break;
//                         }
//                     }
//                     if (Range) {
//                         if (e.Product_Name.Price > Range) {
//                             condition = true;
//                         }
//                     }



//                     return condition;
//                 });
//                 window.location.reload()
            
//                 navigate("/Product",{state:{Filter:dataFiltered}})    
                
//             })
//             .catch((error) => {
//                 console.error('Error fetching data:', error);
               
//             })  
             
//     };
//     return (
          
//         <> 
//                 <sidebar className='bg-primary' style={{ height: '100%', width: '25%', overflowY: 'auto', background: '#F5F7FA' }}>
//                     <h6 >Price Ranges</h6>
//                     <form className='ml-2' onSubmit={(e)=>{
//                         e.preventDefault()
//                         
//                         
//                     }}>
//                                 <input type="submit" value={'Search'} style={{position:'fixed',right:'30px'}} className='btn mt-3 btn-primary mt-1  shadow-lg' />
//                         <div className='flex flex-row justify-content-between ml-2 ' style={{fontSize:'20px'}}>
//                             <input type="radio"  className='mr-2' name='ra' onChange={(e)=>{setRange(100)}} /><small>0-1000</small>
//                         </div>
//                         <div className='flex flex-row justify-content-between ml-2 ' style={{fontSize:'20px'}}>
//                             <input type="radio" className='mr-2'  name='ra'  onChange={(e)=>{setRange(1000)}} /><small>1001-5000</small>
//                         </div>
//                         <div className='flex flex-row justify-content-between ml-2 ' style={{fontSize:'20px'}}>
//                             <input type="radio" className='mr-2'  name='ra'  onChange={(e)=>{setRange(5000)}} /><small>5001-10,000</small>
//                         </div>
//                         <div className='flex flex-row justify-content-between ml-2 ' style={{fontSize:'20px'}}>
//                             <input type="radio" className='mr-2'  name='ra'  onChange={(e)=>{setRange(10000)}} /><small>10,000-50,000</small>
//                         </div>
//                         <div className='flex flex-row justify-content-between ml-2 ' style={{fontSize:'20px'}}>
//                             <input type="radio" className='mr-2'  name='ra'  onChange={(e)=>{setRange(50000)}} /><small>50,000-100000</small>
//                         </div>
//                         <div className='flex flex-row justify-content-between ml-2 ' style={{fontSize:'20px'}}>
//                             <input type="radio" className='mr-2'  name='ra'  onChange={(e)=>{setRange(100000)}} /><small>more 10000</small>
//                         </div>
                       
//                     </form>

//                     <h6 >Electronics</h6>
//                     <form className='ml-2' onSubmit={HandleSubmit}>
//                     {Electrinics.map((e)=>{
//                          return(
//                             <div className='flex flex-row justify-content-between ml-2 ' style={{fontSize:'20px'}}>
//                               <input type="radio" className='mr-2' name='ea'  value={e}  onChange={(e)=>{setEle(e.target.value)}} /><small>{e}</small>
//                             </div>
//                          )
//                     })}       
//                     </form>
//                     <h6 >Clothing</h6>
//                     <form className='ml-2' onSubmit={HandleSubmit}>
//                     {Clothing.map((e)=>{
                        
//                            return(
//                             <>
//                              <div className='flex flex-row justify-content-between ml-2 'style={{fontSize:'20px'}}>
//                                 <input type="radio" className='mr-2' value={e}  name='cl' onChange={(e)=>{setCloth(e.target.value)}} /><small>{e}</small>
//                             </div> 
//                             </>
//                            ) 
//                         })}
                       
                       
//                     </form>

//                     <h6 >Footware</h6>
//                     <form className='ml-2' onSubmit={HandleSubmit}>
//                     {Footware.map((e)=>{
//                         return(
//                          <>
//                          <div className='flex flex-row justify-content-between ml-2 ' style={{fontSize:'20px'}}>
//                             <input type="radio" className='mr-2'  name='fo' onChange={(e)=>{SetFoot(e.target.value)}} /><small>{e}</small>
//                         </div>
                       
//                          </>
//                         ) 
//                      })}
                    
//                     </form>
//                     <h6 >Accesories</h6>
//                     <form className='ml-2' onSubmit={HandleSubmit}>
//                     {Accesories.map((e)=>{
                        
//                         return(
//                          <>
//                           <div className='flex flex-row justify-content-between ml-2 'style={{fontSize:'20px'}}>
//                              <input type="radio" className='mr-2' value={e}  name='ac' onChange={(e)=>{setAcc(e.target.value)}} /><small>{e}</small>
//                          </div> 
//                          </>
//                         ) 
//                      })}
//                     </form>
//                     <h6 >Beauty_PersonCare</h6>
//                     <form className='ml-2' onSubmit={HandleSubmit}>
//                     {Beauty_PersonCare.map((e)=>{ 
//                         return(
//                          <>
//                           <div className='flex flex-row justify-content-between ml-2 'style={{fontSize:'20px'}}>
//                              <input type="radio" className='mr-2' value={e}  name='be' onChange={(e)=>{setBea(e.target.value)}} /><small>{e}</small>
//                          </div> 
//                          </>
//                         ) 
//                      })}
//                     </form>
//                     <h6 > Home_Kitchen</h6>
//                     <form className='ml-2' onSubmit={HandleSubmit}>
//                     {Home_Kitchen.map((e)=>{ 
//                         return(
//                          <>
//                           <div className='flex flex-row justify-content-between ml-2 'style={{fontSize:'20px'}}>
//                              <input type="radio" className='mr-2' value={e}  name='Hk' onChange={(e)=>{setHome(e.target.value)}} /><small>{e}</small>
//                          </div> 
//                          </>
//                         ) 
//                      })}
//                     </form>
//                     <h6 >Furnitures</h6>
//                     <form className='ml-2' onSubmit={HandleSubmit}>
//                     {Furniture.map((e)=>{ 
//                         return(
//                          <>
//                           <div className='flex flex-row justify-content-between ml-2 'style={{fontSize:'20px'}}>
//                              <input type="radio" className='mr-2' value={e}  name='fur' onChange={(e)=>{setFor(e.target.value)}} /><small>{e}</small>
//                          </div> 
//                          </>
//                         ) 
//                      })}
//                     </form>
//                     <h6 >Books_Music</h6>
//                     <form className='ml-2' onSubmit={HandleSubmit}>
//                     {Books_Music.map((e)=>{ 
//                         return(
//                          <>
//                           <div className='flex flex-row justify-content-between ml-2 'style={{fontSize:'20px'}}>
//                              <input type="radio" className='mr-2' value={e}  name='Bo' onChange={(e)=>{SetBook(e.target.value)}} /><small>{e}</small>
//                          </div> 
//                          </>
//                         ) 
//                      })}
//                     </form>
//                     <h6 >Sports</h6>
//                     <form className='ml-2' onSubmit={HandleSubmit}>
//                     {Sports.map((e)=>{ 
//                         return(
//                          <>
//                           <div className='flex flex-row justify-content-between ml-2 'style={{fontSize:'20px'}}>
//                              <input type="radio" className='mr-2' value={e}  name='spo' onChange={(e)=>{SetSport(e.target.value)}} /><small>{e}</small>
//                          </div> 
//                          </>
//                         ) 
//                      })}
//                     </form>
//                     <h6 >Health</h6>
//                     <form className='ml-2' onSubmit={HandleSubmit}>
//                     {Health.map((e)=>{ 
//                         return(
//                          <>
//                           <div className='flex flex-row justify-content-between ml-2 'style={{fontSize:'20px'}}>
//                              <input type="radio" className='mr-2' value={e}  name='Hl' onChange={(e)=>{setHel(e.target.value)}} /><small>{e}</small>
//                          </div> 
//                          </>
//                         ) 
//                      })}
//                     </form>
//                     <h6 >Toys&Games</h6>
//                     <form className='ml-2' onSubmit={HandleSubmit}>
//                     {Health.map((e)=>{ 
//                         return(
//                          <>
//                           <div className='flex flex-row justify-content-between ml-2 'style={{fontSize:'20px'}}>
//                              <input type="radio" className='mr-2' value={e}  name='tg' onChange={(e)=>{setToy(e.target.value)}} /><small>{e}</small>
//                          </div> 
//                          </>
//                         ) 
//                      })}
//                     </form>
//                 </sidebar>
            

//         </>
//     )
// }

// export default Filter
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Electrinics} from './Data.jsx'
import {Clothing} from './Data.jsx'
import {Footware} from './Data.jsx'
import {Accesories} from './Data.jsx'
import {Beauty_PersonCare} from './Data.jsx'
import {Home_Kitchen} from './Data.jsx'
import {Furniture} from './Data.jsx'
import {Books_Music} from './Data.jsx'
import {Sports} from './Data.jsx'
import {Health} from './Data.jsx'
import {Toys_Games} from './Data.jsx'
import { useNavigate } from 'react-router-dom'


const Filter = ({FilterData,HandleClick,Data2}) => {
    const [Range, SetRange] = useState([])
    const [Values, SetValues] = useState([])
    const HandleFiltering = () => {
        axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {

            const List = []
            Values.map((e) => {
                d.data.filter((e1) => {
                    if (e1.Product_Name.Category_Name === e) {
                        List.unshift(e1)
                    }
                })
            })
           
            const List2 = []
            Range.map((arr) => {
                if (arr.length == 2) {
                    d.data.map((e) => {
                        if ((Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))) >= arr[0] && (Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100)))) <= arr[1])) {
                            List2.unshift(e)
                        }
                    })
                } else {
                    d.data.map((e) => {
                        if (Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100))) >= arr[0]) {
                            List2.unshift(e)
                        }
                    })
                }
            })
           
            const TotalItems = [...List2, ...List];
            const Remove = [...new Set(TotalItems)];
            FilterData(Remove)
          

           

        }).catch((e) => {

        })
    }
    
    useEffect(() => {
    
        if (Range.length > 0) {
            HandleFiltering()
        }else if(Range.length==0&&Values.length==0){
            FilterData(Data2)
        }else if(Range.length==0||Values.length>1){
            HandleFiltering()
        }
    }, [Range])
    useEffect(() => {
        
        if (Values.length > 0) {
            HandleFiltering()
        }else if(Range.length==0&&Values.length==0){
            FilterData(Data2)
        }else if(Range.length>1||Values.length==0){
            HandleFiltering()
        }
    }, [Values])
    return (
          
        <> 
                <sidebar className='bg-primary' style={{ height: '100%', width: '25%', overflowY: 'auto', background: '#F5F7FA' }}>
                <div className='col-12 d-flex flex-row justify-content-end mt-2 '>
                            <i onClick={() => { 
                                 HandleClick()
                             }} class="fa-regular fa-circle-xmark p-1  text-white bg-danger" style={{ fontSize: '25px', borderRadius: '30px', position: 'fixed' }}></i>
                        </div>
                <h6 >Price Ranges</h6>
                <form className='ml-2' onSubmit={(e) => {
                    e.preventDefault()

                }}  >
                    <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                        <input type="checkbox" className='mr-2' name='ra' onChange={(e) => {
                            if (e.target.checked) {
                                
                               
                                const filter = [[0, 1000], ...Range]
                                SetRange(filter)

                            } else {
                                
                                 
                                const filter = Range.filter((e) => {
                                    if (e.includes(0)) {

                                    } else {
                                        return e
                                    }
                                })
                                SetRange(filter)
                            }
                        }} /><small>0-1000</small>
                    </div>
                    <div className='flex flex-row justify-content-between ml-2 ' onChange={(e) => {
                        if (e.target.checked) {
                             
                       
                            const filter = [[1001, 5000], ...Range]
                            SetRange(filter)

                        } else {
                          
                             
                            const filter = Range.filter((e) => {
                                if (e.includes(1001)) {

                                } else {
                                    return e
                                }
                            })
                            SetRange(filter)
                        }
                    }} style={{ fontSize: '20px' }}>
                        <input type="checkbox" className='mr-2' name='ra' /><small>1001-5000</small>
                    </div>
                    <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                        <input type="checkbox" className='mr-2' name='ra' onChange={(e) => {
                            if (e.target.checked) {
                                 
                           
                                const filter = [[5001, 10000], ...Range]
                                SetRange(filter)

                            } else {
                    
                                 
                                const filter = Range.filter((e) => {
                                    if (e.includes(5001)) {

                                    } else {
                                        return e
                                    }
                                })
                                SetRange(filter)
                            }
                        }} /><small>5001-10,000</small>
                    </div>
                    <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                        <input type="checkbox" className='mr-2' name='ra' onChange={(e) => {
                            if (e.target.checked) {
                                 
                               
                                const filter = [[10001, 50000], ...Range]
                                SetRange(filter)

                            } else {
                              
                                 
                                const filter = Range.filter((e) => {

                                    if (e.includes(10001)) {

                                    } else {
                                        return e
                                    }
                                })
                                SetRange(filter)
                            }
                        }} /><small>10,001-50,000</small>
                    </div>
                    <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                        <input type="checkbox" className='mr-2' name='ra' onChange={(e) => {
                            if (e.target.checked) {
                                 
                                
                                const filter = [[50001, 100000], ...Range]
                                SetRange(filter)

                            } else {
                               
                                 
                                const filter = Range.filter((e) => {

                                    if (e.includes(50001)) {

                                    } else {
                                        return e
                                    }
                                })
                                SetRange(filter)
                            }
                        }} /><small>50,001-100000</small>
                    </div>
                    <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                        <input type="checkbox" className='mr-2' name='ra' onChange={(e) => {
                            if (e.target.checked) {
                                 
                                const filter = [[100001], ...Range]
                                SetRange(filter)

                            } else {
                                 
                                const filter = Range.filter((e) => {
                                    if (e.includes(100001)) {

                                    } else {
                                        return e
                                    }
                                })
                                SetRange(filter)
                            }
                        }} /><small>more 10000</small>
                    </div>

                </form>

                <h6 >Electronics</h6>
                <form className='ml-2'  >
                    {Electrinics.map((e) => {
                        return (
                            <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                <input type="checkbox" className='mr-2' name='ea' value={e} onChange={(e) => {
                                    if (e.target.checked) {
                                        const filter = [e.target.value, ...Values]
                                        SetValues(filter)
                                    } else {
                                        const filter = Values.filter((e1) => {
                                            return e1 != e.target.value
                                        })
                                        SetValues(filter)
                                    }
                                }} /><small>{e}</small>
                            </div>
                        )
                    })}
                </form>
                <h6 >Clothing</h6>
                <form className='ml-2'  >
                    {Clothing.map((e) => {

                        return (
                            <>
                                <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                    <input type="checkbox" className='mr-2' value={e} name='cl' onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                                </div>
                            </>
                        )
                    })}


                </form>

                <h6 >Footware</h6>
                <form className='ml-2'  >
                    {Footware.map((e) => {
                        return (
                            <>
                                <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                    <input type="checkbox" className='mr-2' name='fo' value={e} onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                                </div>

                            </>
                        )
                    })}

                </form>
                <h6 >Accesories</h6>
                <form className='ml-2'  >
                    {Accesories.map((e) => {

                        return (
                            <>
                                <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                    <input type="checkbox" className='mr-2' value={e} name='ac' onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                                </div>
                            </>
                        )
                    })}
                </form>
                <h6 >Beauty_PersonCare</h6>
                <form className='ml-2'  >
                    {Beauty_PersonCare.map((e) => {
                        return (
                            <>
                                <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                    <input type="checkbox" className='mr-2' value={e} name='be' onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                                </div>
                            </>
                        )
                    })}
                </form>
                <h6 > Home_Kitchen</h6>
                <form className='ml-2'  >
                    {Home_Kitchen.map((e) => {
                        return (
                            <>
                                <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                    <input type="checkbox" className='mr-2' value={e} name='Hk' onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                                </div>
                            </>
                        )
                    })}
                </form>
                <h6 >Furnitures</h6>
                <form className='ml-2'  >
                    {Furniture.map((e) => {
                        return (
                            <>
                                <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                    <input type="checkbox" className='mr-2' value={e} name='fur' onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                                </div>
                            </>
                        )
                    })}
                </form>
                <h6 >Books_Music</h6>
                <form className='ml-2'  >
                    {Books_Music.map((e) => {
                        return (
                            <>
                                <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                    <input type="checkbox" className='mr-2' value={e} name='Bo' onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                                </div>
                            </>
                        )
                    })}
                </form>
                <h6 >Sports</h6>
                <form className='ml-2'  >
                    {Sports.map((e) => {
                        return (
                            <>
                                <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                    <input type="checkbox" className='mr-2' value={e} name='spo' onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                                </div>
                            </>
                        )
                    })}
                </form>
                <h6 >Health</h6>
                <form className='ml-2'  >
                    {Health.map((e) => {
                        return (
                            <>
                                <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                    <input type="checkbox" className='mr-2' value={e} name='Hl' onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                                </div>
                            </>
                        )
                    })}
                </form>
                <h6 >Toys&Games</h6>
                <form className='ml-2'  >
                    {Health.map((e) => {
                        return (
                            <>
                                <div className='flex flex-row justify-content-between ml-2 ' style={{ fontSize: '20px' }}>
                                    <input type="checkbox" className='mr-2' value={e} name='tg' onChange={(e) => {
                                        if (e.target.checked) {
                                            const filter = [e.target.value, ...Values]
                                            SetValues(filter)
                                        } else {
                                            const filter = Values.filter((e1) => {
                                                return e1 != e.target.value
                                            })
                                            SetValues(filter)
                                        }
                                    }} /><small>{e}</small>
                                </div>
                            </>
                        )
                    })}
                </form>
                </sidebar>
            

        </>
    )
}

export default Filter













