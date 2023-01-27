import React from 'react';
import './ReviewItem.css'

const ReviewItem = (props) => {
    const { name, quantity, key, img } = props.product;
    return (
        <div className='review-item'>
            <img src={img} alt="product img" />
            <div>
                <h1 className='product-name'>{name}</h1>
                <p> Quantity :{quantity}</p>
                <button
                    onClick={() => props.handleRemoveProduct(key)}
                    className='addtoCart-btn'
                >Remove</button>
            </div>
        </div>
    );
};

export default ReviewItem;