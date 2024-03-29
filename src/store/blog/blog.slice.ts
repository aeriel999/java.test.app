import {AnyAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Status} from "../../utils/enums";
import {RejectedAction} from "../../utils/types";
import {IBlogState, IPost} from "../../Interfaces/blog";
import {getAllPosts, getPostById, getPostsByCategoryId, getPostsByTagId} from "./blog.actions.ts";

function isRejectedAction(action: AnyAction): action is RejectedAction {
    return action.type.endsWith('/rejected');
}
const updateBlogState = (state: IBlogState, posts : IPost[]): void => {
    state.postList =  posts;
};

const updatePostState = (state: IBlogState, post : IPost): void => {
   state.post =  post;
};

//state - нашого редюсера
const initialState: IBlogState = {
    post:  null,
    postList: null,
    status: Status.IDLE,
};

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        // getPosts: (state, action: PayloadAction<IPost[]>) => {
        //     updateBlogState(state, action.payload);
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPosts.fulfilled, (state, action: PayloadAction<IPost[]>) => {
                updateBlogState(state, action.payload);
                state.status = Status.SUCCESS;
            })
            .addCase(getAllPosts.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getPostById.fulfilled, (state, action: PayloadAction<IPost>) => {
                updatePostState(state, action.payload);
                state.status = Status.SUCCESS;
            })
            .addCase(getPostById.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getPostsByCategoryId.fulfilled, (state, action: PayloadAction<IPost[]>) => {
                updateBlogState(state, action.payload);
                state.status = Status.SUCCESS;
            })
            .addCase(getPostsByCategoryId.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getPostsByTagId.fulfilled, (state, action: PayloadAction<IPost[]>) => {
                updateBlogState(state, action.payload);
                state.status = Status.SUCCESS;
            })
            .addCase(getPostsByTagId.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addMatcher(isRejectedAction, (state) => {
                state.status = Status.ERROR;
            });
    },
});


export default blogSlice.reducer;
