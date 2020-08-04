import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { route } from 'preact-router';
import { authStorageService } from 'ts-api-toolkit';

import { LoginUser, RegistrationUser, User } from 'models/User';
import { apiLogin, apiRegister } from 'services/api/auth';
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
        authStart: (state: State): void => {
            state.inProgress = true;
            state.error = '';
        },
        authFailure: (state: State, action: PayloadAction<string>): void => {
            state.inProgress = false;
            state.error = action.payload;
        },
        loginSuccess: (state: State, action: PayloadAction<User>): void => {
            authStorageService.saveToken(action.payload.token);
            state.inProgress = false;
            state.isAuthenticated = true;
            state.currentUser = action.payload;
        },
        registerSuccess: (state: State, action: PayloadAction<User>): void => {
            authStorageService.saveToken(action.payload.token);
            state.inProgress = false;
            state.isAuthenticated = true;
            state.currentUser = action.payload;
        },
        resetAuthErrors: (state: State): void => {
            state.error = '';
        },
    },
});
export default slice.reducer;

// Actions
export const { logout, authStart, authFailure, loginSuccess, registerSuccess, resetAuthErrors } = slice.actions;

export const login = (credentials: LoginUser): AppThunk => async (dispatch) => {
    dispatch(authStart());
    try {
        dispatch(loginSuccess(await apiLogin(credentials)));
        route('/');
    } catch (error) {
        dispatch(authFailure(error));
    }
};

export const register = (credentials: RegistrationUser): AppThunk => async (dispatch) => {
    dispatch(authStart());
    try {
        dispatch(loginSuccess(await apiRegister(credentials)));
        route('/');
    } catch (error) {
        dispatch(authFailure(error));
    }
};
