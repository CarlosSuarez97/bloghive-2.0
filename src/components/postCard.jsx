import React, { useState, useEffect } from "react";
import axios from "axios";
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

const serverURL = "http://localhost:3000";

const PostCard = ({onUpdate}) => {
    const [posts, setPosts] = useState([]);
    const [postToDelete, setPostToDelete] = useState(null);
    const [rerender, setRerender] = useState(false);

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

        const elems = document.querySelectorAll(".modal");
        M.Modal.init(elems);
    }, [rerender]);

    const handleDelete = async (postId) => {
        const token = localStorage.getItem("token");

        try {
            await axios.delete(`${serverURL}/deletePost/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPosts(prev => prev.filter(p => p.post_id !== postToDelete));
            setPostToDelete(null);

            const modalInstance = M.Modal.getInstance(document.getElementById("deleteModal"));
            modalInstance.close();
            M.toast({html: "Post Deleted", classes: "grey darken-4"})
            setRerender(prev => !prev);
            if(onUpdate) onUpdate();
        } catch (error) {
            console.error("Error deleting the post: ", error);
        }
    }

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
                        </div>
                        <div className="card-action grey darken-3">
                            <a href="#deleteModal" className="white-text modal-trigger" onClick={() => setPostToDelete(post.post_id)}><i className="material-icons small">delete</i></a>
                            <a href="#" className="white-text"><i className="material-icons small">edit</i></a>
                        </div>
                    </div>
                </div>
            ))}
            
            {/*Confirmation for deletion*/}
            <div id="deleteModal" className="modal amber lighten-2">
                <div className="modal-content">
                    <h6 className="black-text">Are you sure you want to delete this post?</h6>
                    <span className="black-text">This action cannot be undone</span>
                </div>
                <div className="modal-footer amber lighten-1">
                    <a href="#!" className="modal-close waves-effect btn-flat black-text">Cancel</a>
                    <a href="#!" onClick={() => handleDelete(postToDelete)} className="waves-effect waves-red btn red">Delete</a>
                </div>
            </div>
        </>
    );
};

export default PostCard;
