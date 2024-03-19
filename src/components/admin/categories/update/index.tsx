import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Button, Form, Input, Row, Upload, UploadFile, UploadProps} from "antd";
import type {UploadChangeParam} from "antd/es/upload";
import { PlusOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import {ICategoryEdit, IUploadedFile} from "../types";
import http_common from "../../../../http_common";

const EditCategory: React.FC = () => {
    const {categoryId} = useParams(); // Get the categoryId from the URL params
    const [categoryDetails, setCategoryDetails] = useState<any>(null);
    const BASE_URL: string = import.meta.env.VITE_API_URL as string;
    const navigate = useNavigate();
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const [form] = Form.useForm<ICategoryEdit>();

    useEffect(() => {
        const fetchCategory = async () => {

            try {
              const  details =  await http_common.get(`/api/categories/${categoryId}`);

                setCategoryDetails(details.data);

                const imgUrl = BASE_URL + "/uploading/150_" + details.data.image;
                setFileList([
                    {
                        uid: '-1',
                        name: 'image.png',
                        status: 'done',
                        url: imgUrl,
                    }
                ]);

            } catch (error) {
                throw new Error(`Error: ${error}`);
            }
        };

        fetchCategory();


    }, [categoryId]);

    if (!categoryDetails) {
        // Optionally, you can show a loading indicator or redirect to an error page
        return <p>Loading...</p>;
    }

   // const imgUrl = BASE_URL + "/uploading/150_" + categoryDetails.image;

    const onSubmit = async (values: ICategoryEdit) => {
        try {
            await http_common.put(`/api/categories/${categoryId}`, values, {
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

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    return (

        <>
            <h1>Edit Category</h1>
            <Row gutter={16}>
                <Form form={form}
                      onFinish={onSubmit}
                      initialValues={categoryDetails}
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
                        name="id"
                       hidden
                    />
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
                        name="file"
                        label="Image"
                        valuePropName="file"
                        getValueFromEvent={(e: UploadChangeParam) => {
                            const image = e?.fileList[0] as IUploadedFile;
                            return image?.originFileObj;
                        }}
                    >
                        <Upload
                            showUploadList={{showPreviewIcon: false}}
                            beforeUpload={() => false}
                            accept="image/*"
                            listType="picture-card"
                            fileList={fileList}
                            maxCount={1}
                            onChange={handleChange}
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
                        <Button style={{margin: 10}} htmlType="button" onClick={() => {
                            navigate('/')
                        }}>
                            Cancel
                        </Button>
                    </Row>
                </Form>
            </Row>
        </>
    );
};

export default EditCategory;