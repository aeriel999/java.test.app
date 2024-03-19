import React, { useState } from 'react';
import {
    DesktopOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import {Link} from "react-router-dom";

const {  Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(<Link to={"/Home"} >Back To Site</Link>, '1', <PieChartOutlined />),
    getItem(<Link to={"/Home"} >Go To Blog</Link>, '2', <DesktopOutlined />),
    getItem(<Link to={"/dashboard/categories/search/:searchTerm"} >Categories</Link>, '3', <DesktopOutlined />),
    getItem(<Link to={"/dashboard/products"}>Products</Link>, '4', <DesktopOutlined />),
];

const SideMenu = () => {

    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
       >
            <Menu
                theme="dark"
                  defaultSelectedKeys={['1']}
                  mode="inline"
                  items={items}
                style={{ marginTop: '15px' }}>

            </Menu>
        </Sider>
    );
}

export default SideMenu;