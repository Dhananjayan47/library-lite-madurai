import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import { useState,useEffect } from "react";
import API from "../services/api";

const AuthProvider = ({children}) => {
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        const restoreSession = async () => {
            try {
              
                
                const res =await API.get("/api/admin/refresh");

                const newToken = res.data.accessToken;
              
                if (isMounted) {
                    setAccessToken(newToken);
                    API.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${newToken}`;
                }
            } catch {
                if (isMounted) {
                    setAccessToken(null);
                }
            }
        };
        restoreSession();

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        const interceptor = API.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                
                    try {
                        console.log(2);
                        
                        const res = await API.get("/api/admin/refresh");
                        const newToken = res.data.accessToken;
                
                        API.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
                        return API(originalRequest);
                    } catch (err) {
                        setAccessToken(null);
                        return Promise.reject(err);
                    }
                }
            }
        );
        return ()=> API.interceptors.response.eject(interceptor);
    },[]);

    const handleLogout=async()=>{
        try {
            const {data} = API.get("/api/admin/logout");

            if(data.success){
                setUser(null);
                setAccessToken(null);
                navigate("/admin-login",{state:`${data.message}`})
            }else{
                console.error(`${data.message}`)
            }
        } catch (error) {
            console.error(error);
            console.log(error.message);
        }
    }

    return (
        <AuthContext.Provider value={{handleLogout,user,setUser,accessToken,setAccessToken}}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
