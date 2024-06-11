// user authentication hook

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserContext from "../context/userContext";

const useUserAuth = () => {
    const navigate = useNavigate();
    const { user } = useUserContext();
    
    useEffect(() => {
        if (!user) {
        navigate("/login");
        }
    }, [user, navigate]);
    }

export default useUserAuth;