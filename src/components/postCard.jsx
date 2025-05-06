import React, { useState, useEffect } from "react";
import axios from "axios";
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

const serverURL = "http://localhost:3000";

const PostCard = () => {
    const [posts, setPosts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get(serverURL + "/getPost", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                if (res.data.success) {
                    setPosts(res.data.posts);
                } else {
                    console.error("Failed to fetch posts");
                }
            }).catch(err => {
                console.error("Error at fetching posts: ", err);
            });
        }
    }, [reload]);

    return (
        <>
            {posts.map(post => (
                <div className="col s12 m6" key={post.post_id}>
                    <div className="card grey darken-4">
                        <div className="card-content white-text">
                            <div className="row">
                                <span className="card-title" style={{fontWeight: "bold"}}>{post.post_title}</span>
                                <p>{post.post_content}</p>
                            </div>
                            {/* <div className="row">
                                <span>{post.post_date}</span>
                            </div> */}
                        </div>
                        <div className="card-action amber lighten-2">
                            <a href="#" className="black-text">Delete</a>
                            <a href="#" className="black-text">Edit</a>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default PostCard;
