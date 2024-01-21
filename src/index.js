import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import CartProvider from "./context/CartContext";
import SavedProvider from "./context/SavedContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthProvider>
        <CartProvider>
            <SavedProvider>
                <App />
            </SavedProvider>
        </CartProvider>
    </AuthProvider>
);
