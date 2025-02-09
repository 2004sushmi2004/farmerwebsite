import React, { useEffect, useState } from 'react';
import "./buynow.css";
import { Divider } from '@mui/material';
import Option from './Option';
import Subtotal from './Subtotal';
import Right from './Right';

const Buynow = () => {
  const [cartdata, setCartdata] = useState([]);

  const getdatabuy = async () => {
    
    const res=await fetch("/cartdetails",{
      method:"GET",
      headers:{
        Accept:"application/json",
        "Content-type":"application/json"
      },credentials:"include"
    })
    const data=await res.json();
    if(res.status !==201){
      console.log("error");
    }else{
      setCartdata(data.carts);
    }
  };

  useEffect(() => {
    getdatabuy();
  }, []);

  return (
    <>
      {cartdata.length ? (
        <div className="buynow_section">
          <div className="buynow_container">
            <div className="left_buy">
              <h1>Shopping Cart</h1>
              <p>Select all items</p>
              <span className='leftbuyprice'>Price</span>
              <Divider />
              {cartdata.map((e, k) => {
  // Check if 'e' is not null or undefined before accessing properties
  if (e && e.title) {
    return (
      <div key={k} className="item_containert">
        <img src={e.url} alt="" />
        <div className="item_details">
          <h3>{e.title.longTitle}</h3>
          {e.title.shortTitle && <h3>{e.title.shortTitle}</h3>}
          <h3 className='diffrentprice'>Rs 150.00</h3>
          <p className='unusuall'>Usually dispatched in 5 days</p>
          <p>Eligible for FREE Shipping</p>
          <Option deletedata={e.id} get={getdatabuy}/>
        </div>
        <h3 className='item_price'>Rs {e.price && e.price.cost}</h3>
      </div>
    );
  } else {
    return null; // Skip rendering if 'e' or 'e.title' is null or undefined
  }
})}
                
              <Divider />
              <Subtotal  item={cartdata}/>
            </div>
            <Right item={cartdata}/>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Buynow