import { React, useState } from 'react';
import { CssBaseline } from '@mui/material';
import { useAuth } from './Components/Authentication/AuthContext';
import SignIn from './Components/Authentication/SignIn';
import SignUp from './Components/Authentication/SignUp';
import { createTheme } from '@mui/material/styles';
import CreatePost from './Components/CreatePost';
import ResponsiveNavbar from './Components/ResponsiveNavbar';
import Album from './Components/Album';
import Profile from './Components/Profile';
import SelectedPost from './Components/SelectedPost';

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
        //main: '#FFA500',
        //main: '#567C57',
        main: '#03490C',
        light: '#A9B388'
      },
      secondary: {
        main: '#f4f4f4',
        light: '#BAD162'
      }
    },
  });

  const containerStyle = {
    backgroundColor: myTheme.palette.secondary.main,
    minHeight: '100vh'
  };

  return (
    <div style={containerStyle}>
      <CssBaseline />
      <ResponsiveNavbar
        myTheme={myTheme}
        setShowCreatePost={setShowCreatePost}
        setBookList={setBookList}
        setShowProfilePage={setShowProfilePage}
        setShowBooks={setShowBooks}
        setSearchValue={setSearchValue}
      />

      {showLogin ? (
        <SignIn
          myTheme={myTheme}
        />
      ) : showRegistration ? (
        <SignUp
          myTheme={myTheme}
        />
      ) : showCreatePost ? (
        <CreatePost
          myTheme={myTheme}
          setShowCreatePost={setShowCreatePost}
        />
      ) : showProfilePage ? (
        <Profile />
      ) : showBooks ? (
        <Album
          theme={myTheme}
          books={bookList}
        />
      ) : searchValue ? (
        <SelectedPost book={searchValue}/>
      ):(
        <h1>Home Page</h1>
      )}
    </div>
  );
}

export default App;
