import axios, { AxiosError, HttpStatusCode } from 'axios';

const apiUrl: string = process.env.REACT_APP_API_URL || 'http://localhost:9000';

export const api = axios.create({
    baseURL: `${apiUrl}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Handle errors
const errorHandler = (error: AxiosError) => {
    const statusCode: number | undefined = error.response?.status;

    if (error.code === AxiosError.ERR_CANCELED) {
        return Promise.resolve();
    }

    if (statusCode && statusCode !== HttpStatusCode.Unauthorized) {
        console.error('[errorHandler] Error: ', error);
    }

    return Promise.reject();
};

// Register the error handler to the 'api' axios instance
api.interceptors.response.use(undefined, (error: AxiosError) => errorHandler(error));