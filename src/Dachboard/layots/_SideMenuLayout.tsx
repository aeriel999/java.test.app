import React  from 'react';
import {
    AppstoreOutlined,
     SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {  Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuProps['items'] = [
    getItem('Categories', 'sub1', <AppstoreOutlined />, [
        getItem('List of All Categories', '1'),
        getItem('Add New Category', '2'),
    ]),

    { type: 'divider' },

    getItem('Products', 'sub2', <AppstoreOutlined />, [
        getItem('List of All Products', '3'),
        getItem('Add New Product', '4'),
    ]),

    { type: 'divider' },

    getItem('Test', 'sub4', <SettingOutlined />, [
        getItem('Test', '5'),
        getItem('OTest', '66'),
        getItem('Test', '7'),
        getItem('Test', '8'),
    ]),

];

const SideMenu = () => {

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };

    return (
        <>
            <Menu className={"sideMenuBlock"}
                  onClick={onClick}
                  theme="dark"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  mode="inline"
                  items={items}
            />
        </>
    );
}

export default SideMenu;
