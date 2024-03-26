import React, {useEffect, useState} from 'react';
import { Layout } from "antd";
import PostCard from "./PostCard";
import {IPost} from "../../Interfaces/blog";
import {unwrapResult} from "@reduxjs/toolkit";
import {useAppDispatch} from "../../hooks/redux";
import {getAllPosts} from "../../store/blog/blog.actions.ts";

const MainBlogPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const [postList, setPostList] = useState<IPost[]>([]);

    const getPosts = async () =>
    {
        try {
            const response = await dispatch(getAllPosts());
            unwrapResult(response);
            setPostList(response.payload) ;

        } catch (error) {
           console.log("error", error)
        }
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <Layout style={{
            backgroundColor: "transparent",
            backdropFilter: "blur(10px)",
        }}>

            {postList.map(item => <PostCard key={item.id} {...item} />)}

        </Layout>
    );
};

export default MainBlogPage;
