import React, { useEffect, useState } from "react";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import { Link } from "react-router-dom";

import "./Shop.css";

const Shop = () => {
  useEffect(() => {
    fetch("https://ema-john-server-rho.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {
        setDisplayProducts(data);
      });
  }, []);
  const [displayProduct, setDisplayProducts] = useState([]);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    fetch("https://ema-john-server-rho.vercel.app/productsByKeys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
      });
  }, []);
  const [cart, setCart] = useState([]);

  const handleAddProduct = (product) => {
    const toBeAddedKey = product.key;
    const sameProduct = cart.find((pd) => pd.key === toBeAddedKey);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = Number(count);
      const others = cart.filter((pd) => pd.key !== toBeAddedKey);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count);
  };
  console.log(cart);
  return (
    <div className="products-Container">
      <div className="product-container">
        {displayProduct.map((product) => (
          <Product
            key={product.key}
            product={product}
            handleAddProduct={handleAddProduct}
            showAddToCart={true}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="addtoCart-btn">Review</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
