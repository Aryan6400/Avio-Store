import React, { useState, useEffect } from "react";
import CartItem from "./CartItem/CartItem";
import CartItemWrapper from "./CartItem/CartItemWrapper";
import { productData } from "../productData";
import "./Cart.scss";
import { Button, Paper } from "@mui/material";


const Cart = () => {
    const [data, setData] = useState([]);
    const [size, setSize] = useState(0);
    let sprice = 0;
    let cprice = 0;
    let dprice = 0;
    let outOfStock = 0;

    useEffect(() => {
        let itemData = productData;
        let n1 = Math.floor((Math.random() * 5));
        let n2 = Math.floor((Math.random() * 5) + 5);
        itemData = itemData.data.slice(n1, n2);
        setData(itemData);
        setSize(n2 - n1);
    }, []);

    return (
        <>
            <div className="cart-header">
                <h2 className="cart-heading">Your Shopping Cart</h2>
            </div>
            <div className="cart-panel">
                <div className="cart-content">
                    <CartItemWrapper>
                        {data.map((item, index) => {
                            if(item.attributes.status!='Out of Stock') sprice = sprice + Number(item.attributes.price);
                            if(item.attributes.status!='Out of Stock') cprice = cprice + Number(item.attributes.originalPrice);
                            if (item.attributes.deliveryCharges != 'Free' && item.attributes.status!='Out of Stock') {
                                let deliveryCharge = item.attributes.deliveryCharges.slice(1,);
                                dprice = dprice + Number(deliveryCharge);
                            }
                            if(item.attributes.status=='Out of Stock') outOfStock=outOfStock+1;
                            return (
                                <>
                                    {index != 0 ? <hr className="cart-item-separator" /> : null}
                                    <CartItem key={index} data={item} />
                                </>
                            )
                        })}
                        <hr/>
                        <div className="cart-item-box-footer">Subtotal {size-outOfStock} items: ₹{sprice.toFixed(2)}</div>
                    </CartItemWrapper>
                </div>
                <div className="cart-summary">
                    <Paper elevation={1}>
                        <div className="summary-header">ORDER SUMMARY</div>
                        <hr />
                        <div className="details">
                            <div className="row">
                                <span>Price ({size-outOfStock} items)</span>
                                <span>₹{cprice.toFixed(2)}</span>
                            </div>
                            <div className="row">
                                <span>Discount</span>
                                <span className="green">₹{(cprice - sprice).toFixed(2)}</span>
                            </div>
                            <div className="row">
                                <span>Delivery Charges</span>
                                {dprice == 0 ? <span className="green">Free</span> : <span>₹{dprice}</span>}
                            </div>
                            <hr className="cart-summary-hr" />
                            <div className="row">
                                <span>Total Amount</span>
                                <span>₹{(sprice + dprice).toFixed(2)}</span>
                            </div>
                        </div>
                    </Paper>
                    <Button id="buy-btn">PROCEED TO BUY</Button>
                </div>
            </div>
        </>
    );
};

export default Cart;
