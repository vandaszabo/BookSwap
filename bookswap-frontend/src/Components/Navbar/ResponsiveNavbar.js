import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import { AutoStories } from '@mui/icons-material';
import { useMediaQuery } from '@mui/material';
import { Typography, AppBar, Button, Avatar, IconButton, Menu, MenuItem, Tooltip, Container, Box } from '@mui/material';

import { useAuth } from '../Authentication/AuthContext';
import SearchInput from './SearchInput';

//*********-------Main function for Navbar-------*********//
function ResponsiveNavbar({setSelectedPost, setBookList, created}) {

    const [books, setBooks] = useState([]);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElBooks, setAnchorElBooks] = React.useState(null);

    const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();
    const isSmallScreen = useMediaQuery((theme)=>theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    //*********-------Handle input change in navbar Search field-------*********//
    const handleSearch = (value) => {
        setSelectedPost(value);
        navigate('/post');
    };

    //*********-------API call for getting all existing Posts-------*********//
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
                    setBookList(data);
                }
            } catch (error) {
                console.error(`Error in fetchBook: ${error.message}`);
            }
        };

        fetchData();
    }, [setBooks, setBookList, created]);

    //*********-------Handle click on Navbar Logout menu option-------*********//
    const logOut = () => {
        setIsLoggedIn(false);
        setAnchorElUser(null);
        setAuthUser(null);
        localStorage.removeItem('authUser');
        localStorage.removeItem('details');
        navigate('/login');
    };

    //*********-------Open menu on Navbar Avatar icon button-------*********//
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    //*********-------Close menu on Navbar Avatar icon button-------*********//
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    //*********-------Open menu on Navbar Menu icon button-------*********//
    const handleOpenMainMenu = (event) => {
        setAnchorElBooks(event.currentTarget);
    };

    //*********-------Close menu on Navbar Avatar icon button-------*********//
    const handleCloseMainMenu = () => {
        setAnchorElBooks(null);
    };

    return (
        <>
                <AppBar position="static"  elevation={0} color='primary' sx={{padding: '3px' }}>
                    <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ flexGrow: 1, display: 'flex' }}>
                            <Tooltip title="Menu">
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenMainMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box sx={{ flexGrow: 1, display: 'flex' }}>
                            <Menu
                                id="main-menu"
                                anchorEl={anchorElBooks}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElBooks)}
                                onClose={handleCloseMainMenu}
                                sx={{
                                    display: 'flex',
                                }}
                            >
                                <MenuItem component={Link} to={'/books'} onClick={()=>setAnchorElBooks(null)}>Books</MenuItem>
                            </Menu>
                        </Box>
                        <Box sx={{ flexGrow: 1, display: 'flex' }}>
                            {isSmallScreen ? null : (
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component={Link}
                                    to={'/'}
                                    sx={{
                                        mr: 2,
                                        display: 'flex',
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: 'inherit',
                                        textDecoration: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <AutoStories />
                                    BookSwap
                                </Typography>
                            )}
                        </Box>

                        <Box sx={{ flexGrow: 1, display: 'flex' }}>
                            {isSmallScreen ? null : (
                                    <SearchInput onSearch={handleSearch} books={books} />
                            )}
                        </Box>
                        <Box sx={{ flexGrow: 0, display: 'flex' }}>
                            {!isLoggedIn ? (
                                <>
                                    <Button component={Link} to={'/login'} color="inherit" align="end">
                                        <Typography variant="button" style={{ color: '' }}>Sign In</Typography>
                                    </Button> <Typography sx={{ alignSelf: 'center' }}>/</Typography>
                                    <Button component={Link} to={'/register'} color="inherit" align="end">
                                        <Typography variant="button" style={{ color: '#666666' }}>Sign Up</Typography>
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Tooltip title="Settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar
                                                alt={authUser.username}
                                                src={authUser && authUser.profileImage
                                                    ? authUser.profileImage
                                                    : "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                </>
                            )}
                        </Box>
                        <Menu
                            id="menu-user"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {authUser &&
                                <Typography variant='h6' sx={{
                                    borderBottom: (theme) => `2px solid ${theme.palette.primary.main}`, textAlign: 'center', justifySelf: 'center', fontFamily: 'monospace', fontWeight: 700,
                                }}>{authUser.username}</Typography>}
                            <MenuItem component={Link} to={'/create'} onClick={()=>setAnchorElUser(null)}>Create new post</MenuItem>
                            <MenuItem component={Link} to={'/profile'} onClick={()=>setAnchorElUser(null)}>Profile</MenuItem>
                            <MenuItem onClick={logOut}>Logout</MenuItem>
                        </Menu>
                    </Container>
                </AppBar>
        </>
    )
}

export default ResponsiveNavbar;