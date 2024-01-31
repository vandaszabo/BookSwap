import React from 'react';
import { CssBaseline } from '@mui/material';
import NavBar from './Components/NavBar';
import { useAuth } from './Components/AuthContext';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import { createTheme } from '@mui/material/styles';

function App() {
  const { showLogin, showRegistration } = useAuth();

  const myTheme = createTheme({
    palette: {
      primary: {
        main: '#1abc9c',
      },
      secondary: {
        main: '#34495e',
      },
    },
  });

  return (
    <>
        <CssBaseline />
        <NavBar myTheme={myTheme}/>

        {showLogin ? (
          <SignIn myTheme={myTheme}/>
        ) : showRegistration ? (
          <SignUp myTheme={myTheme}/>
        ) : (
          <h6>Dashboard</h6>
        )}
    </>
  );
}

export default App;
