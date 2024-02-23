import React, {useEffect, useState} from 'react';
import {Table, Divider, Button, Popconfirm, GetProp, TableProps} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import '/node_modules/antd/dist/reset.css';
import {useNavigate, useParams} from "react-router-dom";
import {ICategoryItem, IGetCategories} from "../types.ts";
 import http_common from "../../http_common.ts";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import qs from "qs";

type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const getRandomuserParams = (params: TableParams) => ({
    size: params.pagination?.pageSize,
    page: params.pagination?.current == undefined ? 0 : params.pagination.current - 1,
    ...params,
});

const getSearchRandomuserParams = (params: TableParams, key: string) => ({
    size: params.pagination?.pageSize,
    page: params.pagination?.current == undefined ? 0 : params.pagination.current - 1,
    keyword: encodeURIComponent(key),
    ...params,
});

const GetCategories: React.FC = () => {
    const navigate = useNavigate();
    const {searchTerm, currentPage} = useParams();
    const BASE_URL: string = import.meta.env.VITE_API_URL as string;
    const imgURL = BASE_URL + "/uploading/150_";
    const [data, setData] = useState<ICategoryItem[]>([]);
    const [loading, setLoading] = useState(false);

    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 5,
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            if(searchTerm)
            {
                try {
                    console.log( qs.stringify(getSearchRandomuserParams(tableParams, searchTerm)));

                    const response = await http_common
                        .get(`/api/categories/search?${qs.stringify(getSearchRandomuserParams(tableParams, searchTerm))}`);

                    setData(response.data.content);

                    setLoading(false);

                    setTableParams({
                        ...tableParams,
                        pagination: {
                            ...tableParams.pagination,
                            total: response.data.totalElements,
                        },
                    });

                } catch (error) {
                    console.error('Error fetching categories:', error);
                }
            }
            else {

                try {
                    const response = await http_common
                        .get<IGetCategories>(`/api/categories?${qs.stringify(getRandomuserParams(tableParams))}`);

                    console.log("QS", qs.stringify(getRandomuserParams(tableParams)))

                    setData(response.data.content);

                    setLoading(false);

                    setTableParams({
                        ...tableParams,
                        pagination: {
                            ...tableParams.pagination,
                            total: response.data.totalElements,
                        },
                    });

                    // @ts-ignore
                    navigate(`/categories/${tableParams.pagination.current}`)

                } catch (error) {
                    console.error('Error fetching categories:', error);
                }
            }
        };
        setLoading(true);
        fetchData();
    }, [JSON.stringify(tableParams), searchTerm, currentPage]);


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
        {
            title: 'Edit',
            dataIndex: 'edit',
            render: (_, record) => (

                <Button type="primary" onClick={() => handleEdit(record.id)} icon={<EditOutlined/>}>
                    Edit
                </Button>

            ),
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            render: (_, record) => (

                <Popconfirm
                    title="Are you sure to delete this category?"
                    onConfirm={() => handleDelete(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button icon={<DeleteOutlined/>}>
                        Delete
                    </Button>
                </Popconfirm>

            ),
        },
    ];

    const handleEdit = (categoryId: number) => {
        navigate(`/categories/edit/${categoryId}`);
    };

    const handleDelete = async (categoryId: number) => {
        try {
            await http_common.delete(`/api/categories/${categoryId}`);
            setData(data.filter(x => x.id != categoryId));
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    };

    const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };
    return (
        <div>
            <Divider>Category list</Divider>
            <Button type="primary" onClick={() => navigate("/categories/add")} style={{margin: '5px'}}>ADD +</Button>
            <Table
                columns={columns}
                rowKey={"id"}
                dataSource={data}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
            />
        </div>
    );
};

export default GetCategories;


