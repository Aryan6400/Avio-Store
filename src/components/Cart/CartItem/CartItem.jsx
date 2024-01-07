import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import "./CartItem.scss";


const CartItem = (props) => {
    const [details, setDetails] = useState(props.data.attributes);
    const [quantity, setQuantity] = useState(1);
    let discount = (1 - (Number(details.price) / Number(details.originalPrice))) * 100;
    return (
        <div className="cart-products">
            <div className="cart-item">
                <div className="cart-item-image-div">
                    <img src={details.img_url} className="cart-item-image" alt="Product Image"></img>
                </div>
                <div className="prod-details">

                    <div className="cart-name-and-delivery">
                        <div className="name">{details.title}</div>
                        {details.status != 'Out of Stock' ? <div className="delivery-status">Delivery : 22nd Aug &nbsp;&nbsp;|&nbsp;&nbsp; <span>{details.deliveryCharges}</span></div> : null}
                    </div>

                    <div className="text">{details.shortDescription}</div>

                    <div className="cart-prices-div">
                        <div className="cart-price">
                            ₹{(Number(details.price)).toFixed(2)}
                        </div>
                        {details.originalPrice != details.price ? <div className="cart-original-price">
                            <s>₹{(Number(details.originalPrice)).toFixed(2)}</s>
                        </div> : null}
                        <div className="cart-discount">
                            {discount != "0" ?
                                <span>{discount.toFixed(2)}% Off</span>
                                : null
                            }
                        </div>
                    </div>

                    <div className="cart-item-seller">
                        <div className="seller-name">Sold by {details.seller}</div>
                    </div>

                    <MdClose className="remove-from-cart" />

                    <div className="stock-status">
                        {details.status == 'Out of Stock'
                            ?
                            <div className="out-of-stock">Out of Stock !!</div>
                            :
                            <div className="in-stock">In Stock</div>
                        }
                    </div>

                    <div className="cart-end-btns-and-divs">
                        {details.status != 'Out of Stock'
                            ?
                            <div className="quantity-value-box">
                            <span className="decrease-quantity" onClick={()=>{if(quantity)setQuantity(prev=>prev-1)}}>-</span>
                            <input className="value" value={quantity} onChange={(e)=>{setQuantity(Number(e.target.value))}}></input>
                            <span className="increase-quantity" onClick={()=>{setQuantity(prev=>prev+1)}}>+</span>
                            </div>
                            :
                            <div></div>}

                        <div className="cart-extra-btns">
                            <div className="btn">Save for later</div>
                            <div className="btn">Add to fav</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CartItem;



{/* <div className="cart-quantity-buttons-div">
    <div className="cart-quantity-buttons">
        <label>Quantity: </label>
        <span>
            <select name="Quantity" id="quantity">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
        </span>
    </div>
</div> */}