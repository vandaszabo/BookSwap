import React, { useState, useEffect } from 'react';
import { Typography, AppBar, Button, CssBaseline, Avatar, IconButton, Menu, MenuItem, Tooltip, Container, Box } from '@mui/material';
import { AutoStories } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import { useAuth } from './Authentication/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SearchInput from './Forms/SearchInput';
import { useMediaQuery } from '@mui/material';


function ResponsiveNavbar({ myTheme }) {
    const [searchValue, setSearchValue] = useState('');
    const [books, setBooks] = useState([]);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElBooks, setAnchorElBooks] = React.useState(null);
    const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn, setShowLogin, setShowRegistration } = useAuth();
    const isSmallScreen = useMediaQuery(myTheme.breakpoints.down('sm'));

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
    };

    const logIn = () => {
        setShowLogin(true);
        setShowRegistration(false);
    };

    const logOut = () => {
        setIsLoggedIn(false);
        setAuthUser(null);
        localStorage.removeItem('authUser');
        localStorage.removeItem('details');
    };

    const register = () => {
        setShowRegistration(true);
        setShowLogin(false);
    };

    const showProfile = () => {
        console.log("profile", authUser)
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenMainMenu = (event) => {
        setAnchorElBooks(event.currentTarget);
    };

    const handleCloseMainMenu = () => {
        setAnchorElBooks(null);
    };

    return (
        <>
            <ThemeProvider theme={myTheme}>
                <CssBaseline />
                <AppBar position="static" color='primary' sx={{ backgroundColor: myTheme.palette.primary.main}}>
                    <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ flexGrow: 1, display: 'inline-flex' }}>
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
                                    <MenuItem onClick={() => console.log("books")}>Books</MenuItem>
                                    <MenuItem onClick={() => console.log("users")}>Users</MenuItem>
                                </Menu>
                            </Box>
                            <Box sx={{ flexGrow: 1, display: 'inline-flex' }}>
                                {isSmallScreen ? null : (
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        component="a"
                                        href="#app-bar-with-responsive-menu"
                                        sx={{
                                            mr: 2,
                                            display: 'flex',
                                            fontFamily: 'monospace',
                                            fontWeight: 700,
                                            letterSpacing: '.3rem',
                                            color: 'inherit',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        <AutoStories />
                                        BookSwap
                                    </Typography>
                                )}
                            </Box>

                            <Box sx={{ flexGrow: 1, display: 'inline-flex' }}>
                                {isSmallScreen ? null : (
                                    <>
                                        <SearchInput onSearch={handleSearch} books={books} theme={myTheme} />
                                        <Button
                                            onClick={displayPost}
                                            color='inherit'
                                            style={{ backgroundColor: myTheme.palette.secondary.light, height: '100%' }}
                                        >
                                            <SearchIcon />
                                        </Button>
                                    </>
                                )}
                            </Box>
                            <Box sx={{ flexGrow: 0, display: 'inline-flex' }}>
                                {!isLoggedIn ? (
                                    <>
                                        <Button onClick={logIn} color="inherit" align="end">
                                            <Typography variant="button" style={{ color: '' }}>Sign In</Typography>
                                        </Button> <Typography sx={{alignSelf: 'center'}}>/</Typography>
                                        <Button onClick={register} color="inherit" align="end">
                                            <Typography variant="button" style={{ color: '#999999' }}>Sign Up</Typography>
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Tooltip title="Open settings">
                                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                                <Avatar
                                                    alt={authUser.username}
                                                    src={authUser && authUser.profileImage
                                                        ? authUser.profileImage
                                                        : "https://cdn.icon-icons.com/icons2/2643/PNG/512/avatar_female_woman_person_people_white_tone_icon_159360.png"}
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
