import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import { default as AppToolbar } from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';

import './Toolbar.scss';
import { Avatar, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, Theme, Tooltip, useTheme } from '@mui/material';
import { Value } from 'sass';

const Toolbar = () => {
    const theme: Theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [roles, setRoles] = React.useState<string[]>(['test1', 'test2']);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getRoles = (element: React.ReactElement) => {
        return roles.map((value: string) => React.cloneElement(element), {
            key: Value,
        });
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                elevation={0}>
                <AppToolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        React Service
                    </Typography>
                    <Tooltip title="Account settings">
                        <Button
                            variant="text"
                            startIcon={<AccountCircleIcon sx={{ width: 32, height: 32 }} />}
                            onClick={handleClick}
                            size="small"
                            sx={{ 
                                ml: 2, 
                                color: theme.palette.background.paper, 
                                fontSize: 14, 
                                textTransform: 'lowercase',
                            }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}>
                            Test
                        </Button>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        slotProps={{
                            paper: {
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                        <AppBar
                            position="static"
                            elevation={0}>
                            <AppToolbar 
                                disableGutters={true}
                                sx={{
                                    backgroundColor: theme.palette.secondary.main,
                                    color: theme.palette.text.primary,
                                    paddingRight: '16px',
                                    paddingLeft: '16px',
                                }}>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Test</Typography>
                            </AppToolbar>
                            <Typography variant="inherit" component="div" sx={{
                                backgroundColor: theme.palette.background.paper,
                                color: theme.palette.text.primary,
                                padding: '8px 8px 0 8px',
                            }}>Roles</Typography>
                            <List dense={true} sx={{
                                backgroundColor: theme.palette.background.paper,
                                color: theme.palette.text.primary,
                            }}>
                                {getRoles(
                                    <ListItem>
                                        <ListItemIcon>
                                            <SettingsIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Single-line item" />
                                    </ListItem>
                                )}
                            </List>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    backgroundColor: theme.palette.background.paper,
                                    padding: '8px 0 0 0',
                                }}>
                                <Button variant="contained" fullWidth={true}>Logout</Button>
                            </Box>
                        </AppBar>
                    </Menu>
                </AppToolbar>
            </AppBar>
        </Box>
    );
};

export default Toolbar;