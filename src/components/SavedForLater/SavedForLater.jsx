import { useNavigate } from "react-router-dom";
import "./SavedForLater.scss";
import { useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import SavedItemWrapper from "./SavedItems/SavedItemWrapper";
import SavedItem from "./SavedItems/SavedItem";
import { useSaved } from "../../context/SavedContext";

const SavedForLater = () => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const {saved, setSaved} = useSaved();

    const fetchSaved = async (userInfo) => {
        setLoading(true);
        try {
            const response = await fetch("https://avio-backend.onrender.com/get-saved", {
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
            setSaved(result);
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
            fetchSaved(userInfo);
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
            <div className="saved-section">
                <div className="saved-heading">
                    <div className="saved-title">Saved for Later</div>
                    <hr className="saved-hr" />
                </div>
                <div className="saved-container">
                    <SavedItemWrapper>
                        {saved.map((item, index) => {
                            return (
                                <>
                                    {index != 0 ? <hr className="saved-item-separator" /> : null}
                                    <SavedItem key={item.product._id} data={item.product} />
                                </>
                            )
                        })}
                    </SavedItemWrapper>
                </div>
            </div>
        </>
    );
};

export default SavedForLater;