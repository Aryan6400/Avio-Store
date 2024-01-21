import React from "react";
import { useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";
import "./Product.scss";

const Product = ({ data }) => {
    const navigate = useNavigate();
    return (
        <Paper
            className="product-card"
            onClick={() => navigate("/product/" + data._id)}
        >
            <div className="thumbnail">
                <img
                    src={
                        data.img_url[0]
                    }
                    loading="lazy"
                />
            </div>
            <div className="prod-details">
                <span className="name">{data.title}</span>
                <span className="price">&#8377;{data.price}</span>
            </div>
        </Paper>
    );
};

export default Product;
