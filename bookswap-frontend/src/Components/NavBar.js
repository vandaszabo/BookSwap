import {React, useState} from 'react';
import { Typography, AppBar, Button, Card, IconButton, CardActions, CardContent, CardMedia, Grid, Toolbar, Container } from '@mui/material';
import { AutoStories } from '@mui/icons-material';
import SearchInput from './SearchInput';
import SearchIcon from '@mui/icons-material/Search'; 

function NavBar() {
    const [searchValue, setSearchValue] = useState('');

    const bookTitles = [
        { title: 'Emma', id: 1 },
        { title: 'Love Story', id: 2 },
        { title: 'The Cats', id: 3 },
        { title: 'Normal People', id: 4 },
        { title: 'The Notebook', id: 5 }
    ]

    const handleSearch = (value) => {
        console.log("Selected:", value);
        setSearchValue(value)
    };

    const fetchBook = async()=>{
        console.log(`fetching this book: ${searchValue.title}`)
    }

    return (
        <>
            <AppBar position="relative" color='secondary'>  {/*Navigation bar*/}
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}> {/*blue line (inside we have icons of tools we want to add)*/}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <AutoStories />
                        <Typography variant="h6" style={{ marginLeft: '10px' }}>BookSwap</Typography>
                    </div>
                    <SearchInput onSearch={handleSearch} bookTitles={bookTitles} />
                    <Button onClick={fetchBook} color='inherit'> <SearchIcon/>Search</Button>
                    <Button color="inherit" align="end">Login</Button>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default NavBar;
