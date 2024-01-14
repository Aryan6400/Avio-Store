import "./Products.scss";
import Product from "./Product/Product";
import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Products = ({ innerPage, headingText }) => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const response = await fetch('https://avio-backend.onrender.com/all-products', {
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
    }

    useEffect(() => {
        fetchData();
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
            breakpoint: {max: 800, min: 464},
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
            {!innerPage && <div className="sec-heading">{headingText}</div>}
            <Carousel
                responsive={responsive}
                // className={`products ${innerPage ? "innerPage" : ""}`}
            >
                {data?.map((item) => (
                    <Product
                        key={item.id}
                        data={item}
                    />
                ))}
            </Carousel>
        </div>
    );
};

export default Products;
