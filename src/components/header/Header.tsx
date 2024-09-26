import { AppBar, Box, Toolbar, Typography } from "@mui/material";

const Header = () => {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        Hacker News
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}

export default Header;