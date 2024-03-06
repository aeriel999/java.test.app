import {useNavigate, useParams} from "react-router-dom";
import {Button, Form, Input, Row, Select, Upload, UploadFile} from "antd";
import {useEffect, useState} from "react";
import TextArea from "antd/es/input/TextArea";
import {UploadChangeParam} from "antd/es/upload";
import {ICategoryName, IProductEdit, IProductEditPhoto, IProductItem} from "../types.ts";
import http_common from "../../http_common.ts";
import {APP_ENV} from "../../env";
import {PlusOutlined} from "@ant-design/icons";

const ProductEditPage : React.FC = () => {
    const {productId} = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState<ICategoryName[]>([]);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [deletedFileList, setDeletedFileList] = useState<IProductEditPhoto[]>([]);
    const [newFileList, setNewFileList] = useState<IProductEditPhoto[]>([]);

    const [product, setProduct] = useState<IProductItem>({
        id: 0,
        name: "",
        description: "",
        files: [],
        price: 0,
        category_id: 0
    });

    useEffect(() => {
        http_common.get<IProductItem>(`/api/products/${productId}`)
            .then(resp=> {
                //console.log("product info", resp.data);
                setProduct(resp.data);
            });

        http_common.get<ICategoryName[]>("/api/categories/names")
            .then(resp=> {
                //console.log("list categories", resp.data);
                setCategories(resp.data);
            });
    },[productId]);

    useEffect(() => {
        setDefaultData(product);
    }, [product]);

    const [form] = Form.useForm<IProductEdit>();

    const setDefaultData = (data: IProductItem | null) => {
        if (data) {
            if (data.files?.length){
                setFileList([]);
            }
            const newFileList : UploadFile[] = [];
            for (let i = 0; i < data.files.length; i++) {
                newFileList.push({
                    uid: data.files[i],
                    name: data.files[i],
                    status: 'done',
                    url: `${APP_ENV.BASE_URL}/uploading/300_${data.files[i]}`,
                });
            }
            setFileList(newFileList);
            const formattedPrice = String(data.price).replace('.', ',');
            form.setFieldsValue({
                ...data,
                price: formattedPrice,
            });
        }
    };

    const onSubmit = async (values: IProductEdit) => {
        const data : IProductEdit = {
            ...values,
            oldPhotos: deletedFileList,
            newPhotos: newFileList
        }

        console.log("data", data)
        try {
            await http_common.put(`/api/products`, data, {
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

    const optionsData = categories?.map(item => ({label: item.name, value: item.id}));

    const handleFileChange = async ( e: UploadChangeParam ) => {
       const fileList = e?.fileList;
       const  newFile = e?.file;
       const  status = e?.file.status;

       if(status === "removed")
       {
           console.log("fileList", fileList)

           const removedFiles = fileList.filter(
               (file) => !fileList.some((newFile) => newFile.uid === file.uid)
           );

           const removedFileList: IProductEditPhoto[] = removedFiles.map((file) => ({
               photo: file.name,
               priority: 0,
           }));

           setDeletedFileList(removedFileList);

           setFileList(fileList);
       }else{
            console.log("newFile", newFile)
           console.log("fileList", fileList)

           try {
               const fileString = await new Promise<string>((resolve, reject) => {
                   const reader = new FileReader();
                   reader.onloadend = () => {
                       resolve(reader.result as string);
                   };
                   reader.onerror = reject;

                   reader.readAsDataURL(newFile);
               });

               console.log("fileString", fileString);
               const base64Content = fileString.split(",")[1];

               setFileList((prevFileList) => [
                   ...prevFileList,
                   {
                       uid: newFile.uid,
                       name: newFile.name,
                       status: "done",
                       url: fileString, // or use a placeholder URL
                   },
               ]);

               const newFileAdd : IProductEditPhoto[] = {
                   photo: base64Content,
                   priority: fileList?.length,
               }
               console.log("newFileAdd", newFileAdd);

               setNewFileList(newFileAdd);

           } catch (error) {
               console.error("Error converting file to Base64:", error);
           }
       }
    };

    return (
        <>
            <h1>Edit Product</h1>

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
                        label="Category"
                        name="category_id"
                        htmlFor="category_id"
                        rules={[
                            {required: true, message: 'Це поле є обов\'язковим!'},
                        ]}
                    >
                        <Select
                            placeholder="Оберіть категорію: "
                            options={optionsData}
                        />
                    </Form.Item>

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
                            {min: 3, message: 'Name must have at least 3 symbols!'},
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
                            handleFileChange(e);
                        }}
                    >
                        <Upload
                            showUploadList={{showPreviewIcon: false}}
                            beforeUpload={() => false}
                            accept="image/*"
                            fileList={fileList}
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

export default ProductEditPage;