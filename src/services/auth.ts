import api, {ErrorResponse, SuccessResponse} from './api';
import {z} from 'zod';

const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.email(),
});

const RegisterSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
});

type User = z.infer<typeof UserSchema>;
export type RegisterFormData = z.infer<typeof RegisterSchema>;

export const auth = {
    async login(credentials: { email?: string, password?: string }): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
            return null;
        }

        try {
            const response: SuccessResponse<User> = await api.post('/login', credentials);
            return response.data;

        } catch (error) {
            const apiError = error as ErrorResponse;
            console.error('Login failed:', apiError.message);
            return null;
        }
    },

    async register(data: RegisterFormData): Promise<SuccessResponse<User>> {
        return api.post('/register', data);
    },
};