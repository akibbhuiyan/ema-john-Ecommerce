import React from "react";

const Inventory = () => {
  const handleAddProduct = () => {
    const product = {};
    fetch("https://ema-john-server-rho.vercel.app/addProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
  };
  return (
    <div>
      <form action="">
        <p>
          <span>Name: </span>
          <input type="text" name="Name" id="" />
        </p>
        <p>
          <span>Price : </span>
          <input type="text" name="price" id="" />
        </p>
        <p>
          <span>Quantity</span>
          <input type="text" name="quantity" id="" />
        </p>
        <p>
          <span>Product Image</span>
          <input type="file" name="image" id="" />
        </p>

        <button onClick={handleAddProduct}>Add Product</button>
      </form>
    </div>
  );
};

export default Inventory;
