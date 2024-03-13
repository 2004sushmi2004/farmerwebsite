import {React,useState,useEffect} from 'react'

const Right = ({item}) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    totalAmount();
  }, [item]);

  const totalAmount = () => {
    let totalPrice = 0;

    // Check if 'item' is not null or undefined and is an array
    if (item && Array.isArray(item)) {
      item.forEach((item) => {
        // Check if 'item' is not null or undefined and has 'price' property
        if (item && item.price) {
          // Check if 'item.price' is not null or undefined and has 'cost' property
          if (typeof item.price.cost === 'number') {
            totalPrice += item.price.cost;
          }
        }
      });
    }

    setPrice(totalPrice);
  }
  return <div className="right_buy">
    <div className="cost_right">
        <p>Your order is eligible for free delivery</p>
        <span style={{color:"#565959"}}>Select this option at checkout. Details
        </span>
        <h3>Subtotal({item.length}items):<span style={{fontWeight:700}}>Rs {price}.00</span></h3>
        <button className="rightbuy_btn">Proceed to Buy</button>
    </div>
      
    </div>;
  
};

export default Right