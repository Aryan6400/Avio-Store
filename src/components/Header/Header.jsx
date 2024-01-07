import { useEffect, useState, useContext } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import "./Header.scss";
import Search from "./Search/Search";
import Cart from "../Cart/Cart";
const root = "http://localhost:3000";

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [searchModal, setSearchModal] = useState(false);
    const [isLogin, setLogin] = useState(null);
    const navigate = useNavigate();
    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 200) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        const auth = localStorage.getItem("User");
        if(auth) setLogin(true);
        else setLogin(false);
    }, []);

    const logout = () => {
        localStorage.clear();
        setLogin(false);
        window.location.href = root;
    }

    return (
        <>
            <header
                className={`main-header ${scrolled ? "sticky-header" : ""}`}
            >
                <div className="header-content">
                    <div className="centemr" onClick={() => navigate("/")}>
                        AVIOSTORE
                    </div>
                    <ul className="left">
                        <li onClick={() => navigate("/")}>Home</li>
                        <li onClick={() => navigate("/about")}>About</li>
                        <li>Categories</li>
                    </ul>

                    <div className="right">
                        <TbSearch onClick={() => setSearchModal(true)} />
                        <AiOutlineHeart />
                        <span
                            className="cart-icon"

                        >
                            <CgShoppingCart onClick={() => navigate("/cart")}/>

                        </span>
                        {!isLogin && <Button id="header-signup-btn" onClick={() => navigate("/signup")}>SignUp</Button>}
                        {isLogin && <Button id="header-logout-btn" onClick={logout}>Logout</Button>}
                    </div>
                </div>
            </header>
            {searchModal && <Search setSearchModal={setSearchModal} />}
            {/* {<Cart />} */}
        </>
    );
};

export default Header;
