import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider({children}){
    const [auth, setAuth] = useState(false);
    
    useEffect(()=>{
        setAuth((prev)=>prev);
    }, [])
    
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthProvider;