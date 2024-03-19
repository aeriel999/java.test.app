import { Layout, theme} from "antd";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import SideMenu from "./_SideMenuLayout.tsx";
import DashboardHeader from "./_HeaderLayout.tsx";
import '../index.css';
import {useAppSelector} from "../../../../hooks/redux";

const { Content, Footer} = Layout;

const DashboardLayout = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();

    const {isLogin, user} = useAppSelector(state => state.account);

    const test = useAppSelector(state => state.account);
    console.log("test", test)

    let isAdmin = false;

    console.log("isAdmin", isAdmin)
    console.log("user", user)

    user?.roles.forEach(role=> {
        if (role.toLowerCase().includes('admin'))
            isAdmin=true;
    });

    useEffect(() => {
        if (!isLogin )
            navigate("/login");
        else if(!isAdmin)
            navigate("/");
    }, []);
    console.log("isAdmin", isAdmin)
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <SideMenu/>
            <Layout>
                <DashboardHeader/>
                <Content className={"content"}>
                    {/*<Breadcrumb style={{ margin: '16px 0' }}>*/}
                    {/*    <Breadcrumb.Item>Home</Breadcrumb.Item>*/}
                    {/*    <Breadcrumb.Item>List</Breadcrumb.Item>*/}
                    {/*    <Breadcrumb.Item>App</Breadcrumb.Item>*/}
                    {/*</Breadcrumb>*/}
                    <Layout
                        style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
                    >
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            {/*{(isLogin && isAdmin) && <Outlet />}*/}
                            <Outlet/>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center', bottom: "0", right: "0", left: "0"}}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    )
}

export  default DashboardLayout;