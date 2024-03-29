import {Link, useParams} from "react-router-dom";
import   {useEffect, useState} from "react";
import {IPost} from "../../Interfaces/blog";
import { getPostById} from "../../store/blog/blog.actions.ts";
import {unwrapResult} from "@reduxjs/toolkit";
import {useAppDispatch} from "../../hooks/redux";
import {Card} from "antd";
import {Helmet} from "react-helmet-async";

export default function PostPage(){
    const {postId} = useParams( );
    const dispatch = useAppDispatch();
    const [post, setPost] = useState<IPost>();

    useEffect(() => {
        const getPost = async ( ) =>
        {
            try {
                if(postId)
                {
                    const response = await dispatch(getPostById(Number(postId)));
                    unwrapResult(response);
                    setPost(response.payload) ;
                }
            } catch (error) {
                console.log("error", error)
            }
        }
        getPost();

    }, [postId]);

    return(
        <>
            {post && (
                <>
                    <Helmet>
                        <title>{post?.meta}</title>
                    </Helmet>
                    <Card style={{marginTop: 16}}>
                        <h4>Category: <Link
                            to={`/blog/${post.categoryUrlSlug}/${post.categoryId}`}>{post.categoryName}</Link></h4>

                        <h2>{post.title}</h2>

                        <p>{post.description}</p>

                        <h4>Tags: {post.tags?.map(tag => (
                            <Link style={{marginLeft: 5}} key={tag.id} to={`/blog/tag/${tag.urlSlug}/${tag.id}`}>{tag.name}</Link>
                        ))}</h4>
                        <h4>Posted on: {post.postedOn}</h4>

                    </Card>
                </>
            )}
        </>
    )
}