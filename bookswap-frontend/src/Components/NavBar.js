import { React, useEffect, useState } from 'react';
import { Typography, AppBar, Button, Card, IconButton, CardActions, CardContent, CardMedia, Grid, Toolbar, Container } from '@mui/material';
import { AutoStories } from '@mui/icons-material';
import SearchInput from './SearchInput';
import SearchIcon from '@mui/icons-material/Search';
import {useAuth} from './AuthContext';

function NavBar() {
    const [searchValue, setSearchValue] = useState('');
    const [books, setBooks] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const {authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

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
                    setErrorMessage(`Error getting books, status: ${response.status}`);
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                if (data !== null) {
                    setBooks(data);
                }
            } catch (error) {
                console.error(`Error in fetchBook: ${error.message}`);
                setErrorMessage(error.message);
            }
        };

        fetchData();
    }, []);

    const displayPost =()=>{
        console.log('Display this:', searchValue);
    }

    return (
        <>
            <AppBar position="relative" color='secondary'>  {/*Navigation bar*/}
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}> {/*blue line (inside we have icons of tools we want to add)*/}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <AutoStories />
                        <Typography variant="h6" style={{ marginLeft: '10px' }}>BookSwap</Typography>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <SearchInput onSearch={handleSearch} books={books} />
                        <Button onClick={displayPost} color='inherit'> <SearchIcon />Search</Button>
                    </div>

                    <Button color="inherit" align="end">{!isLoggedIn ? 'Login' : 'Logout'}</Button>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default NavBar;
