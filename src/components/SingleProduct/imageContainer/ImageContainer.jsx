import { useContext, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./ImageContainer.scss";
import { Backdrop, CircularProgress, Button } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useNavigate } from "react-router-dom";


const ImageContainer = ({ urls, id }) => {
    const [selectedImg, setSelectedImg] = useState(null);
    const [inCart, setInCart] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);


    const responsive = {
        LargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 6,
            slidesToSlide: 5,
        },
        desktop: {
            breakpoint: { max: 1024, min: 800 },
            items: 6,
            slidesToSlide: 5
        },
        tablet: {
            breakpoint: { max: 800, min: 464 },
            items: 5,
            slidesToSlide: 4
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 3,
            slidesToSlide: 3
        }
    };

    const handleHover = (index) => {
        setSelectedImg(urls[index]);
    }

    const addToCart = async () => {
        const userInfo = JSON.parse(localStorage.getItem("User"));
        if(!userInfo){
            navigate("/signup");
        }
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
                    productId: id,
                    quantity: quantity,
                })
            });
            setInCart(true);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }

    const isInCart = async(userInfo, productId) => {
        setLoading(true);
        try{
            const response = await fetch(`https://avio-backend.onrender.com/is-in-cart/${productId}`,{
                method: "GET",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userInfo.token}`
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
            })
            const result = await response.json();
            if(result.flag==true){
                setInCart(true);
            }
            else{
                setInCart(false);
            }
            setLoading(false);
        } catch(error){
            setLoading(false);
            console.error(error);
        }
    }

    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem("User"));
        const productId = window.location.href.split("/")[4];
        isInCart(userInfo, productId);
    },[])

    return (
        <>
            <Backdrop
                sx={{ color: "#fff", zIndex: 5 }}
                open={isLoading}
            >
                <CircularProgress color="secondary" />
            </Backdrop>
            <div className="single-product-img-container">
                <div className="selected-image-to-view">
                    <img src={selectedImg ? selectedImg : urls[0]} loading="lazy" />
                    <div>Hover over image to zoom in</div>
                </div>
                <div className="product-page-carousel">
                    <Carousel responsive={responsive} customTransition="transform 300ms ease-in-out" transitionDuration={300}>
                        {urls.map((url, index) => {
                            return (
                                <div className="carousel-small-img">
                                    <img src={url} loading="lazy" className={url == selectedImg ? "selected-product-img" : null} onMouseEnter={() => { handleHover(index) }} />
                                </div>
                            )
                        })}
                    </Carousel>
                </div>
                <div className="buy-and-cart-buttons">
                    {!inCart ? <Button id="add-btn" onClick={addToCart}><ShoppingCartIcon />&nbsp; ADD TO CART</Button> : <Button id="add-btn" onClick={()=>{navigate("/cart")}}><ShoppingCartIcon />&nbsp; GO TO CART</Button>}
                    <Button id="buy-btn"><ShoppingBagIcon />&nbsp; BUY NOW</Button>
                </div>
                {!inCart && <div className="quantity-buttons-div">
                    <div className="quantity-buttons">
                        <label>Quantity: </label>
                        <div className="quantity-value-box">
                            <span className="decrease-quantity" onClick={() => { if (quantity) setQuantity(prev => prev - 1) }}>-</span>
                            <input className="value" value={quantity} onChange={(e) => { setQuantity(Number(e.target.value)) }}></input>
                            <span className="increase-quantity" onClick={() => { setQuantity(prev => prev + 1) }}>+</span>
                        </div>
                    </div>
                </div>}
            </div>
        </>
    );
};

export default ImageContainer;