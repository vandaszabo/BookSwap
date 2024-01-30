import React from 'react';
import { CssBaseline } from '@mui/material';
import NavBar from './Components/NavBar';
import { AuthProvider } from './Components/AuthContext';

function App() {
  return (

    <AuthProvider>
      <CssBaseline />  {/*Default Styling for my UI application*/}
      <NavBar />
    </AuthProvider>

  );
}

export default App;
