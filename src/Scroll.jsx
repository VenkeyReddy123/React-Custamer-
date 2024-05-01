import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';

const Scroll = () => {
    const [data, setData] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [step, setStep] = useState(0);
    const containerRef = useRef(null);
    const columnRef = useRef(null);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/ProductDispalyView/")
            .then((response) => {
                setData(response.data.slice(0, 20));
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                alert('Please Try Again Later, Something Went Wrong');
            });
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        const column = columnRef.current;
        if (!container || !column) return;

        const containerWidth = container.offsetWidth;
        const colWidth = column.offsetWidth;

        setStep(colWidth);
    }, [data]);

    const handleScroll = (direction) => {
        const container = containerRef.current;
        if (!container) return;

        if (direction === 'right') {
            if (scrollPosition < data.length - 1) {
                container.scrollTo({
                    left: container.scrollLeft + step+30,
                    behavior: 'smooth',
                });
                setScrollPosition(scrollPosition + 1);
            }
        } else if (direction === 'left') {
            if (scrollPosition > 0) {
                container.scrollTo({
                    left: container.scrollLeft - step+30,
                    behavior: 'smooth',
                });
                setScrollPosition(scrollPosition - 1);
            }
        }
    };

    return (
        <div>
            <button onClick={() => handleScroll('left')}>Left</button>
                <button onClick={() => handleScroll('right')}>Right</button>
            <div id='scroll-container' ref={containerRef} style={{ display: 'flex', overflowX: 'auto', width: '100%',scrollbarWidth:'none' }}>
                
                {data.map((item, index) => (
                    <div className='col-6 col-md-3 col-lg-2 mt-5 column' ref={columnRef} key={index} style={{ height: '250px', margin: '0 10px' }}>
                        <img src={item.ImageUrl} alt="" height={'90%'} width={'100%'} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Scroll;

    



