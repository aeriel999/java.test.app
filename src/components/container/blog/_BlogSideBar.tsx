import React from 'react';
import Sider from "antd/es/layout/Sider";




const BlogSideBar: React.FC = () => {
    return (
        <Sider style={{backgroundColor: "#6EB7B0", padding: "20px"}}>
            <h1>Category</h1>
            <h1>Tags</h1>
            <h1>Latest Post</h1>
        </Sider>
    );
};

export default BlogSideBar;
