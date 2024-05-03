import React, { useContext, useEffect, useMemo } from 'react';

import './IssueDetail.scss';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { AppContext } from '../../contexts/AppContext';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, FormControl, Grid, IconButton, InputAdornment, ListSubheader, MenuItem, Select, SelectChangeEvent, Snackbar, TextField, Theme, Typography, useTheme } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { IIssue } from '../../interfaces/issue.interface';
import { IProject } from '../../interfaces/project.interface';
import { IComment } from '../../interfaces/comment.interface';
import { CommentsAPI } from '../../apis/CommentsAPI';
import { IUser } from '../../interfaces/user.interface';
import { IssuePatch } from '../../types/issue-patch.type';
import { IssuesAPI } from '../../apis/IssuesAPI';
import { IssuePriority } from '../../enums/issue-priority.enum';
import { IssueStatus } from '../../enums/issue-status.enum';
import { DateLocaleString } from '../../utils/general.util';

const IssueDetail = () => {
    const appCtx = useContext(AppContext);
    const theme: Theme = useTheme();
    const { id } = useParams();
    const [snackbarOpen, setSnackbarOpen] = React.useState<boolean>(false);
    const [users, setUsers] = React.useState<IUser[]>([]);
    const [issue, setIssue] = React.useState<IIssue | undefined>(undefined);
    const [project, setProject] = React.useState<IProject | undefined>(undefined);
    const [comments, setComments] = React.useState<IComment[] | undefined>(undefined);
    const [assignedTo, setAssignedTo] = React.useState<string | undefined>(undefined);
    const [priority, setPriority] = React.useState<IssuePriority | undefined>(undefined);
    const [status, setStatus] = React.useState<IssueStatus | undefined>(undefined);
    const containsText = (text: string, searchText: string): boolean => text.toLowerCase().includes(searchText.toLowerCase());
    const [userSearchText, setUserSearchText] = React.useState<string>('');
    const displayedUsers = useMemo(() => users.filter((user: IUser) => containsText(user.username, userSearchText)), [users, userSearchText]);

    useEffect(() => {
        const users: IUser[] = appCtx.state.users;
        users.push({
            id: '',
            username: 'None',
            first_name: '',
            last_name: '',
        });
        setUsers(users);
    }, [appCtx.state.users]);

    useEffect(() => {
        setIssue(id ? appCtx.state.issues.find((x: IIssue) => x.id === Number.parseInt(id)) : undefined);
    }, [appCtx.state.issues]);

    useEffect(() => {
        if (issue?.assigned_to == null) {
            setAssignedTo('None');
            return;
        }

        setProject(appCtx.state.projects.find((x: IProject) => x.id === issue?.related_project_id));
        setAssignedTo(issue.assigned_to);
        setPriority(issue.issue_priority);
        setStatus(issue.issue_status);
    }, [issue]);

    useEffect(() => {
        if (!issue) {
            return;
        }

        CommentsAPI.getComments(issue.id).then((res: IComment[]) => {
            setComments(res);
        });
    }, [issue]);

    const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    const handleAssigneeChange = (event: SelectChangeEvent<string>): void => {
        if (issue == null) {
            return;
        }
        
        const params: IssuePatch = {
            id: issue.id,
            issue_summary: issue.issue_summary,
            modified_by: issue.modified_by,
            issue_description: issue.issue_description,
            issue_priority: issue.issue_priority,
            target_resolution_date: issue.target_resolution_date,
            actual_resolution_date: issue.actual_resolution_date,
            resolution_summary: issue.resolution_summary,
            assigned_to: event.target.value === 'None' ? null : event.target.value,
        };
        
        IssuesAPI.patchIssue(params).then((res: IIssue) => {
            setAssignedTo(res.assigned_to === null ? 'None' : res.assigned_to);
            setSnackbarOpen(true);
        });
    };

    const handleUserSearchReset = (): void => {
        setUserSearchText('');
    };

    const handleUserSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setUserSearchText(event.target.value);
    };

    const handlePriorityChange = (event: SelectChangeEvent<IssuePriority>): void => {
        if (issue == null) {
            return;
        }
        
        const params: IssuePatch = {
            id: issue.id,
            issue_summary: issue.issue_summary,
            modified_by: issue.modified_by,
            issue_description: issue.issue_description,
            issue_priority: event.target.value as IssuePriority,
            target_resolution_date: issue.target_resolution_date,
            actual_resolution_date: issue.actual_resolution_date,
            resolution_summary: issue.resolution_summary,
            assigned_to: issue.assigned_to,
        };

        IssuesAPI.patchIssue(params).then((res: IIssue) => {
            setPriority(res.issue_priority);
            setSnackbarOpen(true);
        });
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
            <Typography variant="h4" component="h2" gutterBottom>{issue?.issue_summary}</Typography>
            <Grid container spacing={0}>
                <Grid item={true} xs={12} md={8}>
                    Left
                </Grid>
                <Grid item={true} xs={12} md={4}>
                    <Box>
                        <Typography
                            variant="h6"
                            component="h3"
                            gutterBottom
                            sx={{
                                color: theme.palette.common.black
                            }}>Status</Typography>
                        <Typography>{status ?? ''}</Typography>
                    </Box>
                    <Box>
                        <Typography
                            variant="h6"
                            component="h3"
                            gutterBottom
                            sx={{
                                color: theme.palette.common.black
                            }}>Assignee</Typography>
                        <FormControl variant="standard">
                                <Select
                                    MenuProps={{ 
                                        autoFocus: false,
                                        transformOrigin: { horizontal: 'left', vertical: 'top' },
                                        anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
                                    }}
                                    value={assignedTo || ''}
                                    onChange={handleAssigneeChange}
                                    onClose={handleUserSearchReset}
                                    renderValue={(selected: string) => selected}>
                                    <ListSubheader>
                                        <TextField
                                            autoFocus
                                            fullWidth
                                            size="small"
                                            placeholder="Type to search..."
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <SearchIcon />
                                                    </InputAdornment>
                                                )
                                            }}
                                            onChange={handleUserSearch}
                                            onKeyDown={(e) => {
                                                if (e.key !== 'Escape') {
                                                    // Prevents autoselecting item while typing.
                                                    e.stopPropagation();
                                                }
                                            }} />
                                    </ListSubheader>
                                    {displayedUsers.map((user: IUser, index: number) => (
                                        <MenuItem key={index} value={user.username}>
                                            {user.username}
                                        </MenuItem>
                                    ))}
                                    {assignedTo !== '' && (
                                        <MenuItem value={assignedTo} sx={{ display: 'none' }}>
                                            {assignedTo}
                                        </MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                    </Box>
                    <Box>
                        <Typography
                            variant="h6"
                            component="h3"
                            gutterBottom
                            sx={{
                                color: theme.palette.common.black
                            }}>Priority</Typography>
                        <FormControl variant="standard">
                            <Select
                                value={priority || ''}
                                onChange={handlePriorityChange}>
                                {(Object.values(IssuePriority) as string[]).map((value: string, index: number) => (
                                    <MenuItem key={index} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                        <Typography
                            variant="h6"
                            component="h3"
                            gutterBottom
                            sx={{
                                color: theme.palette.common.black
                            }}>Created By</Typography>
                        <Typography>{issue?.created_by} {issue ? `on ${DateLocaleString(issue.create_date)}` : null}</Typography>
                    </Box>
                </Grid>
            </Grid>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message="Issue updated"
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleSnackbarClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                } />
        </Box>
    );
};

export default IssueDetail;