import { React, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Container } from '@mui/material';
import Switch from '@mui/material/Switch';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';

import Home from './Pages/Home';
import Profile from './Pages/Profile';
import AllBooks from './Pages/AllBooks';
import CreatePost from './Pages/CreatePost';
import SelectedPost from './Pages/SelectedPost';
import SignIn from './Components/Authentication/SignIn';
import SignUp from './Components/Authentication/SignUp';
import ResponsiveNavbar from './Components/Navbar/ResponsiveNavbar';
import { useAuth } from './Components/Authentication/AuthContext';
import { lightTheme, darkTheme } from './Style/Themes';

function App() {
  const { authUser } = useAuth();
  const [bookList, setBookList] = useState([]);
  const [created, setCreated] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const [othersList, setOthersList] = useState([]);

  useEffect(() => {
    if (authUser) {
      const updatedOthersList = bookList.filter(book => book.userId !== authUser.id);
      setOthersList(updatedOthersList);
    }
  }, [authUser, bookList]);

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
            control={<Switch checked={darkMode} onChange={toggleDarkMode} size='small' />}
            label="Dark Mode"
          />
        </Container>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/books" element={<AllBooks books={othersList} setSelectedPost={setSelectedPost} />} />
          <Route path="/profile" element={<Profile setSelectedPost={setSelectedPost} />} />
          <Route path="/post" element={<SelectedPost book={selectedPost} backPath='/books' />} />
          <Route path="/your-post" element={<SelectedPost book={selectedPost} backPath='/profile' />} />
          <Route path="/create" element={<CreatePost setCreated={setCreated} />} />
        </Routes>

      </div>
    </ThemeProvider>
  );
}

export default App;
