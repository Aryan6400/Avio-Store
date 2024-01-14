import { useEffect, useState } from "react";
import ImageContainer from "./imageContainer/ImageContainer";
import DetailsContainer from "./detailsContainer/DetailsContainer";
import { Backdrop, CircularProgress } from "@mui/material";
import "./SingleProduct.scss"


const SingleProduct = () => {
    const [isLoading, setLoading] = useState(false);
    const initialValues = {
        _id: "",
        price: "",
        originalPrice: "",
        title: "",
        shortDescription: "",
        offer: [],
        img_url: [],
        rate: "",
        rating: "",
        reviews: "",
        status: "",
        seller: "",
        deliveryCharges: "",
    }
    const [data, setData] = useState(initialValues);

    const fetchData = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`https://avio-backend.onrender.com/product/${id}`, {
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
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        window.scrollTo({ top: 0 });
        const id = window.location.href.split("/")[4];
        fetchData(id);
    },[])

    return (
        <>
            <Backdrop
                sx={{ color: "#fff", zIndex: 5 }}
                open={isLoading}
            >
                <CircularProgress color="secondary" />
            </Backdrop>
            <div className="single-product-main-content">
                <div className="layout">
                    <div className="single-product-page">
                        <div className="left">
                            <ImageContainer urls={data.img_url} id={data._id} />
                        </div>
                        <div className="right">
                            {data != initialValues && <DetailsContainer data={data} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleProduct;
