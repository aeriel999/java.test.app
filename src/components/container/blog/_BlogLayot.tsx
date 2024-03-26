import {Card, Col, Layout, Row} from 'antd';
import BlogMainMenu from "./_BlogHeader.tsx";
import {Outlet} from "react-router-dom";
import BlogSideBar from "./_BlogSideBar.tsx";
import {Footer} from "antd/es/layout/layout";

const DefaultBlogLayout: React.FC = () => {
    return (
        <Layout
            style={{
                minHeight: "100vh",
                width:"100vw",
                background: 'url("https://wallpapers.com/images/featured/summer-gsgzr2s1hnv5slj3.jpg")',
                backgroundSize: 'cover',
               //  position: "fixed",
               // // overflowY: "auto",
               //  overflow: 'hidden',
                }}>
            <BlogMainMenu />

               <Layout
                   style={{
                       width: "80%",
                       margin: "auto",
                       backgroundColor: "transparent",
                       backdropFilter: "blur(10px)",
                       padding: "20px",
                       borderRadius: 10,
                       display: "flex",
                       flexDirection: "column",
                   }}
               >
                  <Row  style={{
                      marginBottom: 10,

                  }}>
                      <Col span={24}><Card style={{
                          backgroundColor: "#85D1EA",
                          textAlign: "center"
                      }}
                      ><h1>Summer Blog</h1></Card></Col>
                  </Row>
                   <Row style={{
                       display: "flex",
                       flexDirection: "row",
                       justifyContent: "space-between",

                   }}>
                       <Col span={20}> <Outlet/></Col>
                       <Col span={4}><BlogSideBar/></Col>
                   </Row>
               </Layout>

               <Footer style={{
                   textAlign: 'center',
                   background: 'none',
                   height: "10vh",
                   marginTop: "50px",
                   backgroundColor: "transparent",
                   backdropFilter: "blur(10px)",
               }}>
                   Admin Blog
               </Footer>

        </Layout>
    );
};

export default DefaultBlogLayout;
