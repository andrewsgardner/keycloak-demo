import { IIssue } from "../interfaces/issue.interface";
import { IssueCreate } from "../types/issue-create.type";
import { IssuePatch } from "../types/issue-patch.type";
import { api } from "./axios-config";

export const IssuesAPI = {

    getIssues: async (): Promise<IIssue[]> => {
        const response = await api.request<IIssue[]>({
            url: '/issues',
            method: 'GET',
        });

        return response.data;
    },

    getIssueById: async (id: number): Promise<IIssue> => {
        const response = await api.request<IIssue>({
            url: `/issues/${id}`,
            method: 'GET',
        });

        return response.data;
    },

    createIssue: async (params: IssueCreate): Promise<IIssue> => {
        const response = await api.request<IIssue>({
            url: '/issues',
            method: 'POST',
            data: JSON.stringify(params),
        });

        return response.data;
    },

    patchIssue: async (params: IssuePatch): Promise<IIssue> => {
        const response = await api.request<IIssue>({
            url: `/issues/${params.id}`,
            method: 'PATCH',
            data: JSON.stringify(new Object({
                issue_summary: params.issue_summary,
                modified_by: params.modified_by,
                issue_description: params.issue_description,
                issue_priority: params.issue_priority,
                target_resolution_date: params.target_resolution_date,
                actual_resolution_date: params.actual_resolution_date,
                resolution_summary: params.resolution_summary,
                assigned_to: params.assigned_to,
            })),
        });

        return response.data;
    },

    deleteIssue: async (id: number): Promise<IIssue> => {
        const response = await api.request<IIssue>({
            url: `/issues/${id}`,
            method: 'DELETE',
        });

        return response.data;
    },

};