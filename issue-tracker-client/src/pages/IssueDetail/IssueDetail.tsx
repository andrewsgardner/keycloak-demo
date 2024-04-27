import React, { useContext, useEffect, useMemo } from 'react';

import './IssueDetail.scss';
import SearchIcon from '@mui/icons-material/Search';
import { AppContext } from '../../contexts/AppContext';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, FormControl, Grid, InputAdornment, ListSubheader, MenuItem, Select, SelectChangeEvent, TextField, Theme, Typography, useTheme } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { IIssue } from '../../interfaces/issue.interface';
import { IProject } from '../../interfaces/project.interface';
import { IComment } from '../../interfaces/comment.interface';
import { CommentsAPI } from '../../apis/CommentsAPI';
import { IUser } from '../../interfaces/user.interface';

const IssueDetail = () => {
    const appCtx = useContext(AppContext);
    const theme: Theme = useTheme();
    const { id } = useParams();
    const [issue, setIssue] = React.useState<IIssue | undefined>(undefined);
    const [project, setProject] = React.useState<IProject | undefined>(undefined);
    const [comments, setComments] = React.useState<IComment[] | undefined>(undefined);
    const [assignedTo, setAssignedTo] = React.useState<string | undefined>(undefined);
    const containsText = (text: string, searchText: string): boolean => text.toLowerCase().includes(searchText.toLowerCase());
    const users: IUser[] = appCtx.state.users;
    const [userSearchText, setUserSearchText] = React.useState<string>('');
    const displayedUsers = useMemo(() => users.filter((user: IUser) => containsText(user.username, userSearchText)), [users, userSearchText]);

    useEffect(() => {
        setIssue(id ? appCtx.state.issues.find((x: IIssue) => x.id === Number.parseInt(id)) : undefined);
    }, [appCtx.state.issues]);

    useEffect(() => {
        setProject(appCtx.state.projects.find((x: IProject) => x.id === issue?.related_project_id));
        setAssignedTo(issue?.assigned_to);
    }, [issue]);

    useEffect(() => {
        if (!issue) {
            return;
        }

        CommentsAPI.getComments(issue.id).then((res: IComment[]) => {
            setComments(res);
        });
    }, [issue]);

    const handleAssigneeChange = (event: SelectChangeEvent<string>): void => {
        setAssignedTo(event.target.value);
    };

    const handleUserSearchReset = (): void => {
        setUserSearchText('');
    };

    const handleUserSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setUserSearchText(event.target.value);
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
                            }}>Assignee</Typography>
                        {assignedTo ? (
                            <FormControl variant="standard">
                                <Select
                                    MenuProps={{ 
                                        autoFocus: false,
                                        transformOrigin: { horizontal: 'left', vertical: 'top' },
                                        anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
                                    }}
                                    value={assignedTo}
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
                        ) : 'No one - Assign yourself'}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default IssueDetail;