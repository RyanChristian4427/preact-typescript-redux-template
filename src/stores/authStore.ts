import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { route } from 'preact-router';

import { LoginUser, RegistrationUser, User } from 'models/User';
import { authStorageService } from 'services/api';
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
        loginStart: (state: State): void => {
            state.inProgress = true;
            state.error = '';
        },
        loginSuccess: (state: State, action: PayloadAction<User>): void => {
            authStorageService.saveToken(action.payload.token);
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
            authStorageService.saveToken(action.payload.token);
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

export const login = (credentials: LoginUser): AppThunk => async (dispatch) => {
    dispatch(loginStart());
    const result = await apiLogin(credentials).catch((error) => {
        dispatch(loginFailure(error));
    });
    if (result) {
        dispatch(loginSuccess(result));
        route('/');
    }
};

export const register = (credentials: RegistrationUser): AppThunk => async (dispatch) => {
    dispatch(registerStart());
    const result = await apiRegister(credentials).catch((error) => {
        dispatch(registerFailure(error));
    });
    if (result) {
        dispatch(registerSuccess(result));
        route('/');
    }
};
