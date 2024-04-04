import { lightTheme } from "./Themes";

export const chatBoxStyle = {
    backgroundColor: lightTheme.palette.primary.main,
    borderRadius: '12px',
    position: 'fixed',
    bottom: 0,
    right:0,
    textAlign: 'center',
    zIndex: 1000,
  };

export const containerStyle = {
    backgroundColor: lightTheme.palette.primary.light,
    minHeight: '100vh',
  };