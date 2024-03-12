import { React, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import PostEdit from './Components/Forms/PostEdit';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import AllBooks from './Pages/AllBooks';
import CreatePost from './Pages/CreatePost';
import SelectedPost from './Pages/SelectedPost';
import SignIn from './Components/Authentication/SignIn';
import SignUp from './Components/Authentication/SignUp';
import ResponsiveNavbar from './Components/Navbar/ResponsiveNavbar';
import { useAuth } from './Components/Authentication/AuthContext';
import { lightTheme } from './Style/Themes';

function App() {
  const { authUser } = useAuth();
  const [bookList, setBookList] = useState([]);
  const [created, setCreated] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const [editingPost, setEditingPost] = useState({});
  const [othersList, setOthersList] = useState([]);


  //*********-------Filter out your own posts-------*********//
  useEffect(() => {
    if (authUser) {
      const updatedOthersList = bookList.filter(book => book.userId !== authUser.id);
      setOthersList(updatedOthersList);
    }
  }, [authUser, bookList]);


    //*********-------Set theme-------*********//
  const selectedTheme = lightTheme;

  const containerStyle = {
    backgroundColor: selectedTheme.palette.primary.light,
    minHeight: '100vh',
  };

  return (
    <ThemeProvider theme={selectedTheme}>
      <div style={containerStyle}>
        <CssBaseline />

        <ResponsiveNavbar
          setSelectedPost={setSelectedPost}
          setBookList={setBookList}
          created={created} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/books" element={<AllBooks books={othersList} setSelectedPost={setSelectedPost} />} />
          <Route path="/profile" element={<Profile setSelectedPost={setSelectedPost} setEditingPost={setEditingPost}/>} />
          <Route path="/post" element={<SelectedPost book={selectedPost} backPath='/books' />} />
          <Route path="/your-post" element={<SelectedPost book={selectedPost} backPath='/profile' />} />
          <Route path="/edit-post" element={<PostEdit book={editingPost} /> } />
          <Route path="/create" element={<CreatePost setCreated={setCreated} />} />
        </Routes>

      </div>
    </ThemeProvider>
  );
}

export default App;
