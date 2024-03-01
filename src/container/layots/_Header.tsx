import {Input, Layout, Menu, Space,} from 'antd';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import type {SearchProps} from "antd/es/input/Search";



const { Header } = Layout;
const { Search } = Input;


const items1 = ['Home', 'Products'].map((key) => ({
    key,
    label: `${key}`,
    link: key.toLowerCase(), // Add a link property based on the item key
}));


const DefaultHeader = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const onSearch: SearchProps['onSearch'] = (searchTerm) => {
        navigate(`/categories/search/${searchTerm}`);
    };

    return (
        <Header style={{ display: 'flex', alignItems: 'center' }}>
            <div className="demo-logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[location.pathname.substr(1)]} // Highlight the selected menu item
                style={{ flex: 1, minWidth: 0 }}
            >
                {items1.map((item) => (
                    <Menu.Item key={item.link}>
                        <Link to={`/${item.link}`}>{item.label}</Link>
                    </Menu.Item>
                ))}
            </Menu>
            <Space direction="horizontal">
                <Search
                    placeholder="input category name"
                    onSearch={onSearch}
                    style={{ width: 200, margin: 15 }}
                    enterButton
                />

            </Space>
        </Header>
    );
};

export default DefaultHeader;


