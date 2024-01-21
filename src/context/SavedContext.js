import { createContext, useContext, useEffect, useState } from "react";

const SavedContext = createContext();

function SavedProvider({children}){
    const [saved, setSaved] = useState([]);

    // useEffect(()=>{
        
    // }, [])
    
    return (
        <SavedContext.Provider value={{saved, setSaved}}>
            {children}
        </SavedContext.Provider>
    )
}

export const useSaved = () => {
    return useContext(SavedContext);
}

export default SavedProvider;