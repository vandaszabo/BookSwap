import { React, useState } from 'react';
import { useAuth } from './Components/Authentication/AuthContext';
import SignIn from './Components/Authentication/SignIn';
import SignUp from './Components/Authentication/SignUp';
import { createTheme } from '@mui/material/styles';
import CreatePost from './Components/CreatePost';
import ResponsiveNavbar from './Components/ResponsiveNavbar';
import Album from './Components/Album';
import Profile from './Components/Profile';
import SelectedPost from './Components/SelectedPost';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

function App() {
  const { showLogin, showRegistration } = useAuth();
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showBooks, setShowBooks] = useState(false);
  const [bookList, setBookList] = useState(false);
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const myTheme = createTheme({
    palette: {
      primary: {
        main: '#FFA500',
        light: '#ffb52e',
      },
      secondary: {
        main: '#FFFFFF',
        light: '#f4f4f4',
      }
    },
  });

  const containerStyle = {
    backgroundColor: 'myTheme.palette.primary.main',
    minHeight: '100vh',

  };

  return (
    <ThemeProvider theme={myTheme}>
      <div style={containerStyle}>
        <CssBaseline />
        <ResponsiveNavbar
          setShowCreatePost={setShowCreatePost}
          setBookList={setBookList}
          setShowProfilePage={setShowProfilePage}
          setShowBooks={setShowBooks}
          setSearchValue={setSearchValue}
        />

        {showLogin ? (
          <SignIn
          />
        ) : showRegistration ? (
          <SignUp
          />
        ) : showCreatePost ? (
          <CreatePost
            setShowCreatePost={setShowCreatePost}
          />
        ) : showProfilePage ? (
          <Profile />
        ) : showBooks ? (
          <Album
            books={bookList}
            setSearchValue={setSearchValue}
            setShowBooks={setShowBooks}
          />
        ) : searchValue ? (
          <SelectedPost book={searchValue} />
        ) : (
          <h1>Home Page</h1>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
