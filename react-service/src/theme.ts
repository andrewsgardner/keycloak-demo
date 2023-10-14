import { createTheme } from '@mui/material/styles';
import { grey, red, teal } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: teal[400],
        },
        secondary: {
            main: grey[400],
        },
        error: {
            main: red.A400,
        },
    },
});

export default theme;