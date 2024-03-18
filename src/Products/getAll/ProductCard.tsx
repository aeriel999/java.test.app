import {Button, Card, Col, Popconfirm, Typography} from "antd";
import Meta from "antd/es/card/Meta";
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {IProductItem} from "../types.ts";
import {useAppSelector} from "../../hooks/redux";

const {Title} = Typography;

interface IProductCardProps {
    item: IProductItem,
    handleDelete: (id: number) => void
}

const ProductCard: React.FC<IProductCardProps> = (props) => {
    const {item, handleDelete} = props;
    const {id, name, files, description, price} = item;
    const { user} = useAppSelector(state => state.account);

    let isAdmin = false;

    user?.roles.forEach(role=> {
        if (role.toLowerCase().includes('admin'))
            isAdmin=true;
    });

    return (
        <>
            <Col style={{padding: 20, marginBottom: 100}} xxl={8} lg={12} md={18} sm={28}>
                <Card
                    bodyStyle={{flex: '1', paddingBlock: '10px'}}
                    style={{height: 380, display: 'flex', flexDirection: 'column', paddingTop: '40px'}}
                    hoverable
                    cover={
                        <img
                            style={{height: '300px', objectFit: 'contain'}}
                            alt={name}
                            // src={image ? `${APP_ENV.BASE_URL}/uploading/300_${image}` : NotImage}
                            src={files[0]}


                        />
                    }
                >
                    <Meta
                        title={name}
                        description={
                            <>
                                <Title level={5} type="success">{description.substring(0, 15)} ...</Title>
                                <Typography>
                                    <Typography.Title level={5} type="success">
                                        Price: <strong>${price}</strong>
                                    </Typography.Title>
                                </Typography>
                            </>
                        }
                    />

                    {isAdmin && (
                        <>
                            <Link to={`/dashboard/product/edit/${id}`}>
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
                        </>
                    )}

                </Card>
            </Col>
        </>
    )
}

export default ProductCard;