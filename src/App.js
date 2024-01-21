import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import { useEffect, lazy, Suspense } from "react";
import { useAuth } from "./context/AuthContext";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Newsletter from "./components/Footer/Newsletter/Newsletter";
import PrivateComponent from "./components/PrivateComponent";
import Favourite from "./components/Favourite/Favourite";

const Cart = lazy(() => import("./components/Cart/Cart"));
const Home = lazy(() => import("./components/Home/Home"));
const Category = lazy(() => import("./components/Category/Category"));
const SingleProduct = lazy(() => import("./components/SingleProduct/SingleProduct"));
const About = lazy(() => import("./components/About/About"));
const SavedForLater = lazy(() => import("./components/SavedForLater/SavedForLater"));
const Login = lazy(() => import("./components/Auth/Login/Login"));
const SignUp = lazy(() => import("./components/Auth/Signup/SignUp"));


function App() {
    const { setAuth } = useAuth();
    useEffect(() => {
        const auth1 = localStorage.getItem("User");
        if (auth1) setAuth(true);
        else setAuth(false);
    }, [])

    return (
        <BrowserRouter>

            <Header />
            <Routes>
                <Route path="/" element={
                    <Suspense fallback={<p>Loading...</p>}>
                        <Home />
                    </Suspense>} />
                <Route path="/category" element={
                    <Suspense fallback={<p>Loading...</p>}>
                        <Category />
                    </Suspense>} />
                <Route path="/product/:id" element={
                    <Suspense fallback={<p>Loading...</p>}>
                        <SingleProduct />
                    </Suspense>} />
                <Route path="/signup" element={
                    <Suspense fallback={<p>Loading...</p>}>
                        <SignUp />
                    </Suspense>} />
                <Route path="/login" element={
                    <Suspense fallback={<p>Loading...</p>}>
                        <Login />
                    </Suspense>} />
                <Route path="/about" element={
                    <Suspense fallback={<p>Loading...</p>}>
                        <About />
                    </Suspense>} />
                <Route element={<PrivateComponent />}>
                    <Route path="/cart" element={
                        <Suspense fallback={<p>Loading...</p>}>
                            <Cart />
                        </Suspense>
                    } />
                    <Route path="/saved" element={
                        <Suspense fallback={<p>Loading...</p>}>
                            <SavedForLater />
                        </Suspense>
                    } />
                    <Route path="/favourites" element={
                        <Suspense fallback={<p>Loading...</p>}>
                            <Favourite />
                        </Suspense>
                    } />
                </Route>
            </Routes>
            <Newsletter />
            <Footer />

        </BrowserRouter>
    );
}

export default App;
