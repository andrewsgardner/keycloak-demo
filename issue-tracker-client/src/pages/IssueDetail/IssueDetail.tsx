import React, { useContext, useEffect } from 'react';

import './IssueDetail.scss';
import { AppContext } from '../../contexts/AppContext';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Theme, Typography, useTheme } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { IIssue } from '../../interfaces/issue.interface';
import { IProject } from '../../interfaces/project.interface';

const IssueDetail = () => {
    const appCtx = useContext(AppContext);
    const theme: Theme = useTheme();
    const { id } = useParams();
    const [issue, setIssue] = React.useState<IIssue | undefined>(undefined);
    const [project, setProject] = React.useState<IProject | undefined>(undefined);

    useEffect(() => {
        setIssue(id ? appCtx.state.issues.find((x: IIssue) => x.id === Number.parseInt(id)) : undefined);
    }, [appCtx.state.issues]);

    useEffect(() => {
        setProject(appCtx.state.projects.find((x: IProject) => x.id === issue?.related_project_id));
    }, [issue]);
    
    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom>
                <Link 
                    style={{
                        color: theme.palette.text.primary,
                        fontWeight: 500,
                    }} 
                    to="/projects">Projects</Link>
                <ArrowForwardIosIcon 
                    style={{
                        margin: '0 3px',
                        verticalAlign: 'middle',
                    }} />
                <Link
                    style={{
                        color: theme.palette.text.primary,
                        fontWeight: 500,
                    }}
                    to={`/projects/${project?.id}`}>{project?.project_name}</Link>
                <ArrowForwardIosIcon 
                    style={{
                        margin: '0 3px',
                        verticalAlign: 'middle',
                    }} />
                {`ISSUE-${issue?.id}`}
            </Typography>
            <div>IssueDetail...</div>
        </Box>
    );
};

export default IssueDetail;