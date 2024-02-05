import React, { useState, useEffect } from 'react';
import { Typography, AppBar, Button, CssBaseline, Avatar, IconButton, Menu, MenuItem, Tooltip, Container, Box } from '@mui/material';
import { AutoStories } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import { useAuth } from './Authentication/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';
import SearchInput from './Forms/SearchInput';
import { useMediaQuery } from '@mui/material';

//*********-------Main function for Navbar-------*********//
function ResponsiveNavbar({ myTheme, setShowCreatePost, setBookList, setShowProfilePage, setShowBooks, setSearchValue }) {


    const [books, setBooks] = useState([]);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElBooks, setAnchorElBooks] = React.useState(null);
    const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn, setShowLogin, setShowRegistration } = useAuth();
    const isSmallScreen = useMediaQuery(myTheme.breakpoints.down('sm'));

    //*********-------Handle input change in navbar Search field-------*********//
    const handleSearch = (value) => {
        setSearchValue(value);
        setShowBooks(false);
        setShowProfilePage(false);
        setShowCreatePost(false);

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
    }, [setBooks, setBookList]);

    //*********-------Handle click on Navbar Sign In button-------*********//
    const logIn = () => {
        setShowLogin(true);
        setShowRegistration(false);
    };

    //*********-------Handle click on Navbar Logout menu option-------*********//
    const logOut = () => {
        setIsLoggedIn(false);
        setAnchorElUser(null);
        setAuthUser(null);
        localStorage.removeItem('authUser');
        localStorage.removeItem('details');
    };

    //*********-------Handle click on Navbar Sign Up button-------*********//
    const register = () => {
        setShowRegistration(true);
        setShowLogin(false);
    };

    //*********-------Handle click on Navbar Profile menu option-------*********//
    const showProfile = () => {
        setAnchorElUser(null);
        setShowProfilePage(true);
        setShowCreatePost(false);
        setShowBooks(false);
    };

    //*********-------Handle click on Navbar Books menu option-------*********//
    const showBooks = () => {
        setAnchorElBooks(null);
        setShowBooks(true);
        setShowProfilePage(false);
        setShowCreatePost(false);
    };

    //*********-------Handle click on Navbar Create new Post menu option-------*********//
    const createPost = () => {
        setAnchorElUser(null);
        setShowCreatePost(true);
        setShowBooks(false);
        setShowProfilePage(false);
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
            <ThemeProvider theme={myTheme}>
                <CssBaseline />
                <AppBar position="static" color='primary' sx={{ background: myTheme.palette.primary.main, padding: '3px' }}>
                    <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ flexGrow: 1, display: 'inline-flex' }}>
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
                        <Box sx={{ flexGrow: 1, display: 'inline-flex' }}>
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
                                <MenuItem onClick={showBooks}>Books</MenuItem>
                            </Menu>
                        </Box>
                        <Box sx={{ flexGrow: 1, display: 'inline-flex' }}>
                            {isSmallScreen ? null : (
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="a"
                                    onClick={() => {
                                        window.location.reload()
                                    }}
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

                        <Box sx={{ flexGrow: 1, display: 'inline-flex' }}>
                            {isSmallScreen ? null : (
                                    <SearchInput onSearch={handleSearch} books={books} theme={myTheme} />
                            )}
                        </Box>
                        <Box sx={{ flexGrow: 0, display: 'inline-flex' }}>
                            {!isLoggedIn ? (
                                <>
                                    <Button onClick={logIn} color="inherit" align="end">
                                        <Typography variant="button" style={{ color: '' }}>Sign In</Typography>
                                    </Button> <Typography sx={{ alignSelf: 'center' }}>/</Typography>
                                    <Button onClick={register} color="inherit" align="end">
                                        <Typography variant="button" style={{ color: '#999999' }}>Sign Up</Typography>
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
                                    borderBottom: `2px solid ${myTheme.palette.primary.main}`, textAlign: 'center', justifySelf: 'center', fontFamily: 'monospace', fontWeight: 700,
                                }}>{authUser.username}</Typography>}
                            <MenuItem onClick={createPost}>Create new post</MenuItem>
                            <MenuItem onClick={showProfile}>Profile</MenuItem>
                            <MenuItem onClick={logOut}>Logout</MenuItem>
                        </Menu>
                    </Container>
                </AppBar>
            </ThemeProvider>
        </>
    )
}

export default ResponsiveNavbar;
