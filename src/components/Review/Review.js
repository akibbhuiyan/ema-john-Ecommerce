import React, { useEffect, useState } from "react";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
  proccessOrder,
} from "../../utilities/databaseManager";
import ReviewItem from "../Reviewitem/ReviewItem";
import Cart from "../Cart/Cart";
import happyImg from "../../images/giphy.gif";
import { useNavigate } from "react-router-dom";
const Review = () => {
  let navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [placeOrder, setPlaceOrder] = useState(false);
  const handleProccedCheckout = () => {
    navigate("/shipment", { replace: true });
  };
  const handleRemoveProduct = (productKey) => {
    // console.log('Removed', productKey)
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    fetch("https://ema-john-server-rho.vercel.app/productsByKeys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);
  let thankYou;
  if (placeOrder) {
    thankYou = <img src={happyImg} alt="Gif"></img>;
  }
  return (
    <div className="products-Container">
      <div className="product-container">
        {cart.map((pd) => (
          <ReviewItem
            product={pd}
            key={pd.key}
            handleRemoveProduct={handleRemoveProduct}
          ></ReviewItem>
        ))}
        {thankYou}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button className="addtoCart-btn" onClick={handleProccedCheckout}>
            Procced Checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
