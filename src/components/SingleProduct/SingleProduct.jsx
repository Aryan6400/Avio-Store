import { useEffect, useState } from "react";
import { productData } from "../productData";
import ImageContainer from "./imageContainer/ImageContainer";
import DetailsContainer from "./detailsContainer/DetailsContainer";
import "./SingleProduct.scss"


const SingleProduct = () => {
    const initialValues = {
        id: "",
        attributes: {
            price: "",
            originalPrice: "",
            title: "",
            shortDescription: "",
            offer: [],
            img_url: [],
            rating: "",
            discount: "",
        }
    }
    const [data, setData] = useState(initialValues);
    const [id, setId] = useState("");

    useEffect(() => {
        window.scrollTo({top:0});
        let _id = window.location.href;
        _id = _id.split("/")[4];
        setId(_id);
        let itemData = productData;
        [itemData] = itemData.data.filter(item => item.id == _id)
        setData(itemData);
    })

    return (
        <div className="single-product-main-content">
            <div className="layout">
                <div className="single-product-page">
                    <div className="left">
                        <ImageContainer urls={data.attributes.img_url} />
                    </div>
                    <div className="right">
                        {data != initialValues && <DetailsContainer data={data} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
