import {ICategoryItem} from "../types.ts";
import {Button, Card, Col, Popconfirm} from "antd";
//import {APP_ENV} from "../../env";
//import NotImage from '../../assets/NotImage.png';
import Meta from "antd/es/card/Meta";
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";

//const { Title } = Typography;

interface ICategoryCardProps {
    item: ICategoryItem,
    handleDelete: (id: number) => void
}

const CategoryCard: React.FC<ICategoryCardProps> = (props) => {
    const {item, handleDelete} = props;
    const {id, name, image} = item;

console.log("image", image)
    return (
        <>
            <Col style={{padding: 20, marginBottom: 10}} xxl={8} lg={12} md={18} sm={28}>
                <Card
                    bodyStyle={{flex: '1', paddingBlock: '10px'}}
                    style={{height: 280, display: 'flex', flexDirection: 'column', paddingTop: '40px'}}
                    hoverable
                    cover={
                        <img
                            style={{height: '200px', objectFit: 'contain'}}
                            alt={name}
                           // src={image ? `${APP_ENV.BASE_URL}/uploading/300_${image}` : NotImage}
                            src={image}


                        />
                    }
                    actions={[
                        <Link to={`/products/add/${id}`}>
                            <Button type="link"  >
                                Add Product +
                            </Button>
                        </Link>,
                        <Link to={`/categories/edit/${id}`}>
                            <Button type="primary" icon={<EditOutlined/>}>
                                Edit
                            </Button>
                        </Link>,

                        <Popconfirm
                            title="Are you sure to delete this category?"
                            onConfirm={() => handleDelete(id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button icon={<DeleteOutlined/>}>
                                Delete
                            </Button>
                        </Popconfirm>
                    ]}
                >

                    <Meta
                        title={name}
                        // description={
                        //     <Title level={5} type="success">{description}</Title>
                        // }
                    />
                </Card>
            </Col>
        </>
    )
}

export default CategoryCard;