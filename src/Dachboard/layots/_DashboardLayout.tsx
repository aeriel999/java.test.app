import {Col, Layout,   Row} from "antd";

import '../index.css';
import {Outlet} from "react-router-dom";
import DashboardHeader from "./_HeaderLayout.tsx";
import SideMenu from "./_SideMenuLayout.tsx";
const DashboardLayout = () =>{

    return(
        <>
            <Layout className={"body"}>
                <Row>
                    <Col  className={"side-menu"}
                        xs={12} sm={10} md={8} lg={6} xl={5} xxl={4}>
                        <Row className={"logo"}>Dashboard</Row>
                        <Row className={"menuTitle"}> Menu</Row>

                        <Row className={"menu"}>
                           <SideMenu/>
                        </Row>
                    </Col>
                    <Col  xs={12} sm={14} md={16} lg={18} xl={19} xxl={20}>
                    <DashboardHeader/>

                        <Row className={"content"} >
                           <Layout>
                               <Outlet />
                           </Layout>
                        </Row>
                    </Col>

                </Row>
            </Layout>



        </>
    )
}

export  default DashboardLayout;