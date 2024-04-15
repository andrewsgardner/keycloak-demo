import React, { useContext } from 'react';

import './ProjectList.scss';
import { AppContext } from '../../contexts/AppContext';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled, tableCellClasses } from '@mui/material';
import { IProject } from '../../interfaces/project.interface';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { DateAgo, DateLocaleString } from '../../utils/general.util';

const ProjectList = () => {
    const appCtx = useContext(AppContext);
    const theme = useTheme();

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            padding: '10px 16px',
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            padding: '10px 16px',
        },
      }));

    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom>Projects</Typography>
            <TableContainer 
                component={Paper}>
                <Table 
                    sx={{ minWidth: 650 }} 
                    aria-label="Projects Table">
                    <TableHead
                        sx={{
                            backgroundColor: theme.palette.primary.main
                        }}>
                        <TableRow>
                            <StyledTableCell>Project</StyledTableCell>
                            <StyledTableCell>Last Update</StyledTableCell>
                            <StyledTableCell align="right">Created</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appCtx.state.projects.map((project: IProject) => (
                            <TableRow
                                key={project.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <StyledTableCell component="th" scope="row">
                                    <Link
                                        style={{
                                            color: theme.palette.text.primary,
                                            fontWeight: 500,
                                        }}
                                        to={`/projects/${project.id}`}>{project.project_name}</Link>
                                </StyledTableCell>
                                <StyledTableCell>By {project.modified_by} {DateAgo(project.modified_date)}</StyledTableCell>
                                <StyledTableCell align="right">{DateLocaleString(project.create_date)}</StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default ProjectList;