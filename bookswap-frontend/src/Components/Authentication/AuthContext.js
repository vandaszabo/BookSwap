import React, {useState, useContext} from 'react';

const AuthContext = React.createContext();

function useAuth(){
    return useContext(AuthContext);
}

function AuthProvider(props){
    const [authUser, setAuthUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegistration, setShowRegistration] = useState(false);

    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn,
        showLogin,
        setShowLogin,
        showRegistration, 
        setShowRegistration
    }

    return(
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
}

export {AuthProvider, useAuth};