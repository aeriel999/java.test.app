import {Button, Col, Collapse, Form, Input, Pagination, Row} from "antd";
import { useSearchParams} from "react-router-dom";
import http_common from "../../http_common.ts";
import {useEffect, useState} from "react";
import {IGetProducts, IProductSearch} from "../types.ts";
import ProductCard from "./ProductCard.tsx";

const GetProducts = () => {
    const [data, setData] = useState<IGetProducts>({
        list: [],
        totalCount: 0
    });

    const [searchParams, setSearchParams] = useSearchParams();

    const [formParams, setFormParams] = useState<IProductSearch>({
        keywordName: searchParams.get('keywordName') || "",
        keywordDescription: searchParams.get('keywordName') || "",
        keywordCategory: searchParams.get('keywordName') || "",
        page: Number(searchParams.get('page')) || 1,
        size: Number(searchParams.get('size')) || 3
    });

    const [form] = Form.useForm<IProductSearch>();

    const onSubmit = async (values: IProductSearch) => {
        findCategories({...formParams, page: 1, keywordName: values.keywordName, keywordDescription: values.keywordDescription, keywordCategory: values.keywordCategory});
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response =
                    await http_common
                        .get<IGetProducts>(`/api/products/search?keywordName=${formParams.keywordName}&keywordCategory=${formParams.keywordCategory}&keywordDescription=${formParams.keywordDescription}&page=${(formParams.page-1)}&size=${formParams.size}`);
                setData(response.data);
                // setLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        // setLoading(true);
        fetchData();
    }, [JSON.stringify(formParams)]);

    const {list,  totalCount } = data;

    //Todo Make new request after deleting
    const handleDelete = async (categoryId: number) => {
        try {
            await http_common.delete(`/api/categories/${categoryId}`);
            setData({ ...data, list: list.filter(x => x.id != categoryId)});
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    };

    const handlePageChange = async (page: number, newPageSize: number) => {
        findCategories({...formParams, page, size: newPageSize});
    };

    const findCategories = (model: IProductSearch) => {
        setFormParams(model);
        updateSearchParams(model);
    }

    const updateSearchParams = (params : IProductSearch) =>{
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
            <h1>List of Products</h1>
            {/*<Link to={"/categories/add"}>*/}
            {/*    <Button type="primary" style={{margin: '5px'}}>*/}
            {/*        ADD +*/}
            {/*    </Button>*/}
            {/*</Link>*/}
            <Collapse defaultActiveKey={0}>
                <Collapse.Panel key={1} header={"Search Panel"}>
                    <Row gutter={16}>
                        <Form form={form}
                              onFinish={onSubmit}
                              layout={"vertical"}
                              style={{
                                  minWidth: '100%',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'center',
                                  padding: 20,
                              }}
                        >
                            <Form.Item
                                label="Name"
                                name="keywordName"
                                htmlFor="keywordName"
                            >
                                <Input autoComplete="keyword"/>
                            </Form.Item>

                            <Form.Item
                                label="Description"
                                name="keywordDescription"
                                htmlFor="keywordDescription"
                            >
                                <Input autoComplete="keyword"/>
                            </Form.Item>

                            <Form.Item
                                label="Category"
                                name="keywordCategory"
                                htmlFor="keywordCategory"
                            >
                                <Input autoComplete="keyword"/>
                            </Form.Item>

                            <Row style={{display: 'flex', justifyContent: 'center'}}>
                                <Button style={{margin: 10}} type="primary" htmlType="submit">
                                    Search
                                </Button>
                                <Button style={{margin: 10}} htmlType="button" onClick={() => {
                                }}>
                                    Cansel
                                </Button>
                            </Row>
                        </Form>
                    </Row>
                </Collapse.Panel>
            </Collapse>
            <Row style={{width: '100%', display: 'flex', marginTop: '25px', justifyContent: 'center'}}>
                <Pagination
                    showTotal={(total, range) => {
                        console.log("range ", range);
                        return (`${range[0]}-${range[1]} із ${total} записів`);
                    }}
                    current={(formParams.page)}
                    pageSize={formParams.size}
                    total={totalCount}
                    onChange={handlePageChange}
                    pageSizeOptions={[3, 6, 12, 24]}
                    showSizeChanger
                />
            </Row>

            <Row gutter={16}>
                <Col span={24}>
                    <Row>
                        {data.list.length === 0 ? (
                            <h2>List is Empty</h2>
                        ) : (
                            data.list.map((item) =>
                                <ProductCard key={item.id} item={item} handleDelete={handleDelete} />,
                            )
                        )}
                    </Row>
                </Col>
            </Row>

            <Row style={{width: '100%', display: 'flex', marginTop: '25px', justifyContent: 'center'}}>
                <Pagination
                    showTotal={(total, range) => {
                        console.log("range ", range);
                        return (`${range[0]}-${range[1]} із ${total} записів`);
                    }}
                    current={(formParams.page)}
                    pageSize={formParams.size}
                    total={totalCount}
                    onChange={handlePageChange}
                    pageSizeOptions={[3, 6, 12, 24]}
                    showSizeChanger
                />
            </Row>
        </>
    );
}
export default GetProducts;

