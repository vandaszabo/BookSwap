import React, { useState, useEffect } from 'react';
import { Typography, AppBar, Button, CssBaseline, Avatar, IconButton, Menu, MenuItem, Tooltip, Container, Box } from '@mui/material';
import { AutoStories } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import { useAuth } from './Authentication/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SearchInput from './Forms/SearchInput';
import { useMediaQuery } from '@mui/material';


function ResponsiveNavbar({ myTheme, setShowCreatePost }) {
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
        setAnchorElUser(null);
        setAuthUser(null);
        localStorage.removeItem('authUser');
        localStorage.removeItem('details');
    };

    const register = () => {
        setShowRegistration(true);
        setShowLogin(false);
    };

    const showProfile = () => {
        setAnchorElUser(null);
        console.log("profile", authUser)
    };

    const showBooks = () => {
        console.log("books");
        setAnchorElBooks(null);
    }

    const showUsers = () => {
        console.log("users");
        setAnchorElBooks(null);
    }
    const createPost = () => {
        setAnchorElUser(null);
        setShowCreatePost(true);
    }
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
                <AppBar position="static" color='primary' sx={{ backgroundColor: myTheme.palette.primary.main, padding: '3px' }}>
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
                                <MenuItem onClick={showUsers}>Users</MenuItem>
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
                                <>
                                    <SearchInput onSearch={handleSearch} books={books} theme={myTheme} />
                                    <Tooltip title="Search">
                                        <Button
                                            onClick={displayPost}
                                            color='inherit'
                                            style={{ backgroundColor: myTheme.palette.secondary.light, height: '100%' }}
                                        >
                                            <SearchIcon />
                                        </Button>
                                    </Tooltip>
                                </>
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
                            <Typography variant='h6' sx={{borderBottom: `2px solid ${myTheme.palette.primary.main}`, textAlign: 'center', justifySelf: 'center', fontFamily: 'monospace', fontWeight: 700,
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
