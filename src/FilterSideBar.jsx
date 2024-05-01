import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Electrinics } from './Data.jsx'
import { Clothing } from './Data.jsx'
import { Footware } from './Data.jsx'
import { Accesories } from './Data.jsx'
import { Beauty_PersonCare } from './Data.jsx'
import { Home_Kitchen } from './Data.jsx'
import { Furniture } from './Data.jsx'
import { Books_Music } from './Data.jsx'
import { Sports } from './Data.jsx'
import { Health } from './Data.jsx'
import { Toys_Games } from './Data.jsx'

const FilterSideBar = ({ FilterData }) => {
    const [Range, SetRange] = useState([])
    const [Values, SetValues] = useState([])
    const [Refresh, SetRefresh] = useState([])
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
           
            const TotalItems = [...List, ...List2];
            const Remove = [...new Set(TotalItems)];
            FilterData(Remove)
          

           


        }).catch((e) => {

        })
    }
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d)=>{
             SetRefresh(d.data)
        }).catch((e)=>{

        })
    },[])
    useEffect(() => {
        if (Range.length > 0) {
            HandleFiltering()
        }else if(Range.length==0&&Values.length==0){
            FilterData(Refresh)
        }else if(Range.length==0||Values.length>1){
            HandleFiltering()
        }
    }, [Range])
    useEffect(() => {
        if (Values.length > 0) {
            HandleFiltering()
        }else if(Range.length==0&&Values.length==0){
            FilterData(Refresh)
        }else if(Range.length>1||Values.length==0){
            HandleFiltering()
        }
    }, [Values])



    return (
        <>
            <sidebar className='bg-light' style={{ height: '100%', width: '100%', overflowY: 'auto', scrollbarWidth: 'none', background: '#F5F7FA' }}>
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

export default FilterSideBar