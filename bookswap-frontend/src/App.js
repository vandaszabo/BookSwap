import { React, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Container } from '@mui/material';
import Switch from '@mui/material/Switch';
import { CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';

import Home from './Components/Home';
import Profile from './Components/Profile';
import AllBooks from './Components/AllBooks';
import CreatePost from './Components/CreatePost';
import SelectedPost from './Components/SelectedPost';
import SignIn from './Components/Authentication/SignIn';
import SignUp from './Components/Authentication/SignUp';
import ResponsiveNavbar from './Components/Navbar/ResponsiveNavbar';

function App() {

  const [bookList, setBookList] = useState([]);
  const [created, setCreated] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});

  const lightTheme = createTheme({
    palette: {
      primary: {
        main: '#5bb450',
        light: '#FFFFFF',
      },
      secondary: {
        main: '#003B4A',
        light: '#acd8a7',
      },
      background: {
        main: '#F2CCB6',
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#5A5A5A',
        light: '#000000',
      },
      secondary: {
        main: '#00BFFF',
        light: '#4682B4',
      },
      background: {
        main: '#121212',
      },
    },
  });

  const selectedTheme = darkMode ? darkTheme : lightTheme;

  const containerStyle = {
    backgroundColor: selectedTheme.palette.primary.light,
    minHeight: '100vh',
  };

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <ThemeProvider theme={selectedTheme}>
      <div style={containerStyle}>
        <CssBaseline />

        <ResponsiveNavbar
          setSelectedPost={setSelectedPost}
          setBookList={setBookList}
          created={created} />

        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <FormControlLabel
            control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
            label="Dark Mode"
          />
        </Container>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/books" element={<AllBooks books={bookList} setSelectedPost={setSelectedPost} />} />
          <Route path="/profile" element={<Profile setSelectedPost={setSelectedPost}/>} />
          <Route path="/post" element={<SelectedPost book={selectedPost} backPath='/books'/>} />
          <Route path="/your-post" element={<SelectedPost book={selectedPost} backPath='/profile'/>} />
          <Route path="/create" element={<CreatePost setCreated={setCreated} />} />
        </Routes>

      </div>
    </ThemeProvider>
  );
}

export default App;
