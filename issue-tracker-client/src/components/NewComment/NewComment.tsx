import React from 'react';

import './NewComment.scss';
import SendIcon from '@mui/icons-material/Send';
import { Avatar, Card, TextareaAutosize as BaseTextareaAutosize, styled, useTheme, Theme, IconButton, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem } from '@mui/material';
import { INewCommentProps } from '../../interfaces/new-comment-props.interface';
import { GetInitials } from '../../utils/general.util';
import { CommentOperation } from '../../enums/comment-operation.enum';

const NewComment = (props: INewCommentProps) => {
    const theme: Theme = useTheme();
    const textAreaRef: React.RefObject<HTMLTextAreaElement> = React.useRef<HTMLTextAreaElement>(null);
    const [mode, setMode] = React.useState<CommentOperation>(CommentOperation.Comment);
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

    const handleKeydown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {};

    const createComment = () => {};

    const handleChange = (event: SelectChangeEvent) => {
        setMode(event.target.value as CommentOperation);
    };
    
    return (
        <Card 
            className="new-comment"
            variant="outlined">
            <div className="card-header">
                {props.authUser ? <Avatar>{GetInitials(props.authUser)}</Avatar> : null}
                <header>
                    <h1>{mode === CommentOperation.Comment ? 'New Comment' : 'Resolve Issue'}</h1>
                    <FormControl 
                        sx={{ 
                            m: 1, 
                            minWidth: 120, 
                            margin: '0 0 10px 0'
                        }} 
                        size="small">
                        <InputLabel 
                            id="comment-mode-label" 
                            sx={{
                                display: 'none'
                            }}>Mode</InputLabel>
                        <Select
                            labelId="comment-mode-label"
                            notched={false}
                            id="comment-mode"
                            value={mode}
                            label="Mode"
                            onChange={handleChange}>
                            <MenuItem value={CommentOperation.Comment}>Comment</MenuItem>
                            <MenuItem value={CommentOperation.CloseIssue}>Close Issue</MenuItem>
                        </Select>
                    </FormControl>
                </header>
                <div className="actions"></div>
            </div>
            <div className="card-content">
                <TextareaAutosize
                        aria-label={mode === CommentOperation.Comment ? 'Comment textarea' : 'Resolve issue textarea'}
                        placeholder={mode === CommentOperation.Comment ? 'Write a comment...' : 'Issue Resolution Summary...'}
                        ref={textAreaRef}
                        onKeyDown={handleKeydown} />
                    <IconButton
                        aria-label="send"
                        color="primary"
                        onClick={createComment}>
                        <SendIcon />
                    </IconButton>
            </div>
        </Card>
    );
};

export default NewComment;