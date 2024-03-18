import {Avatar, Button,   Layout, Row} from "antd";
import ButtonGroup from "antd/es/button/button-group";
import {APP_ENV} from "../../env";
import {PoweroffOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {logout} from "../../store/accounts/account.slice.ts";
import '../index.css';
//import {SearchProps} from "antd/es/input/Search";

const DashboardHeader = () =>{
    // const { Search } = Input;
    // const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
    const dispatch = useAppDispatch();


    const {isLogin, user} = useAppSelector(state => state.account);

    const handleLogout = () => {
        //console.log("Logout user");
        dispatch(logout());
    };
    return(
        <>
            <Row  className={"header"}  >
               <Layout >
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
               </Layout>

            </Row>
        </>
    )
}

export  default  DashboardHeader;