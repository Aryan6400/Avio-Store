import { useEffect, useState, useContext } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import "./Header.scss";
import { useAuth } from "../../context/AuthContext";
import Search from "./Search/Search";

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [searchModal, setSearchModal] = useState(false);
    const {auth, setAuth} = useAuth();
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
    }, []);

    const logout = () => {
        localStorage.clear();
        setAuth(false);
        navigate('/login');
    }

    return (
        <>
            <header
                className={`main-header ${scrolled ? "sticky-header" : ""}`}
            >
                <div className="header-content">
                    <div className="center" onClick={() => navigate("/")}>
                        AVIOSTORE
                    </div>
                    <ul className="left">
                        <li onClick={() => navigate("/")}>Home</li>
                        <li onClick={() => navigate("/about")}>About</li>
                        <li onClick={() => navigate("/category")}>Categories</li>
                    </ul>

                    <div className="right">
                        <TbSearch onClick={() => setSearchModal(true)} />
                        <AiOutlineHeart onClick={()=>navigate("/favourites")} />
                        <SavedSearchIcon onClick={()=>navigate("/saved")} />
                        <span
                            className="cart-icon"

                        >
                            <CgShoppingCart onClick={() => navigate("/cart")}/>

                        </span>
                        {!auth && <Button id="header-signup-btn" onClick={() => navigate("/signup")}>SignUp</Button>}
                        {auth && <Button id="header-logout-btn" onClick={logout}>Logout</Button>}
                    </div>
                </div>
            </header>
            {searchModal && <Search setSearchModal={setSearchModal} />}
        </>
    );
};

export default Header;
