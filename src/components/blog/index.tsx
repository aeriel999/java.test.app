// MainBlogPage.tsx

import React from 'react';
import {Card, Layout} from "antd";


const MainBlogPage: React.FC = () => {
    return (
     <Layout style={{ backgroundColor: "#CEEBF1",}}>
         <Card  style={{margin: "auto", width: "80%"}}>
             <h1>Post</h1>
         </Card>
     </Layout>
    );
};

export default MainBlogPage;
