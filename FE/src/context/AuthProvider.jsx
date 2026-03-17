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
                const res = API.get("api/user/refresh");

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
                if(error.response?.status === 401 && !originalRequest._retry){
                    originalRequest._retry=true;
                    const newToken = await API.get("/api/user/refresh").then((res)=>res.data.accessToken)
                
                    if(newToken){
                      API.defaults.headers.common["Authorization"]=`Bearer ${newToken}`;
                      return API(originalRequest);  
                    }else{
                        setAccessToken(null);
                    }
                
                return Promise.reject(error);
                }
            }
        );
        return ()=> API.interceptors.response.eject(interceptor);
    },[]);

    const handleLogout=async()=>{
        try {
            const {data} = API.get("/api/user/logout");

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
