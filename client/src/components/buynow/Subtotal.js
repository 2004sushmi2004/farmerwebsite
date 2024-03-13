import React, { useState, useEffect } from 'react';

const Subtotal = ({ item }) => {
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
  };

  return (
    <div className='sub_item'>
      <h3>
        Subtotal ({item.length}items):{' '}
        <strong span style={{ fontWeight: 700, color: '#111' }}>Rs {price}.00</strong>
      </h3>
    </div>
  );
};

export default Subtotal;
