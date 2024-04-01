
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart } from '../../cartSlice'; 

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [orderConfirmation, setOrderConfirmation] = useState('');

  const confirmOrder = async () => {
    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      const orderResponse = await fetch("https://airbean-9pcyw.ondigitalocean.app/api/beans/order", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: items.map(item => item.id) }), 
      });
      const orderData = await orderResponse.json();
      const orderNr = orderData.orderNr;

      const statusResponse = await fetch(`https://airbean-9pcyw.ondigitalocean.app/api/beans/order/status/${orderNr}`);
      const statusData = await statusResponse.json();
      console.log(statusData);

      setOrderConfirmation(`Your order is on the way! ETA: ${statusData.eta}`);
      dispatch(clearCart());
    } catch (error) {
      console.error("Error confirming order:", error);
      setOrderConfirmation('no found Please try again.');
    }
  };

  return (
    <div>
      <h2>Cart ({items.length} items)</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.title} - ${item.price}
            <button onClick={() => dispatch(removeItem(item.id))}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={confirmOrder}>Confirm Order</button>
      {orderConfirmation && <p>{orderConfirmation}</p>}
    </div>
  );
};

export default Cart;
