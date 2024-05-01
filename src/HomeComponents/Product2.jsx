import React, { useEffect, useRef, useState } from 'react'
import { Mobile_Data } from '../Data/Mobile_Data'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './Producsts.css'

class TruncateWords extends React.Component {
    truncateWords = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        const truncated = text.substr(0, text.lastIndexOf(' ', maxLength));
        return truncated + '...';
    };

    render() {
        const { text, maxLength } = this.props;
        const truncatedText = this.truncateWords(text, maxLength);

        return <span style={{ color: 'gray', fontFamily: 'monospace' }}>{truncatedText}</span>;
    }
}
const Product2 = () => {
    const navigate = useNavigate()
    const [Data2, setData2] = useState(null)
    const [scrollPosition, setScrollPosition] = useState(0);
    const [step, setStep] = useState(0);
    const containerRef = useRef(null);
    const columnRef = useRef(null);
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {
            const filter = d.data.filter((e) => {
                return e.Product_Name.Category.toLowerCase().includes('Electro'.toLowerCase()) && e.Product_Name.Rating >= 0 && e.Product_Name.Category_Name.includes('Mobil')
            })

            const filter2 = filter.sort((e, e1) => {
                return e1.Product_Name.Rating - e.Product_Name.Rating
            })
            setData2(filter2)
        }).catch((e) => {

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
                    <h6 className='p-2'>Top Rated Mobiles</h6>
                    <div className=''>
                    <span className='btn  mr-3' onClick={() => handleScroll('left')} style={{background:'lightgray '}}   ><i class="fa-solid fa-angles-left"></i></span>
                        <span className='btn btn- ml-2' onClick={() => handleScroll('right')} style={{background:'lightgray '}} ><i class="fa-solid fa-angles-right"></i></span>
                    </div>
                </div>
                <div id='scroll-container' ref={containerRef} className='d-flex flex-row p-2' style={{ overflowX: 'auto', scrollbarWidth: 'none' }}>
                    {Data2 && Data2.slice(0, 10).map((e, ind) => {
                        return (
                            <>
                                <div style={{ width: '50px', background: 'red', visibility: 'hidden' }}>
                                    ffrtsdfgdsfg
                                </div>
                                <div ref={columnRef} className='card col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2   pdis' style={{ height: '230px', boxShadow: '0px 0px 10px 5px lightgray ' }}>
                                    <LazyLoadImage className='p-3 ml-auto mr-auto zoom-effect' src={e.ImageUrl} onClick={() => { navigate('/Dis', { state: { data: e } }) }} alt="Description of the image" effect="blur" height={'80%'} width={'100%'} style={{ cursor: 'pointer' }} />

                                    <small className='ml-auto mr-auto mt-auto mb-auto'><TruncateWords text={e.Product_Name.Product_Name} maxLength={15} /></small>
                                    <div className='d-flex flex-row ml-auto mr-auto mt-auto mb-auto'>
                                        <small className='text-success'><i class="fa-solid fa-indian-rupee-sign"></i>{Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100)))}</small>
                                        <small className='text- mt-auto mb-auto ml-1'><del><i class="fa-solid fa-indian-rupee-sign "></i>{e.Product_Name.Price}</del></small >
                                    </div>
                                    {e.Product_Name.Rating > 0 && <>
                                        <div style={{ position: 'absolute', top: '10px' }}>
                                            <div style={{ width: '50px', height: '30px', background: 'green', borderRadius: '7px' }} className='d-flex flex-row shadow-lg p-1 text-center'>
                                                <p className='text-white'><small>{e.Product_Name.Rating.slice(0,3)}</small></p><i style={{ fontSize: '15px' }} class=" ml-auto mt-auto mb-auto fa-regular fa-star text-white"></i>
                                            </div>
                                        </div>
                                    </>}
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