import React from 'react'
import Carousel from 'react-material-ui-carousel'
import "./banner.css"

const data = [
   "https://c8.alamy.com/comp/2HPTK50/horizontal-seamless-pattern-from-healthy-fruits-vegetables-and-berries-isolated-on-white-2HPTK50.jpg",
    "https://img.freepik.com/premium-vector/horizontal-flat-banner-organic-fertilizer-spikes_82574-2817.jpg?w=2500&h=400",
    "https://img.freepik.com/free-vector/flat-agriculture-company-sale-banner-template_23-2149720636.jpg?w=2800&h=400"
]

const Banner = () => {
  return (
    <Carousel
    className='carasousel'
    autoPlay={true}
    animation='slide'
    indicators={false}
    navButtonsAlwaysVisible={true}
    cycleNavigation={true}
    navButtonProps={{
        style:{
            backgroundColor:"#fff",
            color:"#494949",
            borderRadius:0,
            marginTop:-22,
            height:"104px"
        }
    }}>
 {
     data.map((imag, i) => {
         return (
                 <>
                     <img src={imag} alt="img" key={i} className="banner_img" />
                </>
                       
                )
            })
                
}
    </Carousel>
    
  )
}

export default Banner
