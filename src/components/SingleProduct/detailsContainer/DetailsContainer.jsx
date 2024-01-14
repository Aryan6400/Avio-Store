import { useContext, useEffect, useState } from "react";
import StarIcon from '@mui/icons-material/Star';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import "./DetailsContainer.scss";


const DetailsContainer = ({ data }) => {
    let discount = String((1 - (Number(data.price) / Number(data.originalPrice))) * 100);
    const [pincode, setPincode] = useState("");
    return (
        <div className="details-container">
            <div className="name-and-desc">
                <div className="name">
                    {data.title}
                </div>
            </div>

            <div className="rate-rating-and-reviews">
                <div className="rates">
                    <StarIcon fontSize="small" />
                    <div>{data.rate}</div>
                </div>
                <div className="ratings-and-reviews">
                    {data.ratings} ratings and {data.reviews} reviews
                </div>
            </div>

            <div className="prices-div">
                <div className="price">
                    ₹{data.price}
                </div>
                <div className="original-price">
                    <s>₹{data.originalPrice}</s>
                </div>
                <div className="discount">
                    {discount != "0" ?
                        <span>{discount.split(".")[0]}{discount.split(".")[1] && <span>.{discount.split(".")[1].slice(0, 2)}</span>}% Off</span>
                        : null
                    }
                </div>
            </div>
            <hr className="divider" />
            <div className="offers-container">
                <span>Available offers</span>
                <div className="offers-box">
                    {data.offer.map(item => {
                        return (
                            <div className="offer">
                                <LocalOfferIcon style={{ color: "green" }} />
                                <span>{item}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <hr className="divider" />
            <div className="delivery-details">
                <div className="delivery-details-title">Delivery: </div>
                <div className="delivery-check-box">
                    <input className="pincode-check" type="text" onChange={(e) => { setPincode(e.target.value) }} name="pincode" placeholder="Enter Delivery Pincode" value={pincode} />
                    <button id="pincode-check-button">Check</button>
                </div>
                <div className="pincode-check-verdict">
                    {
                        data.deliveryCharges!=0 ?
                            <span className="delivery-cost">₹{data.deliveryCharges} </span>
                            :
                            <span className="delivery-cost">Free Delivery </span>
                    }
                    <span style={{ color: "silver" }}>| </span>
                    12 July, Friday
                </div>
            </div>

            <div className="name-and-desc description-box">
                <div className="desc">
                    <div className="desc-title">Description: </div>
                    <div className="desc-description">{data.shortDescription}</div>
                </div>
            </div>

            <div className="seller-details-box">
                <div className="seller-details-box-title">Seller: </div>
                <div className="seller-name-and-star">
                    <div className="seller-name">{data.seller}</div>
                    <div className="seller-stars">
                        <StarIcon fontSize="small" />
                        <div>{data.rate}</div>
                    </div>
                </div>
                <div className="payment-return-and-replacement-details">
                    <div>
                        <li><div className="COD-status">Cash On Delivery available</div></li>
                        <li><div className="replacement-status">7 Days Replacement Policy</div></li>
                        <li><div className="return-status">7 Days Easy Return</div></li>
                    </div>
                </div>
            </div>
            <hr className="divider" />

            <div className="about-item-box">
                <div className="about-box-title">About Item </div>
                <div className="about-box-description">{data.shortDescription} lorem ipsum dolor sit amet lorem ipsum dolor sit amet consecuter lorem ipsum dolor sit amet lorem ipsum dolor sit amet consecuter<br />lorem ipsum dolor sit amet lorem ipsum dolor sit amet consecuter lorem ipsum dolor sit amet lorem ipsum dolor sit amet consecuter<br />{data.shortDescription}<br/>{data.shortDescription} lorem ipsum dolor sit amet lorem ipsum dolor sit amet consecuter lorem ipsum dolor sit amet lorem ipsum dolor sit amet consecuter<br />lorem ipsum dolor sit amet lorem ipsum dolor sit amet consecuter lorem ipsum dolor sit amet lorem ipsum dolor sit amet consecuter<br />{data.shortDescription}</div>
            </div>
            <hr className="divider" />

            <div className="specification-container">
                <div className="specification-box-title">Product Details</div>
            </div>
        </div>
    );
};

export default DetailsContainer;