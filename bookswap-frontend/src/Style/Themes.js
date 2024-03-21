import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        primary: {
            main: '#006D5B',
            light: '#FFFFFF',
        },
        secondary: {
            //main: '#9FCC4B',
            main: '#00A388',
            light: '#bfbfbf',
            medium: '#f0cb84',
            beige: '#E5DFD3',
            darkBeige: '#a4967c',
            grey: '#f6f6f6',
            darkGrey: "#737373",
            brown: "#7d593f",
            black: "#000000",
            green: "#00d200"
        },
        background: {
            main: '#F2CCB6',
        },
    },
});

export const darkTheme = createTheme({
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#333333',
                },
            },
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    color: 'white',
                },
                secondary: {
                    color: 'lightgrey',
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                body1: {
                    color: 'white',
                },
                body2: {
                    color: '#D3D3D3',
                },
            },
        },
    },
    palette: {
        primary: {
            main: '#5A5A5A',  //grey
            light: '#000000',  //dark black
        },
        secondary: {
            main: '#D3D3D3',  //light grey
            light: '#4682B4',  //dark blue
        },
        background: {
            main: '#121212',  //black
        },
    },
});
