import React, {useEffect, useState} from 'react';
import {Card, Pagination, Row} from "antd";
import PostCard from "./PostCard";
import {IBlogShowByTag, IGetPostsByTag} from "../../Interfaces/blog";
import {unwrapResult} from "@reduxjs/toolkit";
import {useAppDispatch} from "../../hooks/redux";
import {getPostsByTagId} from "../../store/blog/blog.actions.ts";
import { useParams, useSearchParams} from "react-router-dom";

const PostListTagPage: React.FC = () => {
    const {tagId} = useParams();
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const [data, setData] = useState<IGetPostsByTag>({
        list: [],
        totalCount: 0,
        tagName:   null,
        tagDescription:   null,
    });

    const [formParams, setFormParams] = useState<IBlogShowByTag>({
        page: Number(searchParams.get('page')) || 1,
        pageSize: Number(searchParams.get('pageSize')) || 5,
        tagId: Number(tagId)
    });

    useEffect(( ) => {

        console.log("tagId", tagId)
            const getTagPosts = async () =>
            {
                try {
                    const response = await dispatch(getPostsByTagId(formParams));
                    unwrapResult(response);
                    setData(response.payload) ;

                } catch (error) {
                    console.log("error", error)
                }
            }

            getTagPosts();

    }, [JSON.stringify(formParams)]);

    const handlePageChange = async (page: number, newPageSize: number) => {
        findPosts({...formParams, page, pageSize: newPageSize});
    };

    const findPosts = (model: IBlogShowByTag) => {
        setFormParams(model);
        updateSearchParams(model);
    }

    const updateSearchParams = (params : IBlogShowByTag) =>{
        for (const [key, value] of Object.entries(params)) {
            if (value !== undefined && value !== 0) {
                searchParams.set(key, value);
            } else {
                searchParams.delete(key);
            }
        }
        setSearchParams(searchParams);
    };

    return (
        <>
            <Card style={{marginTop: 16, backgroundColor: "#6EB4B2"}}>
                <h2>Posts with tag: {data.tagName}</h2>
                <h4>{data.tagDescription}</h4>
            </Card>

            {data.list.length === 0 ? (
                <h2>List is Empty</h2>
            ) : (
                data.list.map((item) =>
                    (<PostCard key={item.id} {...item} />),
                )
            )}

            <Row style={{width: '100%', display: 'flex', marginTop: '25px', justifyContent: 'center'}}>
                <Pagination
                    showTotal={(total, range) => {
                        return (`${range[0]}-${range[1]} from ${total} posts`);
                    }}
                    current={(formParams.page)}
                    pageSize={formParams.pageSize}
                    total={data.totalCount}
                    onChange={handlePageChange}
                />
            </Row>
        </>
    );
};

export default PostListTagPage;
