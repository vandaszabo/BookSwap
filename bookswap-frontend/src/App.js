import { React, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
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
import Home from './Components/Home';

function App() {

  const [selectedPost, setSelectedPost] = useState({});
  const [bookList, setBookList] = useState([]);

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
          setSelectedPost={setSelectedPost}
          setBookList={setBookList} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/books" element={<Album books={bookList} setSelectedPost={setSelectedPost}/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post" element={<SelectedPost book={selectedPost} />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
