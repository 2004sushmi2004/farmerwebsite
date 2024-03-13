import React, { useEffect } from 'react'
import Banner from './Banner'
import "./home.css";
import Slide from './Slide';
import { getProducts } from '../redux/actions/action';
import {useDispatch,useSelector} from "react-redux"



const Maincomp = () => {


    const { products } = useSelector(state => state.getproductsdata);
    // console.log(products);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])


    return (
        <>
            <div className="home_section">
                <div className="banner_part">
                    <Banner />
                </div>

                <div className="slide_part">
                    <div className="left_slide">
                        <Slide title="Deal of the day" products={products}/>
                    </div>
                    <div className="right_slide">
                        <h4>Exclusive Offers</h4>
                        <img src="https://pbs.twimg.com/media/DsGdECxVYAACk5L.jpg" alt="" />
                        <a href="#">see More</a>
                    </div>
                </div>
                <Slide  title="Today's Deal" products={products}/>
                <div className="center_img">
                    <img src="https://www.racheldavid-design.com/imgs/cover%20photos/600x400-FarmFresh.webp" height="200px" width="100%"/>
                </div>
                <Slide  title="Best Seller" products={products}/>
                <Slide  title="Upto 80% off" products={products}/>
                
                

            </div>

        </>
    )
}

export default Maincomp;
