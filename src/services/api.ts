import axios, { AxiosError } from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Session } from "next-auth";

export interface SuccessResponse<T> {
    data: T;
    success: true;
    message: string;
    statusCode: string;
}

export interface ErrorResponse {
    success: false;
    message: string;
    statusCode: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const handleResponseError = (error: AxiosError) => {
    if (error.response) {
        const errorData: ErrorResponse = error.response.data as ErrorResponse;
        return Promise.reject(errorData);
    } else if (error.request) {
        const networkError: ErrorResponse = {
            success: false,
            message: "Erro de rede. Por favor, verifique sua conexão.",
            statusCode: "NETWORK_ERROR",
        };
        return Promise.reject(networkError);
    } else {
        const genericError: ErrorResponse = {
            success: false,
            message: "Ocorreu um erro inesperado.",
            statusCode: "UNKNOWN_ERROR",
        };
        return Promise.reject(genericError);
    }
};

const createApiClient = (session: Session | null = null) => {
    const client = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    client.interceptors.request.use(
        (config) => {
            if (session?.user?.accessToken) {
                config.headers.Authorization = `Bearer ${session.user.accessToken}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    client.interceptors.response.use(
        (response) => response.data,
        handleResponseError
    );

    return client;
}

export const api = createApiClient();

export const getAuthenticatedApi = async () => {
    const session = await getServerSession(authOptions);
    return createApiClient(session);
};