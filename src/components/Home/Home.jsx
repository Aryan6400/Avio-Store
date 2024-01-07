import React, { useEffect, useContext } from "react";
import "./Home.scss";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Products from "../Products/Products";
import { productData } from "../productData";

const Home = () => {
    const data = productData;

    return (
        <div>
            <Banner />
            <div className="main-content">
                <div className="layout">
                    <Category />
                    <Products
                        products={data}
                        headingText="Popular Products"

                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
