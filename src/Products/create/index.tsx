import {Button, Form, Input, Row, Select, Upload} from "antd";
import { PlusOutlined} from '@ant-design/icons';
import type {UploadChangeParam} from 'antd/es/upload';
import {useNavigate, useParams} from "react-router-dom";
import http_common from "../../http_common.ts";
import TextArea from "antd/es/input/TextArea";
import {ICategoryName, IProductCreate} from "../types.ts";
import {IUploadedFile} from "../../Categories/types.ts";
import {useEffect, useState} from "react";

const AddProduct = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState<ICategoryName[]>([]);
   const categoriesData = categories?.map(item => ({label: item.name, value: item.id}));

console.log("categoryId", categoryId)

    useEffect(() => {
        try {
            http_common.get<ICategoryName[]>("/api/categories/names")
                .then(resp => {
                    setCategories(resp.data);
                });
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }, []);

    const [form] = Form.useForm<IProductCreate>();

    const  add = async (data : IProductCreate) =>{
        try {
            await http_common.post("/api/products", data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/');
        }
        catch(ex) {
            console.log("Exception create category", ex);
        }
    }

    const onSubmit = async (values: IProductCreate) => {
        if(categoryId)
        {
            const data : IProductCreate = {
                ...values,
                // @ts-ignore
                category_id: categoryId
            }

            console.log("data", data)

            await add(data);
        }else {
            console.log("values", values)

            await add(values);
        }
    }

     return (
        <>
            <h1>Add Product</h1> <Row gutter={16}>
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
                {categoryId ? (
                    <h1>
                        Category: {(categories.find(category => category.id == categoryId))?.name}
                    </h1>
                ) : (
                    <Form.Item
                        label="Category"
                        name="category_id"
                        htmlFor="category_id"
                        rules={[
                            { required: true, message: 'This field is required' },
                        ]}
                    >
                        <Select
                            placeholder="Coose a category"
                            options={categoriesData}
                        />
                    </Form.Item>
                )}

                <Form.Item
                    label="Name"
                    name="name"
                    htmlFor="name"
                    rules={[
                        {required: true, message: 'It is a required field!'},
                        {min: 3, message: 'Name must have at least 3 symbols!'},
                    ]}
                >
                    <Input autoComplete="name"/>
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    htmlFor="price"
                    rules={[
                        {required: true, message: 'It is a required field!'},
                        {min: 1, message: 'Name must have at least 1 symbols!'},
                    ]}
                >
                    <Input autoComplete="price"/>
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    htmlFor="description"
                    rules={[
                        {required: true, message: 'It is a required field!'},
                        {min: 10, message: 'Name must have at least 10 symbols!'},
                    ]}
                >
                    <TextArea/>
                </Form.Item>


                <Form.Item
                    name="files"
                    label="Images"
                    valuePropName="files"
                    getValueFromEvent={(e: UploadChangeParam) => {
                        const images = e?.fileList as IUploadedFile[];
                        const originFileObjs = images?.map(image => image.originFileObj);
                        return originFileObjs;
                    }}
                    rules={[{required: true, message: 'Choose image for category!'}]}
                >
                    <Upload
                        showUploadList={{showPreviewIcon: false}}
                        beforeUpload={() => false}
                        accept="image/*"
                        listType="picture-card"
                        maxCount={10}
                    >
                        <div>
                            <PlusOutlined/>
                            <div style={{marginTop: 8}}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>

                <Row style={{display: 'flex', justifyContent: 'center'}}>
                    <Button style={{margin: 10}} type="primary" htmlType="submit">
                        Add
                    </Button>
                    <Button style={{margin: 10}} htmlType="button" onClick={() =>{ navigate('/')}}>
                        Cancel
                    </Button>
                </Row>
            </Form>
        </Row>
        </>

    )
}

export default AddProduct;
