import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authService} from "../servcies";
import {ACCESS, LOADING, REFRESH, REJECTED, RESOLVED} from "../constants";

export const registration = createAsyncThunk(
    'authSlice/registration',
    async ({registrationPayload}, {dispatch, rejectWithValue}) => {
        try {
            const data = await authService.registration(registrationPayload);

            dispatch(authAction.userRegistrationData({registeredUser: data}));

            return {user: data};

        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const login = createAsyncThunk(
    'authSlice/login',
    async ({loginPayload}, {dispatch, rejectWithValue}) => {
        try {
            const data = await authService.login(loginPayload);

            dispatch(authAction.userRegistrationData({registeredUser: data}));

            return {user: data};

        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        user: null,
        registrationData: null,
        errors: null,
        status: null,
        accessKey: ACCESS,
        refreshKey: REFRESH,
        accessToken: localStorage.getItem(ACCESS) ? localStorage.getItem(ACCESS) : null,
        refreshToken: null,
    },
    reducers: {
        userRegistrationData: (state, action) => {
            const {accessToken, refreshToken} = action.payload.registeredUser;

            localStorage.setItem(state.accessKey, accessToken);
            localStorage.setItem(state.refreshKey, refreshToken);

            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
        },
    },
    extraReducers: {
        [registration.pending]: (state, action) => {
            state.status = LOADING;
            state.errors = null;
        },
        [registration.fulfilled]: (state, action) => {
            state.status = RESOLVED;
            state.user = action.payload.user;
            state.errors = null;
        },
        [registration.rejected]: (state, action) => {
            state.status = REJECTED;
            state.errors = action.payload;
        },
        [login.pending]: (state, action) => {
            state.status = LOADING;
            state.errors = null;
        },
        [login.fulfilled]: (state, action) => {
            state.status = RESOLVED;
            state.user = action.payload.user;
            state.errors = null;
        },
        [login.rejected]: (state, action) => {
            state.status = REJECTED;
            state.errors = action.payload;
        },
    }
});

const authReducer = authSlice.reducer;

const {userRegistrationData} = authSlice.actions;

export const authAction = {userRegistrationData};

export default authReducer;
