import React, { useContext, useEffect } from 'react';
import { Link, createBrowserRouter, useParams } from 'react-router-dom';

import './ProjectDetail.scss';
import { AppContext } from '../../contexts/AppContext';
import { Box, Theme, Typography, useTheme } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import routes from '../../routes';
import { IProject } from '../../interfaces/project.interface';

const ProjectDetail = () => {
    const appCtx = useContext(AppContext);
    const theme: Theme = useTheme();
    const router = createBrowserRouter(routes);
    const { id } = useParams();
    const [project, setProject] = React.useState<IProject | undefined>(undefined);
    
    useEffect(() => {
        setProject(id ? appCtx.state.projects.find((x: IProject) => x.id === Number.parseInt(id)) : undefined);
    }, [appCtx.state.projects, id]);

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
                {project?.project_name}
            </Typography>
            <div>ProjectDetail...</div>
        </Box>
    );
};

export default ProjectDetail;