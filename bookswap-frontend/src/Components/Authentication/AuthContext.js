import React, {useState, useContext} from 'react';

const AuthContext = React.createContext();

function useAuth(){
    return useContext(AuthContext);
}

function AuthProvider(props){
    const storedUser = localStorage.getItem('authUser');
    const storedDetails = localStorage.getItem('details');
    const userObject = storedUser ? JSON.parse(storedUser) : null;
    const detailsObject = storedDetails ? JSON.parse(storedDetails) : null;
    const fullUserObj = { ...(userObject || {}), ...(detailsObject || {}) };
    
    const [authUser, setAuthUser] = useState(fullUserObj);
    const [isLoggedIn, setIsLoggedIn] = useState(!!userObject);
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