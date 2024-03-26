import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiClient} from "../../utils/api/apiClient.ts";
import {handleAxiosError} from "../../utils/errors";

export const getAllPosts = createAsyncThunk(
    'blog',
    async ( _,{ rejectWithValue }) => {
        try {
            const response = await apiClient.get('/api/blog');
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Error'));
        }
    },
);