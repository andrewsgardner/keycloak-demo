import { IIssue } from "../interfaces/issue.interface";

export type IssueCreate = Pick<IIssue, "issue_summary" | "created_by" | "issue_description" | "issue_priority" | "assigned_to" | "target_resolution_date">;