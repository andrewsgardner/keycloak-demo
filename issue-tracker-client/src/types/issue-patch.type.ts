import { IIssue } from "../interfaces/issue.interface";

export type IssuePatch = Pick<IIssue, "id" | "issue_summary" | "modified_by" | "issue_description" | "issue_priority" | "target_resolution_date" | "actual_resolution_date" | "resolution_summary" | "assigned_to">;