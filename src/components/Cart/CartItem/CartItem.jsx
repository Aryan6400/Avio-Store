import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import "./CartItem.scss";
import { useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import { useCart } from "../../../context/CartContext";


const CartItem = (props) => {
    const [isLoading, setLoading] = useState(false);
    const { setCart, setSize } = useCart();
    const navigate = useNavigate();
    let discount = (1 - (Number(props.data.price) / Number(props.data.originalPrice))) * 100;

    const removeFromCart = async () => {
        const userInfo = JSON.parse(localStorage.getItem("User"));
        setLoading(true);
        try {
            const response = await fetch("https://avio-backend.onrender.com/remove-from-cart", {
                method: "PATCH",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userInfo.token}`
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify({
                    productId: props.data._id,
                    quantity: 1
                })
            });
            const result = await response.json();
            setCart(result);
            setSize(result.length);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }

    const addToCart = async () => {
        const userInfo = JSON.parse(localStorage.getItem("User"));
        setLoading(true);
        try {
            const response = await fetch("https://avio-backend.onrender.com/add-to-cart", {
                method: "PATCH",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userInfo.token}`
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify({
                    productId: props.data._id,
                    quantity: 1
                })
            });
            const result = await response.json();
            setCart(result);
            setSize(result.length);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }

    const addToLater = async() => {
        const userInfo = JSON.parse(localStorage.getItem("User"));
        setLoading(true);
        try {
            const response = await fetch("https://avio-backend.onrender.com/add-to-later", {
                method: "PATCH",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userInfo.token}`
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify({
                    productId: props.data._id,
                })
            });
            const result = await response.json();
            setCart(result);
            setSize(result.length);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }


    return (
        <>
            <Backdrop
                sx={{ color: "#fff", zIndex: 5 }}
                open={isLoading}
            >
                <CircularProgress color="secondary" />
            </Backdrop>
            <div className="cart-products">
                <div className="cart-item">
                    <div className="cart-item-image-div">
                        <img src={props.data.img_url} onClick={() => { navigate(`/product/${props.data._id}`) }} className="cart-item-image" alt="Product Image"></img>
                    </div>
                    <div className="prod-details">

                        <div className="cart-name-and-delivery">
                            <div className="name" onClick={() => { navigate(`/product/${props.data._id}`) }}>{props.data.title}</div>
                            {props.data.status != 'Out of Stock' ? <div className="delivery-status">Delivery : 22nd Aug &nbsp;&nbsp;|&nbsp;&nbsp; <span>₹{props.data.deliveryCharges}</span></div> : null}
                        </div>

                        <div className="text" onClick={() => { navigate(`/product/${props.data._id}`) }}>{props.data.shortDescription}</div>

                        <div className="cart-prices-div">
                            <div className="cart-price">
                                ₹{(Number(props.data.price)).toFixed(2)}
                            </div>
                            {props.data.originalPrice != props.data.price ? <div className="cart-original-price">
                                <s>₹{(Number(props.data.originalPrice)).toFixed(2)}</s>
                            </div> : null}
                            <div className="cart-discount">
                                {discount != "0" ?
                                    <span>{discount.toFixed(2)}% Off</span>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="cart-item-seller">
                            <div className="seller-name">Sold by {props.data.seller}</div>
                        </div>

                        <MdClose onClick={() => { props.remove(props.data._id) }} className="remove-from-cart" />

                        <div className="stock-status">
                            {props.data.status == 'Out of Stock'
                                ?
                                <div className="out-of-stock">Out of Stock !!</div>
                                :
                                <div className="in-stock">In Stock</div>
                            }
                        </div>

                        <div className="cart-end-btns-and-divs">
                            {props.data.status != 'Out of Stock'
                                ?
                                <div className="quantity-value-box">
                                    <span className="decrease-quantity" onClick={removeFromCart}>-</span>
                                    <input className="value" value={props.quantity}></input>
                                    <span className="increase-quantity" onClick={addToCart}>+</span>
                                </div>
                                :
                                <div></div>}

                            <div className="cart-extra-btns">
                                <div className="btn" onClick={addToLater}>Save for later</div>
                                <div className="btn">Add to fav</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default CartItem;