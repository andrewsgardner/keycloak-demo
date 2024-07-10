import React, { useContext } from 'react';

import './IssueDescription.scss';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import { AppContext } from '../../contexts/AppContext';
import { IIssueDescriptionProps } from '../../interfaces/issue-description-props.interface';
import { Card, IconButton, Theme, Typography, useTheme, TextareaAutosize as BaseTextareaAutosize, styled, Box, Link } from '@mui/material';
import { KeyEvent } from '../../enums/key-event.enum';
import { IsUserInRole } from '../../utils/general.util';
import { AuthRole } from '../../enums/auth-role.enum';

const IssueDescription = (props: IIssueDescriptionProps) => {
    const appCtx = useContext(AppContext);
    const theme: Theme = useTheme();
    const [editMode, setEditMode] = React.useState<boolean>(false);
    const textAreaRef: React.RefObject<HTMLTextAreaElement> = React.useRef<HTMLTextAreaElement>(null);
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

    const handleKeydown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
        if (event.key === KeyEvent.Enter) {
            event.preventDefault();
            updateIssue();
        }
        
        if (event.key === KeyEvent.Escape) {
            setEditMode(false);
        }
    };

    const updateIssue = (): void => {
        if (!textAreaRef.current?.value) {
            return;
        }
        
        props.onIssueDescriptionChange(textAreaRef.current?.value);
        setEditMode(false);
    };
    
    return (
        <Card variant="outlined">
            <div className="card-header">
                <header>
                    <h1>Description</h1>
                </header>
                <div className="actions">
                    {IsUserInRole(AuthRole.Contributor, appCtx.state.roles) ? (
                        <IconButton 
                            disabled={editMode}
                            aria-label="Edit description"
                            onClick={() => setEditMode(!editMode)}>
                            <EditIcon />
                        </IconButton>
                    ) : null}
                </div>
            </div>
            <div className="card-content">
                {editMode ? (
                    <Box>
                        <Box sx={{
                            display: 'flex',
                        }}>
                            <TextareaAutosize 
                                aria-label="Description textarea" 
                                placeholder="Description..."
                                defaultValue={props.issue_description || ''}
                                ref={textAreaRef}
                                onKeyDown={handleKeydown} />
                            <IconButton 
                                aria-label="send" 
                                color="primary"
                                onClick={updateIssue}>
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
                                }}>
                                Cancel
                                </Link></span>
                        </Box>
                    </Box>
                ) : (
                    <Typography variant="body1" component="span">{props.issue_description}</Typography>
                )}
            </div>
        </Card>
    );
};

export default IssueDescription;