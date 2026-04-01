import { Navigate,Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = () => {
    const {accessToken}=useContext(AuthContext)
   

    if(!accessToken){
        return <Navigate to="/admin-login" replace/>
    }
    return <Outlet/>
}
 
export default ProtectedRoute;