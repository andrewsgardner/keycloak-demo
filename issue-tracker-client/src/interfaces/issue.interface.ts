import { IssuePriority } from "../enums/issue-priority.enum";
import { IssueStatus } from "../enums/issue-status.enum";

export interface IIssue {
    id: number;
    issue_summary: string;
    issue_description: string | null;
    related_project_id: number;
    created_by: string;
    create_date: string;
    modified_by: string;
    modified_date: string;
    issue_status: IssueStatus;
    issue_priority: IssuePriority;
    target_resolution_date: string | null;
    actual_resolution_date: string | null;
    resolution_summary: string | null;
    assigned_to: string;
}