import {Col, Input, Row} from "antd";
import {SearchProps} from "antd/es/input/Search";

const DashboardHeader = () =>{
    const { Search } = Input;

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

    return(
        <>
            <Row  className={"header"}  >
                <Col  className={"search"} xs={12} sm={10} md={8} lg={6} xl={5} xxl={4}
                > <Search placeholder="input search text" onSearch={onSearch} enterButton /></Col>
                <Col></Col>
                <Col></Col>

            </Row>
        </>
    )
}

export  default  DashboardHeader;