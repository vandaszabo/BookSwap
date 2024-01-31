import React from 'react';
import { CssBaseline } from '@mui/material';
import NavBar from './Components/NavBar';
import { useAuth } from './Components/AuthContext';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import { createTheme } from '@mui/material/styles';
import CreatePost from './Components/CreatePost';

function App() {
  const { showLogin, showRegistration } = useAuth();

  const myTheme = createTheme({
    palette: {
      primary: {
        main: '#EEC824',
        light: '#F2DC99'
      },
      secondary: {
        main: '#6A961F',
        light: '#92B473'
      },
      info: {
        main: '#A0DFDF'
      }
    },
  });

  const containerStyle = {
    backgroundColor: myTheme.palette.info.main,
    minHeight: '100vh'
  };

  return (
    <div style={containerStyle}>
        <CssBaseline />
        <NavBar myTheme={myTheme}/>

        {showLogin ? (
          <SignIn myTheme={myTheme}/>
        ) : showRegistration ? (
          <SignUp myTheme={myTheme}/>
        ) : (
          <CreatePost  myTheme={myTheme}/>
        )}
    </div>
  );
}

export default App;
