import React, {useEffect, useState} from 'react';
import {Pagination, Row} from "antd";
import PostCard from "./PostCard";
import {IBlogShow, IGetPosts} from "../../Interfaces/blog";
import {unwrapResult} from "@reduxjs/toolkit";
import {useAppDispatch} from "../../hooks/redux";
import {getAllPosts} from "../../store/blog/blog.actions.ts";
import { useSearchParams} from "react-router-dom";

const MainBlogPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const [data, setData] = useState<IGetPosts>({
        list: [],
        totalCount: 0,

    });

    const [formParams, setFormParams] = useState<IBlogShow>({
        page: Number(searchParams.get('page')) || 1,
        pageSize: Number(searchParams.get('pageSize')) || 5
    });

    useEffect(( ) => {
        const getLastPosts = async () =>
        {
            try {
                const response = await dispatch(getAllPosts(formParams));
                unwrapResult(response);
                setData(response.payload) ;
            } catch (error) {
                console.log("error", error)
            }
        }
        getLastPosts();

    }, [ JSON.stringify(formParams)]);

       const handlePageChange = async (page: number, newPageSize: number) => {
        findPosts({...formParams, page, pageSize: newPageSize});
    };

    const findPosts = (model: IBlogShow) => {
        setFormParams(model);
        updateSearchParams(model);
    }

    const updateSearchParams = (params : IBlogShow) =>{
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

export default MainBlogPage;
