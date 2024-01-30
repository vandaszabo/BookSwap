import React, {useState, useEffect, useContext} from 'react';

const AuthContext = React.createContext();

function useAuth(){
    return useContext(AuthContext);
}

function AuthProvider(props){
    const [authUser, setAuthUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const value = {
        authUser,
        setAuthUser,
        isLoggedIn
    }

    return(
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
}

export {AuthProvider, useAuth};