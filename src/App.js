import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import { useEffect } from "react";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Category from "./components/Category/Category";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Newsletter from "./components/Footer/Newsletter/Newsletter";
import SignUp from "./components/Auth/Signup/SignUp";
import Login from "./components/Auth/Login/Login";
import Cart from "./components/Cart/Cart";
import About from "./components/About/About";
import PrivateComponent from "./components/PrivateComponent";
import { useAuth } from "./context/AuthContext";

function App() {
    const {setAuth} = useAuth();
    useEffect(()=>{
        const auth1 = localStorage.getItem("User");
        if(auth1) setAuth(true);
        else setAuth(false);
    }, [])

    return (
        <BrowserRouter>

            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/category/:id" element={<Category />} />
                <Route path="/product/:id" element={<SingleProduct />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />


                <Route element={<PrivateComponent />}>
                    <Route path="/cart" element={<Cart />} />
                </Route>
            </Routes>
            <Newsletter />
            <Footer />

        </BrowserRouter>
    );
}

export default App;
