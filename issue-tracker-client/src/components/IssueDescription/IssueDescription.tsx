import React from 'react';

import './IssueDescription.scss';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import { IIssueDescriptionProps } from '../../interfaces/issue-description-props.interface';
import { AppBar, Card, IconButton, Theme, Toolbar, Typography, useTheme, TextareaAutosize as BaseTextareaAutosize, styled, Box, Button, Link } from '@mui/material';
import { KeyEvent } from '../../enums/key-event.enum';

const IssueDescription = (props: IIssueDescriptionProps) => {
    const theme: Theme = useTheme();
    const [editMode, setEditMode] = React.useState<boolean>(false);

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
        const keys: KeyEvent[] = [
            KeyEvent.Enter,
            KeyEvent.Escape,
        ];

        for (const k of keys) {
            if (k === KeyEvent.Enter) {
                const value: string = (event.target as HTMLTextAreaElement).value;
                updateIssue(value);
            }

            if (k === KeyEvent.Escape) {
                setEditMode(false);
            }
        }
    };

    const updateIssue = (value: string): void => {
        console.log('updateIssue: ', value); // TODO: remove...
    };
    
    return (
        <Card variant="outlined">
            <div className="card-header">
                <header>
                    <h1>Description</h1>
                </header>
                <div className="actions">
                    <IconButton 
                        disabled={editMode}
                        aria-label="Edit description"
                        onClick={() => setEditMode(!editMode)}>
                        <EditIcon />
                    </IconButton>
                </div>
            </div>
            <div className="card-content">
                {editMode ? (
                    <Box>
                        <TextareaAutosize 
                            aria-label="Description textarea" 
                            placeholder="Description..."
                            defaultValue={props.issue_description || ''}
                            onKeyDown={handleKeydown} />
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