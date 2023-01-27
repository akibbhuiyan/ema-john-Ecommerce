import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "./../Product/Product";

const ProductDetails = () => {
  const { productKey } = useParams();
  useEffect(() => {
    fetch(`https://ema-john-server-rho.vercel.app/product/${productKey}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, []);
  const [product, setProduct] = useState({});
  return (
    <div>
      <Product showAddToCart={false} product={product}></Product>
    </div>
  );
};

export default ProductDetails;
