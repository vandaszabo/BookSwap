import React, { useState, useEffect } from 'react';
import {
    Typography,
    AppBar,
    Button,
    Toolbar,
    CssBaseline,
    Avatar,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    Container,
    Box,
} from '@mui/material';
import { AutoStories } from '@mui/icons-material';
import SearchInput from './SearchInput';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from './Authentication/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';


function ResponsiveNavbar({ myTheme }) {
    const [searchValue, setSearchValue] = useState('');
    const [books, setBooks] = useState([]);

    const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn, setShowLogin, setShowRegistration } = useAuth();

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
        setAuthUser(null);
        localStorage.removeItem('authUser');
    }

    const register = () => {
        setShowRegistration(true);
        setShowLogin(false);
    }
    const showProfile = () => {
        <div>{authUser.username}</div>
    }

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
                <ThemeProvider theme={myTheme}>
                <CssBaseline />
                <AppBar position="relative" color='primary' sx={{ backgroundColor: myTheme.palette.primary.main }}>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
                             <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex'} }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenUserMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>

                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'flex' },
                                    }}
                                >
                                    <MenuItem onClick={showProfile}>
                                        <Typography textAlign="center">Books</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={logOut}>
                                        <Typography textAlign="center">Users</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="#app-bar-with-responsive-menu"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
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

                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                <SearchInput onSearch={handleSearch} books={books} theme={myTheme} />
                                <Button
                                    onClick={displayPost}
                                    color='inherit'
                                    style={{ backgroundColor: myTheme.palette.secondary.light, height: '100%' }}
                                >
                                    <SearchIcon />
                                </Button>
                            </Box>

                            <Box sx={{ flexGrow: 0 }}>
                                {!isLoggedIn ? (
                                    <>
                                        <Button onClick={logIn} color="inherit" align="end">
                                            <Typography variant="button" style={{ color: '' }}>Sign In</Typography>
                                        </Button> /
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
                                        <Menu
                                            sx={{ mt: '45px' }}
                                            id="menu-appbar"
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
                                            <MenuItem onClick={showProfile}>
                                                <Typography textAlign="center">Profile</Typography>
                                            </MenuItem>
                                            <MenuItem onClick={logOut}>
                                                <Typography textAlign="center">Logout</Typography>
                                            </MenuItem>
                                        </Menu>
                                    </>
                                )}
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </ThemeProvider>
        </>
    )
}

export default ResponsiveNavbar;
