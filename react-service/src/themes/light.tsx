import { ThemeOptions } from "@mui/material";
import { grey, red, teal } from "@mui/material/colors";

export const lightTheme: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: teal[400],
        },
        secondary: {
            main: grey[300],
        },
        error: {
            main: red.A400,
        },
    },
};