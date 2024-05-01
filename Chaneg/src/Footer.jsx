import React from 'react'

function Footer() {
    return (
        <>
            <div className='container-fluid d-sm-flex flex-sm-column  f d-lg-flex flex-lg-row bg-success' style={{overflowX:'hidden'}}>
                <div className='col-sm-12 col-lg-2 text-center text-white d-flex flex-column'>
                    <h6 className='text-warning'>Help</h6>
                    <span className='mt-3'>Payments</span>
                    <span className='mt-3'>Shipping</span>
                    <span className='mt-3'>Cancellation</span>
                    <span className='mt-3'>FAQ</span>
                    <span className='mt-3'>Report Infringement</span>

                </div>
                <div className='col-sm-12 col-lg-2 text-center text-white d-flex flex-column'>
                    <h6 className='text-warning'>Plocy</h6>
                    <span className='mt-3'>Terms Of Use</span>
                    <span className='mt-3'>Security</span>
                    <span className='mt-3'>Cancellation</span>
                    <span className='mt-3'>Privacy</span>
                    <span className='mt-3'>Sitemap</span>
                </div>
                <div className='col-sm-12 col-lg-2 text-center text-white d-flex flex-column'>
                    <h6 className='text-warning'>About</h6>
                    <span className='mt-3'>Contact Us</span>
                    <span className='mt-3'>About Us</span>
                    <span className='mt-3'>Careers</span>
                    <span className='mt-3'>Flipkart Stories</span>
                    <span className='mt-3'>Press</span>
                    

                </div>

                <div className='col-sm-12 col-lg-3 text-center d-flex flex-column text-white'>
                    <h6 className='text-warning'>Contact US</h6>
                    <span  className='mt-3'> <i class="fa-solid fa-location-dot ml-3"></i>    60, 29th Street, San Francisco, CA 94110, United States of America</span>
                   <span  className='mt-3'><i class="fa-solid fa-phone-volume"></i>  (+00) 123-456-789</span>
                   <span  className='mt-3'><i class="fa-regular fa-envelope"></i>  demo@example.com</span>


                </div>

                <div className='col-sm-12 col-lg-3 text-center'>
                    <h6 className='text-warning'>Subscribe Now</h6>
                    <span>Subscribe to our newsletterget 10% off your first purchase at here for update.</span>
                </div>

            </div>
            <div className='card-footer bg-primary d-sm-flex flex-sm-column d-lg-flex flex-lg-row text-white justify-content-between'>
            <span>Pricing Table </span> <span>|</span><span>Typography</span><span>|</span> <span>Sitemap</span><span>|</span> <span>Services</span>
<span>Copyright © 2024 Templatemela</span>
            </div>

        </>
    )
}

export default Footer