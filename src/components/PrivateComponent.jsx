import { Navigate, Outlet } from "react-router-dom";


function PrivateComponent() {
    const auth = localStorage.getItem("User");
    return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateComponent;