import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiClient} from "../../utils/api/apiClient.ts";
import {ILogin, IRegister} from "../../Interfaces/account";
import {handleAxiosError} from "../../utils/errors";

export const login = createAsyncThunk(
    'account/login',
    async (payload : ILogin, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/api/account/login', payload);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Error'));
        }
    },
);

export const register = createAsyncThunk(
    'account/register',
    async (payload : IRegister, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/api/account/register', payload);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Error'));
        }
    },
);