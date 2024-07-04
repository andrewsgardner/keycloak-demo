import React, { useContext, useEffect } from 'react';
import { Link, createBrowserRouter, useParams } from 'react-router-dom';

import './IssueList.scss';
import { AppContext } from '../../contexts/AppContext';
import { Box, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Typography, styled, tableCellClasses, useTheme } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IProject } from '../../interfaces/project.interface';
import { IIssue } from '../../interfaces/issue.interface';
import { DateAgo } from '../../utils/general.util';
import { IssueStatus } from '../../enums/issue-status.enum';

const IssueList = () => {
    const appCtx = useContext(AppContext);
    const theme: Theme = useTheme();
    const { id } = useParams();
    const [project, setProject] = React.useState<IProject | undefined>(undefined);
    const [status, setStatus] = React.useState<IssueStatus>(IssueStatus.Open);
    
    useEffect(() => {
        setProject(id ? appCtx.state.projects.find((x: IProject) => x.id === Number.parseInt(id)) : undefined);
    }, [appCtx.state.projects]);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            padding: '0 16px',
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            padding: '10px 16px',
        },
      }));

      const filteredIssues = (): IIssue[] => {
        return appCtx.state.issues.filter((issue: IIssue) => {
            const projectIdMatch: boolean = issue.related_project_id === project?.id;
            const statusMatch: boolean = issue.issue_status === status;
            
            return projectIdMatch && statusMatch;
        }).sort((a: IIssue, b: IIssue) => {
            return Date.parse(b.modified_date) - Date.parse(a.modified_date);
        });
      };

      const handleStatusChange = (event: SelectChangeEvent): void => {
        setStatus(event.target.value as IssueStatus);
      };

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
            <TableContainer
                component={Paper}>
                    <Table
                        sx={{ minWidth: 650 }}
                        aria-label="Issues Table">
                        <TableHead
                            sx={{
                                backgroundColor: theme.palette.primary.main
                            }}>
                            <TableRow>
                                <StyledTableCell>Issue</StyledTableCell>
                                <StyledTableCell>Summary</StyledTableCell>
                                <StyledTableCell>Priority</StyledTableCell>
                                <StyledTableCell>
                                    <FormControl 
                                        variant="filled"
                                        sx={{ 
                                            m: 1, 
                                            minWidth: 120,
                                            backgroundColor: 'rgb(246, 248, 250)',
                                            margin: '5px 0'
                                        }}
                                        size="small">
                                        <InputLabel 
                                            id="status-select-label" 
                                            sx={{ 
                                                top: '-4px' 
                                            }}>Status</InputLabel>
                                        <Select
                                            labelId="status-select-label"
                                            id="status-select"
                                            sx={{
                                                fontSize: 14,
                                                fontWeight: 500
                                            }}
                                            value={status}
                                            label="Status"
                                            onChange={handleStatusChange}>
                                            {Object.keys(IssueStatus).map((key: string, index: number) => (<MenuItem value={key} key={index}>{key}</MenuItem>))}
                                        </Select>
                                    </FormControl>
                                </StyledTableCell>
                                <StyledTableCell>Assigned To</StyledTableCell>
                                <StyledTableCell align="right">Last Update</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredIssues().length > 0 ? filteredIssues().map((issue: IIssue) => (
                                <TableRow
                                    key={issue.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <StyledTableCell component="th" scope="row">
                                        <Link
                                            style={{
                                                color: theme.palette.text.primary,
                                                fontWeight: 500,
                                            }}
                                            to={`/issues/${issue.id}`}>{`ISSUE-${issue.id}`}</Link>
                                    </StyledTableCell>
                                    <StyledTableCell>{issue.issue_summary}</StyledTableCell>
                                    <StyledTableCell>{issue.issue_priority}</StyledTableCell>
                                    <StyledTableCell>{issue.issue_status}</StyledTableCell>
                                    <StyledTableCell>{issue.assigned_to}</StyledTableCell>
                                    <StyledTableCell align="right">{DateAgo(issue.modified_date)}</StyledTableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <StyledTableCell component="th" scope="row" colSpan={6}>There are no issues to show.</StyledTableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
            </TableContainer>
        </Box>
    );
};

export default IssueList;