import React from 'react'
import {Accesories, Catigories} from '../Data.jsx'
import {Electrinics} from '../Data.jsx'
import {Clothing} from '../Data.jsx'
import {Footware} from '../Data.jsx'
import {Beauty_PersonCare} from '../Data.jsx'
import {Home_Kitchen} from '../Data.jsx'
import {Furniture} from '../Data.jsx'
import {Books_Music} from '../Data.jsx'
import {Toys_Games} from '../Data.jsx'
import {Sports} from '../Data.jsx'
import {Health} from '../Data.jsx'
import {Images} from '../Data.jsx'


function Category({HandleOverCat,HandleRemove}) {
const HandleOver=(e)=>{

    if(e.includes("Elec")){
        HandleOverCat(Electrinics)
    }else if(e.includes("Foot")){
        HandleOverCat(Footware)
    }
    else if(e.includes("Clot")){
        HandleOverCat(Clothing)
    }
    else if(e.includes("Beau")){
        HandleOverCat(Beauty_PersonCare)
    }
    else if(e.includes("Home")){
        HandleOverCat(Home_Kitchen)
    }
    else if(e.includes("Acc")){
        HandleOverCat(Accesories)
    }
    else if(e.includes("Foot")){
        HandleOverCat(Footware)
    }
    else if(e.includes("Furni")){
        HandleOverCat(Furniture)
    }
    else if(e.includes("Book")){
        HandleOverCat(Books_Music)
    }
    else if(e.includes("Spor")){
        HandleOverCat(Sports)
    }else if(e.includes("Health")){
        HandleOverCat(Health)
    }
    else if(e.includes("Toy")){
        HandleOverCat(Toys_Games)
    }
}

  return (
    <>
        <div className='d-flex flex-row' style={{overflow:'auto',scrollbarWidth:'none'}}>
                {Catigories.map((e,ind)=>{
                    return(
                        <>
                           <div onMouseEnter={()=>{
                               HandleOver(e)
                           }}  className='ml-3' style={{height:'100px',width:'170px',textWrap:'wrap',textAlign:'center'}}>
                                  <img  src={Images[ind]} style={{height:'80%',width:'90%',borderRadius:'20px'}} alt="" srcset="" />
                                  <small style={{width:'100%'}}><small><small>{e}</small></small><i class="fa-solid fa-angle-down ml-2"></i></small>
                           </div>
                        </>
                    )
                })}
        </div>
    </>
  )
}

export default Category