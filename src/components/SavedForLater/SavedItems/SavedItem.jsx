import React, { useState } from "react";
import "./SavedItem.scss";
import { useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import { useSaved } from "../../../context/SavedContext";


const SavedItem = (props) => {
    const [isLoading, setLoading] = useState(false);
    const {saved, setSaved} = useSaved();
    const navigate = useNavigate();

    const removeFromSaved = async() => {
        setLoading(true);
        const userInfo = JSON.parse(localStorage.getItem("User"));
        try {
            const response = await fetch("https://avio-backend.onrender.com/remove-from-saved",{
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
                    productId: props.data._id
                })
            })
            const result = await response.json();
            setSaved(result);
            setLoading(false);
        } catch (error) {
            console.error(error.message);
            setLoading(false);
        }
    }

    const moveToCart = async() => {
        setLoading(true);
        const userInfo = JSON.parse(localStorage.getItem("User"));
        try {
            const response = await fetch("https://avio-backend.onrender.com/move-to-cart",{
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
                    productId: props.data._id
                })
            })
            const result = await response.json();
            setSaved(result);
            setLoading(false);
        } catch (error) {
            console.error(error.message);
            setLoading(false);
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
            <div className="saved-products">
                <div className="saved-item">
                    <div className="saved-item-image-div">
                        <img src={props.data.img_url} loading="lazy" onClick={() => { navigate(`/product/${props.data._id}`) }} className="saved-item-image" alt="Product Image"></img>
                    </div>
                    <div className="prod-details">

                        <div className="saved-name-and-delivery">
                            <div className="name" onClick={() => { navigate(`/product/${props.data._id}`) }}>{props.data.title}</div>
                        </div>

                        <div className="text" onClick={() => { navigate(`/product/${props.data._id}`) }}>{props.data.shortDescription}</div>

                        <div className="saved-item-seller">
                            <div className="seller-name">Sold by {props.data.seller}</div>
                        </div>

                        <div className="stock-status">
                            {props.data.status == 'Out of Stock'
                                ?
                                <div className="out-of-stock">Out of Stock !!</div>
                                :
                                <div className="in-stock">In Stock</div>
                            }
                        </div>

                        <div className="saved-end-btns-and-divs">
                            <div></div>
                            <div className="saved-extra-btns">
                                <div className="btn" onClick={removeFromSaved}>Remove from saved</div>
                                <div className="btn" onClick={moveToCart}>Move to cart</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default SavedItem;