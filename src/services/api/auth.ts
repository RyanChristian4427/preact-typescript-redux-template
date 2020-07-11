import { apiService } from 'ts-api-toolkit';

import { LoginUser, RegistrationUser, User } from 'models/User';
import { ApiResponse } from 'services/api';

export const apiLogin = async (credentials: LoginUser): ApiResponse<User> => {
    try {
        const { data } = await apiService.post('users/login', { user: credentials.user });
        return data.user;
    } catch ({ response }) {
        throw response?.data?.message && typeof response.data.message === 'string'
            ? response.data.message
            : 'Unknown error while logging in';
    }
};

export const apiRegister = async (credentials: RegistrationUser): ApiResponse<User> => {
    try {
        const { data } = await apiService.post('users/register', { user: credentials.user });
        return data.user;
    } catch ({ response }) {
        throw response?.data?.message && typeof response.data.message === 'string'
            ? response.data.message
            : 'Unknown error while registering';
    }
};
