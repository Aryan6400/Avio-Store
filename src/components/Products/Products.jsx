import "./Products.scss";
import Product from "./Product/Product";
import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Products = (props) => {
    const [data, setData] = useState([]);

    const fetchData = async (primaryCategory, secondaryCategory) => {
        try {
            const response = await fetch(`https://avio-backend.onrender.com/all-products?primaryCategory=${primaryCategory}&secondaryCategory=${secondaryCategory}`, {
                method: "GET",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
            });
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        let primaryCategory = "None";
        let secondaryCategory = "None";
        if (props.primaryCategory) primaryCategory = props.primaryCategory;
        if (props.secondaryCategory) secondaryCategory = props.secondaryCategory;
        fetchData(primaryCategory, secondaryCategory);
    }, [])

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
            slidesToSlide: 4
        },
        largeTablet: {
            breakpoint: { max: 1024, min: 800 },
            items: 4,
            slidesToSlide: 3
        },
        tablet: {
            breakpoint: { max: 800, min: 464 },
            items: 3,
            slidesToSlide: 2
        },
        mobile: {
            breakpoint: { max: 550, min: 0 },
            items: 3,
            slidesToSlide: 2
        }
    };

    return (
        <div className="products-container">
            <div className="sec-heading">{props.headingText}</div>
            <Carousel
                responsive={responsive}
            >
                {data?.map((item) => (
                    <Product
                        key={item._id}
                        data={item}
                    />
                ))}
            </Carousel>
        </div>
    );
};

export default Products;
