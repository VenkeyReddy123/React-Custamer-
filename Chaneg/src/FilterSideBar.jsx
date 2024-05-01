import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

const FilterSideBar = ({FilterData}) => {
    const navigate=useNavigate()
    const [Range,setRange]=useState(0)
    const [Ele,setEle]=useState('')
    const [Home,setHome]=useState('')
    const [Cloth,setCloth]=useState('')
    const [For,setFor]=useState('')
    const [Toy,setToy]=useState('')
    const [Hel,setHel]=useState('') 
    const [Foot,SetFoot]=useState("")
    const[Acc,setAcc]=useState('')
    const[Bea,setBea]=useState("")
    const[Books,SetBook]=useState("")
    const[Sport,SetSport]=useState("")

    const HandleSubmit=(e)=>{
        const Arr=[Ele,Home,Cloth,For,Toy,Hel,Foot,Acc,Bea,Books,Sport]
        const Values=[]
         for(let word of Arr){
            if(word){
               Values.push(word)
            }
         }
         const Func=false
         HandleFilters(Values,Range)
       }
       const HandleFilters = (Values, Range) => {
        axios.get("http://127.0.0.1:8000/ProductDispalyView/")
            .then((data) => {
                const dataFiltered = data.data.filter((e) => {
                    let condition = false;
                    for (let word of Values) {
                        if (
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
                window.location.reload()
            
                navigate("/Product",{state:{Filter:dataFiltered}})    
                 
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
               
            })  
             
    };
    
   
 
  return (
    <>
     <sidebar className='bg-light' style={{ height: '100%', width: '100%', overflowY: 'auto',scrollbarWidth:'none',background: '#F5F7FA' }}>
     <h6 >Price Ranges</h6>
                    <form className='ml-2' onSubmit={(e)=>{
                      e.preventDefault()
                      HandleSubmit()
                    }}  >
                                <input type="submit" value={'Search'} style={{position:'fixed',left:'15%'}} className='btn mt-3 btn-primary mt-1  shadow-lg' />
                        <div className='flex flex-row justify-content-between ml-2 ' style={{fontSize:'20px'}}>
                            <input type="radio"  className='mr-2' name='ra' onChange={(e)=>{setRange(100)}} /><span>0-1000</span>
                        </div>
                        <div className='flex flex-row justify-content-between ml-2 ' style={{fontSize:'20px'}}>
                            <input type="radio" className='mr-2'  name='ra'  onChange={(e)=>{setRange(1000)}} /><span>1001-5000</span>
                        </div>
                        <div className='flex flex-row justify-content-between ml-2 ' style={{fontSize:'20px'}}>
                            <input type="radio" className='mr-2'  name='ra'  onChange={(e)=>{setRange(5000)}} /><span>5001-10,000</span>
                        </div>
                        <div className='flex flex-row justify-content-between ml-2 ' style={{fontSize:'20px'}}>
                            <input type="radio" className='mr-2'  name='ra'  onChange={(e)=>{setRange(10000)}} /><span>10,000-50,000</span>
                        </div>
                        <div className='flex flex-row justify-content-between ml-2 ' style={{fontSize:'20px'}}>
                            <input type="radio" className='mr-2'  name='ra'  onChange={(e)=>{setRange(50000)}} /><span>50,000-100000</span>
                        </div>
                        <div className='flex flex-row justify-content-between ml-2 ' style={{fontSize:'20px'}}>
                            <input type="radio" className='mr-2'  name='ra'  onChange={(e)=>{setRange(100000)}} /><span>more 10000</span>
                        </div>
                       
                    </form>

                    <h6 >Electronics</h6>
                    <form className='ml-2'  >
                    {Electrinics.map((e)=>{
                         return(
                            <div className='flex flex-row justify-content-between ml-2 ' style={{fontSize:'20px'}}>
                              <input type="radio" className='mr-2' name='ea'  value={e}  onChange={(e)=>{setEle(e.target.value)}} /><span>{e}</span>
                            </div>
                         )
                    })}       
                    </form>
                    <h6 >Clothing</h6>
                    <form className='ml-2'  >
                    {Clothing.map((e)=>{
                        
                           return(
                            <>
                             <div className='flex flex-row justify-content-between ml-2 'style={{fontSize:'20px'}}>
                                <input type="radio" className='mr-2' value={e}  name='cl' onChange={(e)=>{setCloth(e.target.value)}} /><span>{e}</span>
                            </div> 
                            </>
                           ) 
                        })}
                       
                       
                    </form>

                    <h6 >Footware</h6>
                    <form className='ml-2'  >
                    {Footware.map((e)=>{
                        return(
                         <>
                         <div className='flex flex-row justify-content-between ml-2 ' style={{fontSize:'20px'}}>
                            <input type="radio" className='mr-2'  name='fo' onChange={(e)=>{SetFoot(e.target.value)}} /><span>{e}</span>
                        </div>
                       
                         </>
                        ) 
                     })}
                    
                    </form>
                    <h6 >Accesories</h6>
                    <form className='ml-2'  >
                    {Accesories.map((e)=>{
                        
                        return(
                         <>
                          <div className='flex flex-row justify-content-between ml-2 'style={{fontSize:'20px'}}>
                             <input type="radio" className='mr-2' value={e}  name='ac' onChange={(e)=>{setAcc(e.target.value)}} /><span>{e}</span>
                         </div> 
                         </>
                        ) 
                     })}
                    </form>
                    <h6 >Beauty_PersonCare</h6>
                    <form className='ml-2'  >
                    {Beauty_PersonCare.map((e)=>{ 
                        return(
                         <>
                          <div className='flex flex-row justify-content-between ml-2 'style={{fontSize:'20px'}}>
                             <input type="radio" className='mr-2' value={e}  name='be' onChange={(e)=>{setBea(e.target.value)}} /><span>{e}</span>
                         </div> 
                         </>
                        ) 
                     })}
                    </form>
                    <h6 > Home_Kitchen</h6>
                    <form className='ml-2'  >
                    {Home_Kitchen.map((e)=>{ 
                        return(
                         <>
                          <div className='flex flex-row justify-content-between ml-2 'style={{fontSize:'20px'}}>
                             <input type="radio" className='mr-2' value={e}  name='Hk' onChange={(e)=>{setHome(e.target.value)}} /><span>{e}</span>
                         </div> 
                         </>
                        ) 
                     })}
                    </form>
                    <h6 >Furnitures</h6>
                    <form className='ml-2'  >
                    {Furniture.map((e)=>{ 
                        return(
                         <>
                          <div className='flex flex-row justify-content-between ml-2 'style={{fontSize:'20px'}}>
                             <input type="radio" className='mr-2' value={e}  name='fur' onChange={(e)=>{setFor(e.target.value)}} /><span>{e}</span>
                         </div> 
                         </>
                        ) 
                     })}
                    </form>
                    <h6 >Books_Music</h6>
                    <form className='ml-2'  >
                    {Books_Music.map((e)=>{ 
                        return(
                         <>
                          <div className='flex flex-row justify-content-between ml-2 'style={{fontSize:'20px'}}>
                             <input type="radio" className='mr-2' value={e}  name='Bo' onChange={(e)=>{SetBook(e.target.value)}} /><span>{e}</span>
                         </div> 
                         </>
                        ) 
                     })}
                    </form>
                    <h6 >Sports</h6>
                    <form className='ml-2'  >
                    {Sports.map((e)=>{ 
                        return(
                         <>
                          <div className='flex flex-row justify-content-between ml-2 'style={{fontSize:'20px'}}>
                             <input type="radio" className='mr-2' value={e}  name='spo' onChange={(e)=>{SetSport(e.target.value)}} /><span>{e}</span>
                         </div> 
                         </>
                        ) 
                     })}
                    </form>
                    <h6 >Health</h6>
                    <form className='ml-2'  >
                    {Health.map((e)=>{ 
                        return(
                         <>
                          <div className='flex flex-row justify-content-between ml-2 'style={{fontSize:'20px'}}>
                             <input type="radio" className='mr-2' value={e}  name='Hl' onChange={(e)=>{setHel(e.target.value)}} /><span>{e}</span>
                         </div> 
                         </>
                        ) 
                     })}
                    </form>
                    <h6 >Toys&Games</h6>
                    <form className='ml-2'  >
                    {Health.map((e)=>{ 
                        return(
                         <>
                          <div className='flex flex-row justify-content-between ml-2 'style={{fontSize:'20px'}}>
                             <input type="radio" className='mr-2' value={e}  name='tg' onChange={(e)=>{setToy(e.target.value)}} /><span>{e}</span>
                         </div> 
                         </>
                        ) 
                     })}
                    </form>
                </sidebar>

    </>
  )
}

export default FilterSideBar