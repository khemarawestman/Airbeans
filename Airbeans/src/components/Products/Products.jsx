
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { addItem } from '../../cartSlice'; 
function Products() {
  const [menu, setMenu] = useState([]);
  const dispatch = useDispatch(); 
  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await fetch("https://airbean-9pcyw.ondigitalocean.app/api/beans/");
        const data = await response.json();
        console.log(data);
        setMenu(data.menu);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    }

    fetchMenu();
  }, []);

  const addToCart = (menuItem) => {
    dispatch(addItem(menuItem)); 
  };

  const menuItems = menu.map((menuItem) => (
    <article key={menuItem.id}>
      <h2>{menuItem.title}</h2>
      <p>{menuItem.desc}</p>
      <p>Price: ${menuItem.price}</p>
      <button onClick={() => addToCart(menuItem)}>Add to Cart</button>
    </article>
  ));

  return (
    <div>
      <h1>Coffee Menu</h1>
      {menuItems}
    </div>
  );
}

export default Products;
