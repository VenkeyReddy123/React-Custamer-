import React, { useEffect, useRef, useState } from 'react'
import { Mobile_Data } from '../Data/Mobile_Data'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Img1 from './Assets/heart.svg'
import ResizedImage from './ResizedImage';
import './Producsts.css'

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';



class TruncateWords extends React.Component {
    truncateWords = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        const truncated = text.substr(0, text.lastIndexOf(' ', maxLength));
        return truncated + '...';
    };

    render() {
        const { text, maxLength } = this.props;
        const truncatedText = this.truncateWords(text, maxLength);

        return <small style={{ fontWeight: 'bolder', color: 'gray' }}>{truncatedText}</small>;
    }
}

const Products = () => {
    const navigate = useNavigate()
    const [Data2, setData2] = useState(null)
    const [scrollPosition, setScrollPosition] = useState(0);
    const [step, setStep] = useState(0);
    const containerRef = useRef(null);
    const columnRef = useRef(null);
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/TopDealsDetails/").then((d) => {

            setData2(d.data)


        }).catch((e) => {
            alert('Please Try AGian Later Somthing Eroor')
        })

    }, [])
    useEffect(() => {
        const container = containerRef.current;
        const column = columnRef.current;
        if (!container || !column) return;

        const containerWidth = container.offsetWidth;
        const colWidth = column.offsetWidth;

        setStep(colWidth);
    }, [Data2]);
    const handleScroll = (direction) => {
        const container = containerRef.current;
        if (!container) return;

        if (direction === 'right') {
            if (scrollPosition < Data2.length - 1) {
                container.scrollTo({
                    left: container.scrollLeft + step + 60,
                    behavior: 'smooth',
                });
                setScrollPosition(scrollPosition + 1);
            }
        } else if (direction === 'left') {
            if (scrollPosition > 0) {
                container.scrollTo({
                    left: container.scrollLeft - step - 55,
                    behavior: 'smooth',
                });
                setScrollPosition(scrollPosition - 1);
            }
        }
    };

    return (
        <>
            <div className='col-12' >
                {Data2 && <></>}
                <div className='col-12 d-flex flex-row justify-content-between'>
                    <h6 className='p-2'>Top Deals</h6>
                    <div className=''>
                    <span className='btn  mr-3' onClick={() => handleScroll('left')} style={{background:'lightgray '}}   ><i class="fa-solid fa-angles-left"></i></span>
                        <span className='btn btn- ml-2' onClick={() => handleScroll('right')} style={{background:'lightgray '}} ><i class="fa-solid fa-angles-right"></i></span>
                    </div>
                </div>
                <div id='scroll-container' ref={containerRef} className='d-flex flex-row p-2' style={{ overflowX: 'auto', scrollbarWidth: 'none' }}>
                    {Data2 && Data2.slice().reverse().slice(0, 10).map((e, ind) => {
                        return (
                            <>
                                <div style={{  width: '50px', background: 'red', visibility: 'hidden' }}>
                                    ffrtsdfgdsfg
                                </div>
                                <div ref={columnRef} className='card col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2  pdis ' style={{ height: '230px', boxShadow: '0px 0px 5px 2px lightgray ' }}>

                                    <LazyLoadImage className='p-3 ml-auto mr-auto zoom-effect' src={e.ImageUrl.ImageUrl} onClick={() => { navigate('/Dis', { state: { data: e } }) }} alt="Description of the image" effect="blur" height={'80%'} width={'100%'} style={{ cursor: 'pointer' }} />
                                    <small className='ml-auto mr-auto mt-auto mb-auto'><TruncateWords text={e.Product_Name.Product_Name} maxLength={20} /></small>
                                    <div className='d-flex flex-row ml-auto mr-auto mt-auto mb-auto'>
                                        <small className='text-success'><i class="fa-solid fa-indian-rupee-sign"></i>{Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100)))}</small>
                                        <small className='text- mt-auto mb-auto ml-1'><del><i class="fa-solid fa-indian-rupee-sign "></i>{e.Product_Name.Price}</del></small >
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
