import React, { useState, useContext } from 'react';

//*********-------Creating a new React context named AuthContext-------*********//
const AuthContext = React.createContext();

//*********-------Custom hook named useAuth to easily access the AuthContext-------*********//
function useAuth() {
    return useContext(AuthContext);
};

//*********-------This component provides authentication-related context to its children-------*********//
function AuthProvider(props) {
    const storedUser = localStorage.getItem('authUser');
    const userObject = storedUser ? JSON.parse(storedUser) : null;

    const [authUser, setAuthUser] = useState(userObject);
    const [isLoggedIn, setIsLoggedIn] = useState(!!userObject);
   

    //*********-------Creating an object 'value' to be passed as the value prop to AuthContext.Provider-------*********//
    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn,
    }

    //*********-------Wrapping the children components with AuthContext.Provider, passing the 'value' object-------*********//
    return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
}

export { AuthProvider, useAuth };