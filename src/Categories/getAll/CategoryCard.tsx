import {ICategoryItem} from "../types.ts";
import {Button, Card, Col, Popconfirm, Typography} from "antd";
//import {APP_ENV} from "../../env";
//import NotImage from '../../assets/NotImage.png';
import Meta from "antd/es/card/Meta";
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {useAppSelector} from "../../hooks/redux";

const { Title } = Typography;

interface ICategoryCardProps {
    item: ICategoryItem,
    handleDelete: (id: number) => void
}

const CategoryCard: React.FC<ICategoryCardProps> = (props) => {
    const {item, handleDelete} = props;
    const {id, name, image, description} = item;
    const { user} = useAppSelector(state => state.account);

    let isAdmin = false;

    user?.roles.forEach(role=> {
        if (role.toLowerCase().includes('admin'))
            isAdmin=true;
    });

console.log("image", image)
    return (
        <>
            <Col style={{padding: 20, marginBottom: 50}} xxl={8} lg={12} md={18} sm={28}>
                <Card
                    bodyStyle={{flex: '1', paddingBlock: '10px'}}
                    style={{height: 380, display: 'flex', flexDirection: 'column', paddingTop: '40px'}}
                    hoverable
                    cover={
                        <img
                            style={{height: '300px', objectFit: 'contain'}}
                            alt={name}
                            // src={image ? `${APP_ENV.BASE_URL}/uploading/300_${image}` : NotImage}
                            src={image}
                        />
                    }
                >
                    <Meta
                        title={name}
                        description={
                            <Title level={5} type="success">{description.substring(0, 35)} ...</Title>
                        }
                    />

                    {/* Render actions only if the user is an admin */}
                    {isAdmin && (
                        <>
                            <Link to={`/dashboard/products/add/${id}`}>
                                <Button type="link">
                                    Add Product +
                                </Button>
                            </Link>

                            <Link to={`/dashboard/categories/edit/${id}`}>
                                <Button type="primary" icon={<EditOutlined/>}>
                                    Edit
                                </Button>
                            </Link>

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
                        </>
                    )}
                </Card>
            </Col>
        </>
    )
}

export default CategoryCard;