import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

function CartProvider({children}){
    const [cart, setCart] = useState([]);
    const [size, setSize] = useState(0);

    // useEffect(()=>{
        
    // }, [])
    
    return (
        <CartContext.Provider value={{cart, setCart, size, setSize}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    return useContext(CartContext);
}

export default CartProvider;