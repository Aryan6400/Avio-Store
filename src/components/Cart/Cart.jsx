import React, { useState, useEffect } from "react";
import CartItem from "./CartItem/CartItem";
import CartItemWrapper from "./CartItem/CartItemWrapper";
import { Backdrop, CircularProgress, Button, Paper } from "@mui/material";
import "./Cart.scss";
import { useCart } from "../../context/CartContext";
import EmptyCart from "./EmptyCart";


const Cart = () => {
    const {cart, setCart, size, setSize} = useCart();
    const [isLoading, setLoading] = useState(false);
    let sprice = Number(0);
    let cprice = Number(0);
    let dprice = Number(0);
    let outOfStock = Number(0);

    const fetchData = async (userInfo) => {
        setLoading(true);
        try {
            const response = await fetch("https://avio-backend.onrender.com/get-cart", {
                method: "GET",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userInfo.token}`
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
            });
            const result = await response.json();
            setCart(result);
            setSize(result.length);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    const removeAllFromCart = async(id) => {
        setLoading(true);
        const userInfo = JSON.parse(localStorage.getItem("User"));
        const data={
            productId: id
        }
        try{
            const response = await fetch("https://avio-backend.onrender.com/remove-all-from-cart", {
                method: "PATCH",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userInfo.token}`
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(data),
            });
            const result = await response.json();
            setSize(result.length);
            setCart(result);
            setLoading(false);
        } catch(error){
            console.error(error);
            setLoading(false);
        }
    }

    const buyProducts = async() => {
        setLoading(true);
        const userInfo = JSON.parse(localStorage.getItem("User"));
        try{
            const response = await fetch("https://avio-backend.onrender.com/buy-products", {
                method: "PATCH",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userInfo.token}`
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
            });
            const result = await response.json();
            setSize(result.length);
            setCart(result);
            setLoading(false);
        } catch(error){
            console.error(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("User"));
        fetchData(userInfo);
    }, []);

    return (
        <>
            <Backdrop
                sx={{ color: "#fff", zIndex: 5 }}
                open={isLoading}
            >
                <CircularProgress color="secondary" />
            </Backdrop>
            {size > 0 ?
                <>
                    <div className="cart-header">
                        <h2 className="cart-heading">Your Shopping Cart</h2>
                    </div>
                    <div className="cart-panel">
                        <div className="cart-content">
                            <CartItemWrapper>
                                {cart.map((item, index) => {
                                    if (item.product.status != 'Out of Stock'){
                                        sprice = sprice + Number(item.product.price)*Number(item.quantity);
                                        cprice = cprice + Number(item.product.originalPrice)*Number(item.quantity);
                                        dprice = dprice + Number(item.product.deliveryCharges)*Number(item.quantity);
                                    }
                                    else outOfStock = outOfStock + 1;
                                    return (
                                        <>
                                            {index != 0 ? <hr className="cart-item-separator" /> : null}
                                            <CartItem key={index} data={item.product} quantity={item.quantity} remove={removeAllFromCart} />
                                        </>
                                    )
                                })}
                                <hr />
                                <div className="cart-item-box-footer">Subtotal {size - outOfStock} items: ₹{sprice.toFixed(2)}</div>
                            </CartItemWrapper>
                        </div>
                        <div className="cart-summary">
                            <Paper elevation={1}>
                                <div className="summary-header">ORDER SUMMARY</div>
                                <hr />
                                <div className="details">
                                    <div className="row">
                                        <span>Price ({size - outOfStock} items)</span>
                                        <span>₹{cprice.toFixed(2)}</span>
                                    </div>
                                    <div className="row">
                                        <span>Discount</span>
                                        <span className="green">₹{(cprice - sprice).toFixed(2)}</span>
                                    </div>
                                    <div className="row">
                                        <span>Delivery Charges</span>
                                        {dprice == 0 ? <span className="green">Free</span> : <span>₹{dprice.toFixed(2)}</span>}
                                    </div>
                                    <hr className="cart-summary-hr" />
                                    <div className="row">
                                        <span>Total Amount</span>
                                        <span>₹{(sprice + dprice).toFixed(2)}</span>
                                    </div>
                                </div>
                            </Paper>
                            <Button id="buy-btn" onClick={buyProducts}>BUY PRODUCTS</Button>
                        </div>
                    </div>
                </> :
                <EmptyCart />
            }
        </>
    );
};

export default Cart;
