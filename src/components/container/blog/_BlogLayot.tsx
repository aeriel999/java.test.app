import { Layout } from 'antd';

import BlogMainMenu from "./_BlogHeader.tsx";
import {Outlet} from "react-router-dom";
import BlogSideBar from "./_BlogSideBar.tsx";



const {  Footer } = Layout;

const DefaultBlogLayout: React.FC = () => {
    return (
        <Layout
            style={{
                height: "100vh",
                padding: '24px 0',
                background: 'url("https://wallpapers.com/images/featured/summer-gsgzr2s1hnv5slj3.jpg")',
                backgroundSize: 'cover'  }}>

            <BlogMainMenu />

            <Layout
                style={{
                    width: "80%",
                    height: "70vh",
                    margin: "auto",

                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <Outlet/>
                    <BlogSideBar/>
            </Layout>
            <Footer style={{textAlign: 'center', position: 'absolute', bottom: 0, right: 0, left: 0,  background: 'none', height: "10vh"   }}>
                Admin Blog
            </Footer>
        </Layout>
    );
};

export default DefaultBlogLayout;
