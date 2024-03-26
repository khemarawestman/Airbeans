import React, { useState, useEffect } from "react";

function Products() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await fetch(
          "https://airbean-9pcyw.ondigitalocean.app/api/beans/"
        );
        const data = await response.json();
        console.log(data);
        setMenu(data.menu);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    }

    fetchMenu();
  }, []);

  const menuItems = menu.map((menuItem) => (
    <article key={menuItem.id}>
      <h2>{menuItem.title}</h2>
      <p>{menuItem.desc}</p>
      <p>Price: ${menuItem.price}</p>
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
