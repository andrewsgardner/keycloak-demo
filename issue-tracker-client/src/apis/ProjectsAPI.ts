import { IProject } from "../interfaces/project.interface";
import { ProjectCreate } from "../types/project-create.type";
import { ProjectPatch } from "../types/project-patch.type";
import { api } from "./axios-config";

export const ProjectsAPI = {

    getProjects: async (): Promise<IProject[]> => {
        const response = await api.request<IProject[]>({
            url: '/projects',
            method: 'GET',
        });

        return response.data;
    },

    getProjectById: async (id: number): Promise<IProject> => {
        const response = await api.request<IProject>({
            url: `/projects/${id}`,
            method: 'GET',
        });

        return response.data;
    },

    createProject: async (params: ProjectCreate): Promise<IProject> => {
        const response = await api.request<IProject>({
            url: '/projects',
            method: 'POST',
            data: JSON.stringify(params),
        });

        return response.data;
    },

    patchProject: async (params: ProjectPatch): Promise<IProject> => {
        const response = await api.request<IProject>({
            url: `/projects/${params.id}`,
            method: 'PATCH',
            data: JSON.stringify(new Object({
                project_name: params.project_name,
                modified_by: params.modified_by,
            })),
        });

        return response.data;
    },

    deleteProject: async (id: number): Promise<IProject> => {
        const response = await api.request<IProject>({
            url: `/projects/${id}`,
            method: 'DELETE',
        });

        return response.data;
    },
    
};