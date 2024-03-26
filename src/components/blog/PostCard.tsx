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
            extra={<a href={"blog/show/" + post.urlSlug}>More</a>}
        >
            <Row>
                <Col span={10}>
                    <h4>Category: <Link to={"#"}>{post.categoryName}</Link> </h4>
                    </Col>
                <Col span={10}>
                    <h4>Tags: {post.tags?.map(tag => (
                        <Link style={{marginLeft: 5}} key={tag.id} to="#">{tag.name}</Link>
                    ))}</h4>
                </Col>
                <Col style={{textAlign:"right"}} span={4}><h4>{post.postedOn}</h4></Col>

            </Row>
            <Row>
            <Col span={24}> {post.shortDescription}</Col>
            </Row>


        </Card>
    )
}


export default PostCard;