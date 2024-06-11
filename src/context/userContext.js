import React, { useState } from "react";

// userContext.js

const UserContext = React.createContext();

// provider 

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (user) => {
        
        setUser(user);
        setIsAuthenticated(true);
    }
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    }
    return <UserContext.Provider value={{user, login, logout, isAuthenticated}}>{children}</UserContext.Provider>
}

export default UserProvider;