import React from 'react';

import './IssueDescription.scss';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import { IIssueDescriptionProps } from '../../interfaces/issue-description-props.interface';
import { AppBar, Card, IconButton, Theme, Toolbar, Typography, useTheme } from '@mui/material';

const IssueDescription = (props: IIssueDescriptionProps) => {
    const theme: Theme = useTheme();
    const [editMode, setEditMode] = React.useState<boolean>(false);
    
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
                    <span>Edit mode</span>
                ) : (
                    <Typography variant="body1" component="span">{props.issue_description}</Typography>
                )}
            </div>
        </Card>
    );
};

export default IssueDescription;