import { apiService } from 'ts-api-toolkit';

import { LoginUser, RegistrationUser, User } from 'models/User';

export const apiLogin = async (credentials: LoginUser): Promise<User | string> => {
    try {
        const { data } = await apiService.post('users/login', { user: credentials.user });
        return data.user;
    } catch ({ response }) {
        if (response.data) return response.data.message;
        return 'Unknown error while logging in';
    }
};

export const apiRegister = async (credentials: RegistrationUser): Promise<User | string> => {
    try {
        const { data } = await apiService.post('users/register', { user: credentials.user });
        return data.user;
    } catch ({ response }) {
        if (response.data) return response.data.message;
        return 'Unknown error while registering';
    }
};
