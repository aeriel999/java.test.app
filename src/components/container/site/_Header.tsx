import {Avatar, Button,  Layout, Menu} from 'antd';
import {Link, useLocation} from 'react-router-dom';
import ButtonGroup from "antd/es/button/button-group";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {logout} from "../../../store/accounts/account.slice.ts";
import {APP_ENV} from "../../../env";
import {PoweroffOutlined, UserOutlined} from "@ant-design/icons";


const { Header } = Layout;
// const { Search } = Input;

const items1 = ['Home', 'Products'].map((key) => ({
    key,
    label: `${key}`,
    link: key.toLowerCase(), // Add a link property based on the item key
}));


const DefaultHeader = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const {isLogin, user} = useAppSelector(state => state.account);

    const handleLogout = () => {
        //console.log("Logout user");
        dispatch(logout());
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
            {/*<Space direction="horizontal">*/}
            {/*    <Search*/}
            {/*        placeholder="input category name"*/}
            {/*       // onSearch={onSearch}*/}
            {/*        style={{ width: 200, margin: 15 }}*/}
            {/*        enterButton*/}
            {/*    />*/}

            {/*</Space>*/}
            {isLogin ? (
                <ButtonGroup size="large">
                    <Button
                        type="primary"
                        style={{display: 'flex'}}
                        icon={<Avatar  size="small" src={`${APP_ENV.BASE_URL}images/${user?.name}`}/>}
                    >
                        {user?.name}
                    </Button>
                    <Button
                        type="primary"
                        icon={<PoweroffOutlined/>}
                        onClick={() => handleLogout()}
                    />
                </ButtonGroup>

            ) : (
                <>
                <Link to="account/login" style={{color: 'inherit', textDecoration: 'none'}}>
                    <Button
                        style={{marginRight: "5px"}}
                        type="primary" icon={<UserOutlined/>}>
                        Sign-in
                    </Button>
                </Link>

                    <Link to="account/register" style={{color: 'inherit', textDecoration: 'none'}}>
                        <Button type="primary" icon={<UserOutlined/>}>
                           Register
                        </Button>
                    </Link>
                </>
            )}
        </Header>
    );
};

export default DefaultHeader;


