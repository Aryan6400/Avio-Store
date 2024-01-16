import { useNavigate } from "react-router-dom";
import "./EmptyCart.scss";

const EmptyCart = () => {
    const navigate = useNavigate();

    return (
        <div className="empty-cart-container">
            <div className="empty-cart-box">
                <h2>Your cart is empty!</h2>
                <p>Check your <span onClick={()=>navigate('/saved')} className="empty-cart-links">saved for later</span> items or continue <span onClick={()=>navigate('/')} className="empty-cart-links">shopping</span>.</p>
            </div>
        </div>
    );
};

export default EmptyCart;