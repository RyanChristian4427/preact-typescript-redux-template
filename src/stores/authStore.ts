import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authStorageService } from 'ts-api-toolkit';
import { route } from 'preact-router';

import { LoginUser, RegistrationUser, User } from 'models/User';
import { apiLogin, apiRegister } from 'services/api';
import { AppThunk } from 'stores';

type State = {
    inProgress: boolean;
    isAuthenticated: boolean;
    currentUser: User;
    error: string;
};

const initialState: State = {
    inProgress: false,
    isAuthenticated: false,
    currentUser: undefined,
    error: '',
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state: State): void => {
            authStorageService.destroyToken();
            state.isAuthenticated = false;
            state.currentUser = undefined;
        },
        loginStart: (state: State): void => {
            state.inProgress = true;
            state.error = '';
        },
        loginSuccess: (state: State, action: PayloadAction<User>): void => {
            state.inProgress = false;
            state.isAuthenticated = true;
            state.currentUser = action.payload;
        },
        loginFailure: (state: State, action: PayloadAction<string>): void => {
            state.inProgress = false;
            state.error = action.payload;
        },
        registerStart: (state: State): void => {
            state.inProgress = true;
            state.error = '';
        },
        registerSuccess: (state: State, action: PayloadAction<User>): void => {
            state.inProgress = false;
            state.isAuthenticated = true;
            state.currentUser = action.payload;
        },
        registerFailure: (state: State, action: PayloadAction<string>): void => {
            state.inProgress = false;
            state.error = action.payload;
        },
        resetAuthErrors: (state: State): void => {
            state.error = '';
        },
    },
});
export default slice.reducer;

// Actions
export const {
    logout,
    loginStart,
    loginFailure,
    loginSuccess,
    registerStart,
    registerFailure,
    registerSuccess,
    resetAuthErrors,
} = slice.actions;

function isUser(result: User | string): result is User {
    return !!(result as User).token;
}

export const login = (credentials: LoginUser): AppThunk => async (dispatch) => {
    dispatch(loginStart());
    const result = await apiLogin(credentials);
    if (isUser(result)) {
        authStorageService.saveToken(result.token);
        await dispatch(loginSuccess(result));
        route('/');
    } else {
        await dispatch(loginFailure(result));
    }
};

export const register = (credentials: RegistrationUser): AppThunk => async (dispatch) => {
    dispatch(registerStart());
    const result = await apiRegister(credentials);
    if (isUser(result)) {
        authStorageService.saveToken(result.token);
        await dispatch(registerSuccess(result));
        route('/');
    } else {
        await dispatch(registerFailure(result));
    }
};
