import React from 'react';
import Sider from "antd/es/layout/Sider";




const BlogSideBar: React.FC = () => {
    return (
        <Sider style={{
            backgroundColor: "transparent",
            backdropFilter: "blur(10px)",
            marginLeft: 20,
            minWidth: 200
        }}>
            <h1>Category</h1>
            <h1>Tags</h1>
            <h1>Latest Post</h1>
        </Sider>
    );
};

export default BlogSideBar;
