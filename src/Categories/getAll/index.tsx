import React, {useEffect, useState} from 'react';
import {Table, Divider, Button} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import '/node_modules/antd/dist/reset.css';
import {useNavigate} from "react-router-dom";
import {ICategoryItem} from "../types.ts";
import  axios from "axios";

const GetCategories: React.FC = () => {
    const navigate = useNavigate();
    const BASE_URL: string = "http://localhost:8080";
    const imgURL = BASE_URL + "/uploading/150_";

    const columns: ColumnsType<ICategoryItem> = [
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            render: (imageName: string) => (
                <img src={`${imgURL}${imageName}`} alt="Category Image"/>
            ),
        },
        // {
        //     title: 'Edit',
        //     dataIndex: 'edit',
        //     render: (_, record) => (
        //
        //         <Button type="primary" onClick={() => handleEdit(record.id)} icon={<EditOutlined/>}>
        //             Edit
        //         </Button>
        //
        //     ),
        // },
        // {
        //     title: 'Delete',
        //     dataIndex: 'delete',
        //     render: (_, record) => (
        //
        //         <Popconfirm
        //             title="Are you sure to delete this category?"
        //             onConfirm={() => handleDelete(record.id)}
        //             okText="Yes"
        //             cancelText="No"
        //         >
        //             <Button icon={<DeleteOutlined/>}>
        //                 Delete
        //             </Button>
        //         </Popconfirm>
        //
        //     ),
        // },
    ];

    const [data, setData] = useState<ICategoryItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}` + "/api/categories");
                console.log("response.data", response.data)
                setData(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchData();
    }, [ ]);

    // const handleEdit = (categoryId: number) => {
    //     navigate(`/categories/edit/${categoryId}`);
    // };

    // const handleDelete = async (categoryId: number) => {
    //     await deleteCategory(Number(categoryId));
    //     setData(data.filter(x=>x.id != categoryId));
    // };

    // const [data, setData] = useState<ICategoryItem[]>([]);
    // useEffect(() => {
    //     const fetchDataAndDoSomething = async () => {
    //         // try {
    //         //     const fetchedData: ICategoryItem[] = await fetchData();
    //         //     // Update the state with the fetched data
    //         //     setData(fetchedData);
    //         // } catch (error) {
    //         //     throw error;
    //         // }
    //     };
    //
    //     fetchDataAndDoSomething();
    // }, []); // The empty dependency array means this effect runs once when the component mounts

    return (
        <div>
            <Divider>Category list</Divider>
            <Button type="primary" onClick={() => navigate("/categories/add")} style={{margin: '5px'}}>ADD +</Button>
            <Table columns={columns} rowKey={"id"} dataSource={data} size="middle"/>
        </div>
    );
};

export default GetCategories;


