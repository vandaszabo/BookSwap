import { React, useEffect, useState } from 'react';
import { Typography, AppBar, Button, Card, IconButton, CardActions, CardContent, CardMedia, Grid, Toolbar, Container } from '@mui/material';
import { AutoStories } from '@mui/icons-material';
import SearchInput from './SearchInput';
import SearchIcon from '@mui/icons-material/Search';

function NavBar() {
    const [searchValue, setSearchValue] = useState('');
    const [books, setBooks] = useState([]);
    const [post, setPost] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

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


    const fetchBook = async () => {
        console.log(`fetching this bookPost: ${searchValue.title, searchValue.postId}`)
        try {
            const response = await fetch(`http://localhost:5029/api/BookPost/${searchValue.postId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                setErrorMessage(`Error getting bookPost, status: ${response.status}`);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data !== null) {
                setPost(data);
                console.log(data);
                return data;
            }
        } catch (error) {
            console.error(`Error in fetchBook: ${error.message}`);
            setErrorMessage(error.message);
        }
    };


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
                        <Button onClick={fetchBook} color='inherit'> <SearchIcon />Search</Button>
                    </div>

                    <Button color="inherit" align="end">Login</Button>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default NavBar;
