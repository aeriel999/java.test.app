import {Button, Col, Collapse, Form, Input, Pagination, Row, Select} from "antd";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import http_common from "../../http_common.ts";
import ProductCard from "./PdoductCard.tsx";
import {ICategoryName, IGetProducts, IProductSearch} from "../../components/admin/products/types.ts";

const GetProducts = () => {
    const [categories, setCategories] = useState<ICategoryName[]>([]);

    const [data, setData] = useState<IGetProducts>({
        list: [],
        totalCount: 0
    });

    const [searchParams, setSearchParams] = useSearchParams();

    const [formParams, setFormParams] = useState<IProductSearch>({
        name: searchParams.get('keywordName') || "",
        description: searchParams.get('keywordDescription') || "",
        categoryId: Number(searchParams.get('keywordCategory')) || 0,
        page: Number(searchParams.get('page')) || 1,
        size: Number(searchParams.get('size')) || 3
    });

    const [form] = Form.useForm<IProductSearch>();

    const onSubmit = async (values: IProductSearch) => {
        findCategories({...formParams, page: 1, name: values.name,
            description: values.description, categoryId: values.categoryId});
    }

    useEffect(() => {
        const fetchData = async () => {
            try {

                console.log("formParams", formParams)
                const response =
                    await http_common
                        .get<IGetProducts>(`/api/products/search`,
                            {
                                params: {
                                    ...formParams,
                                    page: formParams.page-1
                                }
                            });
                setData(response.data);
                // setLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        // setLoading(true);
        fetchData();

        try {
            http_common.get<ICategoryName[]>("/api/categories/names")
                .then(resp=> {
                    setCategories(resp.data);
                });
        }catch (error) {
            console.error('Error fetching categories:', error);
        }
    }, [JSON.stringify(formParams)]);

    const {totalCount } = data;

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
            <h1 style={{textAlign: "center"}}>List of Products</h1>

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
                                name="name"
                                htmlFor="name"
                            >
                                <Input autoComplete="keywordName"/>
                            </Form.Item>

                            <Form.Item
                                label="Description"
                                name="description"
                                htmlFor="description"
                            >
                                <Input autoComplete="keywordDescription"/>
                            </Form.Item>

                            <Form.Item
                                label="Category"
                                name="categoryId"
                                htmlFor="categoryId"
                            >
                                <Select
                                    defaultValue={"All Categories"}
                                >
                                    <Select.Option value="0">All Categories</Select.Option>
                                    {
                                        categories.map(x=> (
                                            <Select.Option value={x.id}>{x.name}</Select.Option>
                                        ))
                                    }

                                </Select>
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

            <Row gutter={16} style={{marginBottom: '25px'}}>
                <Col span={24}>
                    <Row>
                        {data.list.length === 0 ? (
                            <h2>List is Empty</h2>
                        ) : (
                            data.list.map((item) =>
                                <ProductCard key={item.id} item={item}  />,
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

