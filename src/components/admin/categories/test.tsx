import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';


const { Content, Footer } = Layout;

const DefaultBlogLayout: React.FC = () => {
    return (
        <Layout
            style={{
                height: "100vh",
                padding: '24px 0',
                background: 'url("https://wallpapers.com/images/featured/summer-gsgzr2s1hnv5slj3.jpg")',
                backgroundSize: 'cover'  }}>



            <Content
                style={{
                    height: "70vh",
                    width: '90%',
                    margin: 'auto',
                    textAlign: 'center',
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "stretch",

                }}
            >

                <Outlet/>



            </Content>

            <Footer style={{textAlign: 'center', position: 'absolute', bottom: 0, right: 0, left: 0,  background: 'none', height: "10vh", }}>
                Admin Blog
            </Footer>
        </Layout>
    );
};

export default DefaultBlogLayout;
