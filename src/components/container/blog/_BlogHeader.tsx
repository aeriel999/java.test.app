// MainMenu.tsx

import React from 'react';
import {Menu, type MenuProps} from 'antd';
import { HomeOutlined,  ReadOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';

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
    getItem(<Link to={"/Home"} >Back To Site</Link>, '1', <HomeOutlined />),
    getItem(<Link to={"/blog"} >Blog Main Page</Link>, '2', <ReadOutlined />),

];

const BlogMainMenu: React.FC = () => {
    return (
        <Menu theme="light" mode="horizontal"  items={items}
              style={{
                  minHeight: "50px",
                  backgroundColor: "transparent",
                  backdropFilter: "blur(10px)",
                  marginBottom: "75px"
              }}
              selectedKeys={[]} >
          {/*<div style={{*/}
          {/*    margin: "20px",*/}
          {/*    padding: "20px",*/}
          {/*    display: "flex",*/}
          {/*    flexDirection: "row",*/}
          {/*    justifyContent: "space-around",*/}

          {/*}}>*/}
          {/*    <Menu.Item key="home" icon={<HomeOutlined/>}>*/}
          {/*        <Link to="/">Back to Site</Link>*/}
          {/*    </Menu.Item>*/}
          {/*    <Menu.Item key="blog" icon={<ReadOutlined/>}>*/}
          {/*        <Link to="/blog">Blog Main Page</Link>*/}
          {/*    </Menu.Item>*/}

          {/*</div>*/}
        </Menu>
    );
};

export default BlogMainMenu;
