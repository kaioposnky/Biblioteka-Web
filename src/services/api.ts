import axios, {AxiosError} from "axios";

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

let api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


let currentToken: string | null = null

export function updateCurrentToken(newToken: string | null){
    currentToken = newToken;
}
api.interceptors.request.use(
    (config) => {
        if (currentToken){
            config.headers.Authorization = `Bearer ${currentToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    // Se tiver um resposta válida (não deu erro)
    (response) => {
        return response.data;
    },

    // Se der erro ajusta a resposta para uma resposta de erro
    (error: AxiosError) => {
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
    }
);

export default api;
