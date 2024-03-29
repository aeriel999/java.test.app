import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiClient} from "../../utils/api/apiClient.ts";
import {handleAxiosError} from "../../utils/errors";
import {IBlogShow, IBlogShowByCategory, IBlogShowByTag} from "../../Interfaces/blog";

export const getAllPosts = createAsyncThunk(
    'blog/get-all',
    async (  data: IBlogShow ,{ rejectWithValue }) => {
        try {
            const response = await apiClient.get(`/api/blog?page=${data.page - 1}&pageSize=${data.pageSize}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Error'));
        }
    },
);

export const getPostById = createAsyncThunk(
    'blog/post',
    async ( postId: number,{ rejectWithValue }) => {
        try {
            const response = await apiClient.get(`/api/blog/${postId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Error'));
        }
    },
);

export const getPostsByCategoryId = createAsyncThunk(
    'blog/category',
    async ( data: IBlogShowByCategory,{ rejectWithValue }) => {
        try {
            const response = await apiClient.get(`/api/blog/category?page=${data.page - 1}&pageSize=${data.pageSize}&categoryId=${data.categoryId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Error'));
        }
    },
);

export const getPostsByTagId = createAsyncThunk(
    'blog/tag',
    async ( data: IBlogShowByTag,{ rejectWithValue }) => {
        try {
            const response = await apiClient.get(`/api/blog/tag?page=${data.page - 1}&pageSize=${data.pageSize}&tagId=${data.tagId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Error'));
        }
    },
);