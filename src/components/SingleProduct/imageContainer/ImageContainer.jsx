import { useContext, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./ImageContainer.scss";
import { Button } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Label } from "@mui/icons-material";


const ImageContainer = ({ urls }) => {

    const [selectedImg, setSelectedImg] = useState(null);
    const [inCart, setInCart] = useState(false);
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

    const handleClick = (index) => {
        setSelectedImg(urls[index]);
    }
    return (
        <div className="single-product-img-container">
            <div className="selected-image-to-view">
                <img src={selectedImg ? selectedImg : urls[0]} />
                <div>Hover over image to zoom in</div>
            </div>
            <div className="product-page-carousel">
                <Carousel responsive={responsive} customTransition="transform 300ms ease-in-out" transitionDuration={300}>
                    {urls.map((url, index) => {
                        return (
                            <div className="carousel-small-img">
                                <img src={url} className={url == selectedImg ? "selected-product-img" : null} onMouseEnter={() => { handleClick(index) }} />
                            </div>
                        )
                    })}
                </Carousel>
            </div>
            <div className="buy-and-cart-buttons">
                {!inCart ? <Button id="add-btn" onClick={() => { setInCart(prev => !prev) }}><ShoppingCartIcon />&nbsp; ADD TO CART</Button> : <Button id="add-btn" onClick={() => { setInCart(prev => !prev) }}><ShoppingCartIcon />&nbsp; REMOVE FROM CART</Button>}
                <Button id="buy-btn"><ShoppingBagIcon />&nbsp; BUY NOW</Button>
            </div>
            <div className="quantity-buttons-div">
                <div className="quantity-buttons">
                    <label>Quantity: </label>
                    <div className="quantity-value-box">
                        <span className="decrease-quantity" onClick={() => { if (quantity) setQuantity(prev => prev - 1) }}>-</span>
                        <input className="value" value={quantity} onChange={(e) => { setQuantity(Number(e.target.value)) }}></input>
                        <span className="increase-quantity" onClick={() => { setQuantity(prev => prev + 1) }}>+</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageContainer;