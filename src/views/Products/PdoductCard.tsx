import { Card, Col, Typography} from "antd";
import Meta from "antd/es/card/Meta";
import {IProductItem} from "../../components/admin/products/types.ts";

const {Title} = Typography;

interface IProductCardProps {
    item: IProductItem,
}

const ProductCard: React.FC<IProductCardProps> = (props) => {
    const {item} = props;
    const {name, files, description, price} = item;

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
                </Card>
            </Col>
        </>
    )
}

export default ProductCard;