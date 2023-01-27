import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import './Product.css'
import { Link } from 'react-router-dom';
const Product = (props) => {
    const { img, name, category, seller, price, stock, key } = props.product;
    return (
        <div className='product'>
            <div className="">
                <img src={img} alt={category} />
            </div>
            <div className="product-info">
                <h4 className='product-name'><Link to={"/product/" + key}>{name}</Link></h4>
                <p><small>By: {seller}</small></p>
                <p>$ {price}</p>
                <p><small>Only {stock} left in Stock - Order Soon</small></p>
                {props.showAddToCart && <button className="addtoCart-btn" onClick={() => props.handleAddProduct(props.product)}><FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon> Add to cart</button>}
            </div>
        </div>
    );
};

export default Product;