import {Button, Form, Input, Row, Upload} from "antd";
import { PlusOutlined} from '@ant-design/icons';
import type {UploadChangeParam} from 'antd/es/upload';
import {ICategoryCreate, IUploadedFile} from "../types.ts";
import {useNavigate} from "react-router-dom";
import http_common from "../../http_common.ts";
import TextArea from "antd/es/input/TextArea";


const AddCategory = () => {

    const navigate = useNavigate();

    const [form] = Form.useForm<ICategoryCreate>();

    const onSubmit = async (values: ICategoryCreate) => {
        try {
            await http_common.post("/api/categories", values, {
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

    return (
        <>
            <h1>Add Category</h1>
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
                        rules={[{required: true, message: 'Choose image for category!'}]}
                    >
                        <Upload
                            showUploadList={{showPreviewIcon: false}}
                            beforeUpload={() => false}
                            accept="image/*"
                            listType="picture-card"
                            maxCount={1}

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

export default AddCategory;
