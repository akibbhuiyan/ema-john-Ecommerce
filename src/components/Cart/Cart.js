import React from 'react';
import './Cart.css';


const Cart = (props) => {
    const cart = props.cart;
    // console.log(cart);
    const formatNumber = num => {
        const pricision = num.toFixed(2)
        return Number(pricision)
    }
    // const total = cart.reduce((total,product)=>total + product.price,0)
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * (product.quantity || 1);
    }
    let shipping = 0;
    if (total > 35) {
        shipping = 0
    }
    else if (total > 15) {
        shipping = 4.99;
    }
    else if (total > 0) {
        shipping = 12.99
    }
    let tax = total / 10;

    const totalBeforeTax = formatNumber(total) + formatNumber(shipping);
    const grandTotal = formatNumber(total) + formatNumber(shipping) + formatNumber(tax);
    return (
        <div className='cart'>
            <h4>Order Suumary</h4>
            <p>Item Ordered:{cart.length}</p>
            <table>
                <tbody>

                    <tr>
                        <td>Product Price:</td>
                        <td>${formatNumber(total)}</td>
                    </tr>
                    <tr>
                        <td>Shipping Cost:</td>
                        <td>${shipping}</td>
                    </tr>
                    <tr>
                        <td>Total before Tax :</td>
                        <td>${totalBeforeTax}</td>
                    </tr>
                    <tr>
                        <td>Estimated Tax :</td>
                        <td>${formatNumber(tax)}</td>
                    </tr>
                    <tr className='total-row'>
                        <td>Total Price :</td>
                        <td>${formatNumber(grandTotal)}</td>
                    </tr>
                </tbody>
            </table>
            {
                props.children
            }
        </div>
    );
};

export default Cart;