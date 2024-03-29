import React from 'react';
import {Card, Col, Row} from 'antd';
import {IPost} from "../../Interfaces/blog";
import {Link} from "react-router-dom";


const PostCard: React.FC<IPost> = ( post) => {
    console.log("post.tagList", post.tags)
    return(
        <Card
            style={{ marginTop: 16 }}
            type="inner"
            title= {post.title}
            extra={<Link to={`/blog/show/${post.id}/${post.urlSlug}`}>More</Link>}
        >
            <Row>
                <Col span={8}>
                    <h4>Category: <Link to={`/blog/${post.categoryUrlSlug}/${post.categoryId}`}>{post.categoryName}</Link> </h4>
                    </Col>
                <Col span={8}>
                    <h4>Tags: {post.tags?.map(tag => (
                        <Link style={{marginLeft: 5}} key={tag.id} to={`/blog/tag/${tag.urlSlug}/${tag.id}`}>{tag.name}</Link>
                    ))}</h4>
                </Col>
                <Col style={{textAlign:"right"}} span={8}><h4>{post.postedOn}</h4></Col>

            </Row>
            <Row>
                <Col span={24}> {post.shortDescription}</Col>
            </Row>


        </Card>
    )
}


export default PostCard;