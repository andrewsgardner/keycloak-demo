import { IComment } from "../interfaces/comment.interface";
import { CommentCreate } from "../types/comment-create.type";
import { CommentPatch } from "../types/comment-patch.type";
import { api } from "./axios-config";

export const CommentsAPI = {

    getComments: async (related_issue_id: number): Promise<IComment[]> => {
        const response = await api.request<IComment[]>({
            url: '/comments',
            method: 'GET',
            params: {
                related_issue_id: related_issue_id,
            },
        });

        return response.data;
    },

    getCommentById: async (id: string): Promise<IComment> => {
        const response = await api.request<IComment>({
            url: `/comments/${id}`,
            method: 'GET',
        });

        return response.data;
    },

    createComment: async (params: CommentCreate): Promise<IComment> => {
        const response = await api.request<IComment>({
            url: '/comments',
            method: 'POST',
            data: JSON.stringify(params),
        });

        return response.data;
    },

    patchComment: async (params: CommentPatch): Promise<IComment> => {
        const response = await api.request<IComment>({
            url: `/comments/${params.id}`,
            method: 'PATCH',
            data: JSON.stringify(params),
        });

        return response.data;
    },

    deleteComment: async (id: string): Promise<IComment> => {
        const response = await api.request<IComment>({
            url: `/comments/${id}`,
            method: 'DELETE',
        });
        
        return response.data;
    },

};