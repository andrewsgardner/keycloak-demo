import { IUser } from '../interfaces/user.interface';
import { api } from './axios-config';

export const UsersAPI = {

    getUsers: async (): Promise<IUser[]> => {
        const response = await api.request<IUser[]>({
            url: '/users',
            method: 'GET',
        });

        return response.data;
    },

    getUserById: async (id: string): Promise<IUser> => {
        const response = await api.request<IUser>({
            url: `/users/${id}`,
            method: 'GET',
        });

        return response.data;
    },
    
};