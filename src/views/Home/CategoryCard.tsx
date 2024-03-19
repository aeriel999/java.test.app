import { Card, Col,   Typography} from "antd";
//import {APP_ENV} from "../../env";
import Meta from "antd/es/card/Meta";
import {ICategoryItem} from "../../components/admin/categories/types.ts";

const { Title } = Typography;

interface ICategoryCardProps {
    item: ICategoryItem,
}

const CategoryCard: React.FC<ICategoryCardProps> = (props) => {
    const {item} = props;
    const {name, image, description} = item;

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

                </Card>
            </Col>
        </>
    )
}

export default CategoryCard;