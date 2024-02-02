import {React, useState} from 'react';
import { CssBaseline } from '@mui/material';
import { useAuth } from './Components/Authentication/AuthContext';
import SignIn from './Components/Authentication/SignIn';
import SignUp from './Components/Authentication/SignUp';
import { createTheme } from '@mui/material/styles';
import CreatePost from './Components/CreatePost';
import ResponsiveNavbar from './Components/ResponsiveNavbar';

function App() {
  const { showLogin, showRegistration } = useAuth();
  const [showCreatePost, setShowCreatePost] = useState(false);

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
        <ResponsiveNavbar myTheme={myTheme} setShowCreatePost={setShowCreatePost}/>

        {showLogin ? (
          <SignIn myTheme={myTheme}/>
        ) : showRegistration ? (
          <SignUp myTheme={myTheme}/>
        ) : showCreatePost ? (
          <CreatePost  myTheme={myTheme}/>
        ): <div>Home page</div>}
    </div>
  );
}

export default App;
