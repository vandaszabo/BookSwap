import { React, useEffect, useState } from 'react';
import { Typography, AppBar, Button, Card, IconButton, CardActions, CardContent, CardMedia, Grid, Toolbar, Container, CssBaseline } from '@mui/material';
import { AutoStories } from '@mui/icons-material';
import SearchInput from './SearchInput';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from './AuthContext';
import { ThemeProvider } from '@mui/material/styles';

function NavBar({ myTheme }) {
    const [searchValue, setSearchValue] = useState('');
    const [books, setBooks] = useState([]);

    const { isLoggedIn, setIsLoggedIn, setShowLogin, showLogin, showRegistration, setShowRegistration } = useAuth();

    const handleSearch = (value) => {
        console.log("Selected:", value);
        setSearchValue(value)
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5029/api/BookPost/List", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                if (data !== null) {
                    setBooks(data);
                }
            } catch (error) {
                console.error(`Error in fetchBook: ${error.message}`);
            }
        };

        fetchData();
    }, []);

    const displayPost = () => {
        console.log('Display this:', searchValue);
    }

    const logIn = () => {
        setShowLogin(true);
        setShowRegistration(false);
    }
    const logOut = () => {
        setIsLoggedIn(false);
    }
    const register = () => {
        setShowRegistration(true);
        setShowLogin(false);
    }

    return (
        <>
            <ThemeProvider theme={myTheme}>
                <CssBaseline />
                <AppBar position="relative" color='primary' sx={{ backgroundColor: myTheme.palette.primary.main }}>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <AutoStories />
                            <Typography variant="h6" style={{ marginLeft: '10px' }}>BookSwap</Typography>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <SearchInput onSearch={handleSearch} books={books} theme={myTheme}/>
                            <Button onClick={displayPost} color='inherit' style={{ backgroundColor: myTheme.palette.secondary.light, height: '100%'}}> <SearchIcon/></Button>
                        </div>

                        {!isLoggedIn ? (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Button onClick={logIn} color="inherit" align="end"><Typography variant="button" style={{ color: '' }}>Sign In</Typography></Button> /
                                <Button onClick={register} color="inherit" align="end"><Typography variant="button" style={{ color: '#999999' }}>Sign Up</Typography></Button></div>) : (
                            <Button onClick={logOut} color="inherit" align="end"><Typography variant="button" style={{ marginLeft: '10px' }}>Logout</Typography></Button>
                        )}

                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </>
    )
}

export default NavBar;
