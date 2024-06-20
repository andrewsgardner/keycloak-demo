import React, { useContext, useEffect } from 'react';

import './Comment.scss';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { AppContext } from '../../contexts/AppContext';
import { ICommentProps } from '../../interfaces/comment-props.interface';
import { Avatar, Card, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, TextareaAutosize as BaseTextareaAutosize, styled, Theme, useTheme, Box, Typography, Link } from '@mui/material';
import { IUser } from '../../interfaces/user.interface';
import { DateAgo } from '../../utils/general.util';
import { KeyEvent } from '../../enums/key-event.enum';

const Comment = (props: ICommentProps) => {
    const appCtx = useContext(AppContext);
    const theme: Theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [user, setUser] = React.useState<IUser | undefined>(undefined);
    const [editMode, setEditMode] = React.useState<boolean>(false);
    const open: boolean = Boolean(anchorEl);
    const textAreaRef: React.RefObject<HTMLTextAreaElement> = React.useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setUser(appCtx.state.users.find((x: IUser) => x.username === props.userid));
    }, [appCtx.state.users]);

    const getInitials = (user: IUser): string => {
        if (user == null) {
            return '';
        }
        
        return `${user.first_name[0]?.toUpperCase()}${user.last_name[0]?.toUpperCase()}`;
    };

    const toggleEditMode = (): void => {
        setEditMode(!editMode);
        
        if (open) {
            setAnchorEl(null);
        }
    };

    const deleteComment = (): void => {
        props.onCommentDelete(props.id);
    };

    const handleKeydown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
        if (event.key === KeyEvent.Enter) {
            event.preventDefault();
            updateComment();
        }

        if (event.key === KeyEvent.Escape) {
            setEditMode(false);
        }
    };

    const updateComment = (): void => {
        if (!textAreaRef.current?.value) {
            return;
        }

        props.onCommentChange({
            id: props.id,
            comment_text: textAreaRef.current?.value,
        });
        setEditMode(false);
    };

    const TextareaAutosize = styled(BaseTextareaAutosize)(({ theme: Theme }) => `
        box-sizing: border-box;
        width: 100%;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 1.5;
        padding: 8px 12px;
        border-radius: 8px;
        color: ${theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[900]};
        background: ${theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.common.white};
        border: 1px solid ${theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200]};
        box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50]};

        &:hover {
            border-color: ${theme.palette.primary.main};
        }

        &:focus {
            border-color: ${theme.palette.primary.main};
            box-shadow: 0 0 0 3px ${theme.palette.primary.main};
        }

        // firefox
        &:focus-visible {
            outline: 0;
        }
    `);

    return (
        <Card 
            className="comment"
            variant="outlined">
            <div className="card-header">
                {user ? <Avatar>{getInitials(user)}</Avatar> : null}
                <header>
                    <h1>{user?.first_name} {user?.last_name}</h1>
                    <h2>{DateAgo(props.modified_date)}</h2>
                </header>
                <div className="actions">
                    <IconButton
                        aria-label="Actions for this comment"
                        id={`actions-btn-${props.id}`}
                        aria-controls={open ? `actions-menu-${props.id}` : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={(e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget)}>
                        <MoreHorizIcon />
                    </IconButton>
                    <Menu
                        id={`actions-menu-${props.id}`}
                        MenuListProps={{
                            'aria-labelledby': `actions-btn-${props.id}`,
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={() => setAnchorEl(null)}
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
                        <MenuItem 
                            disabled={editMode}
                            onClick={toggleEditMode}>
                            <ListItemIcon>
                                <ModeEditIcon />
                            </ListItemIcon>
                            <ListItemText>Edit</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={deleteComment}>
                            <ListItemIcon>
                                <DeleteIcon />
                            </ListItemIcon>
                            <ListItemText>Delete</ListItemText>
                        </MenuItem>
                    </Menu>
                </div>
            </div>
            <div className="card-content">
                {editMode ? 
                    <Box>
                        <Box sx={{
                                display: 'flex',
                        }}>
                        <TextareaAutosize
                            aria-label="Comment textarea"
                            placeholder="Write a comment..."
                            defaultValue={props.comment_text || ''}
                            ref={textAreaRef}
                            onKeyDown={handleKeydown} />
                        <IconButton 
                            aria-label="send" 
                            color="primary"
                            onClick={updateComment}>
                            <SendIcon />
                        </IconButton>
                    </Box>
                    <Box>
                        <span style={{
                                fontSize: '14px',
                            }}>Press ESC or <Link
                                color="inherit"
                                component="button"
                                variant="body2"
                                onClick={() => setEditMode(!editMode)}
                                sx={{
                                    fontWeight: 500,
                                }}>Cancel</Link>
                        </span>
                    </Box>
                </Box> : <Typography variant="body1" component="span">{props.comment_text}</Typography >}
            </div>
        </Card>
    );
};

export default Comment;