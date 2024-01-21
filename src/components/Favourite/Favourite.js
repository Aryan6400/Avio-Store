import { useState } from "react";
import "./Favourite.scss";
import { useEffect } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Product from "../Products/Product/Product";

const Favourite = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

    const fetchFavs = async (userInfo) => {
        setLoading(true);
        try {
            const response = await fetch("https://avio-backend.onrender.com/get-favs", {
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
            setData(result);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("User"));
        if (!userInfo) {
            navigate("/login");
        } else {
            fetchFavs(userInfo);
        }
    }, [])

    return (
        <>
            <Backdrop
                sx={{ color: "#fff", zIndex: 5 }}
                open={isLoading}
            >
                <CircularProgress color="secondary" />
            </Backdrop>
            <div className="favourite-section">
                <div className="fav-heading">
                    <div className="favourites-title">Favourites</div>
                    <hr className="favourites-hr" />
                </div>
                <div className="favourites-container">
                    <div className="favourites-box">
                        {data?.map((item) => (
                            <Product
                                key={item._id}
                                data={item}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Favourite;