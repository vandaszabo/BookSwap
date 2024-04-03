import { React, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { CssBaseline, Button, Box } from '@mui/material';
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
import PrivateChat from './Components/Chat/PrivateChat';
import { useChat } from './Components/Chat/ChatContext';
import { chatBoxStyle, containerStyle } from './Style/Styles';

function App() {
  const { authUser, isLoggedIn } = useAuth();
  const { receiverName, messages } = useChat();
  
  const [bookList, setBookList] = useState([]);
  const [created, setCreated] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const [editingPost, setEditingPost] = useState({});
  const [othersList, setOthersList] = useState([]);
  const [hideChat, setHideChat] = useState(false);


  //*********-------Filter out your own posts-------*********//
  useEffect(() => {
    if (authUser && bookList) {
      const updatedOthersList = bookList.filter(book => book.userId !== authUser.id);
      setOthersList(updatedOthersList);
    }
  }, [authUser, bookList]);

  // Show chat if message received
  useEffect(()=>{
    setHideChat(false);
  },[messages]);

  return (
    <ThemeProvider theme={lightTheme}>
      <div style={containerStyle}>
        <CssBaseline />

        <ResponsiveNavbar
          setSelectedPost={setSelectedPost}
          setBookList={setBookList}
          created={created} />

        <Routes>
          <Route path="/" element={<Home setSelectedPost={setSelectedPost} />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/books" element={<AllBooks books={othersList} setSelectedPost={setSelectedPost} />} />
          <Route path="/profile" element={<Profile setSelectedPost={setSelectedPost} setEditingPost={setEditingPost} />} />
          <Route path="/post" element={<SelectedPost book={selectedPost} backPath='/books' />} />
          <Route path="/your-post" element={<SelectedPost book={selectedPost} backPath='/profile' />} />
          <Route path="/edit-post" element={<PostEdit book={editingPost} />} />
          <Route path="/create" element={<CreatePost setCreated={setCreated} />} />
        </Routes>

        {messages.length > 0 || receiverName ? (
          <Box sx={chatBoxStyle}>
            {!hideChat && isLoggedIn &&
            <PrivateChat />}
            <Button variant='outlined' sx={{backgroundColor: (theme)=> theme.palette.primary.fair, minWidth: '100%'}} onClick={() => setHideChat(!hideChat)}>{!hideChat ? "Hide chat" : "Show chat"}</Button>
          </Box>
        ) : null}
      </div>
    </ThemeProvider>
  );
}

export default App;
