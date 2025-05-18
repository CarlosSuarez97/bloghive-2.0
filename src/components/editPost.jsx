import React, { useEffect, useRef, useState } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import M from "materialize-css";
import axios from "axios";

const serverURL = "http://localhost:3000";

const EditPost = ({ postId, postTitle: initialTitle, postContent: initialContent, onEditComplete }) => {
    const modalRef = useRef(null);
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");

    useEffect(() => {
        M.Modal.init(modalRef.current);
        const instance = M.Modal.getInstance(modalRef.current);
        instance.open();

        setPostTitle(initialTitle || "");
        setPostContent(initialContent || "");

        const textarea = document.getElementById("postContent");
        if (textarea) {
            M.CharacterCounter.init(textarea);
        }
    }, [initialTitle, initialContent]);

    const handleEdit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            await axios.patch(`${serverURL}/editPost/${postId}`, {
                editedTitle: postTitle,
                editedContent: postContent
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            M.toast({ html: "Post updated", classes: "green darken-2" });
            const modalInstance = M.Modal.getInstance(modalRef.current);
            modalInstance.close();
            if (onEditComplete) onEditComplete();

        } catch (err) {
            console.error("Error: ", err);
            M.toast({ html: "Error updating post", classes: "red darken-3" });
        }
    };

    return (
        <div>
            <div className="modal grey darken-4" id="editPost" ref={modalRef} style={{ padding: "10px" }}>
                <h5 className="white-text">Edit Post</h5>
                <form onSubmit={handleEdit}>
                    <div className="modal-content">
                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    type="text"
                                    value={postTitle}
                                    id="postTitle"
                                    className="validate white-text"
                                    onChange={(e) => setPostTitle(e.target.value)}
                                />
                                <label htmlFor="postTitle" className="active">Title</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea
                                    value={postContent}
                                    id="postContent"
                                    className="validate materialize-textarea"
                                    onChange={(e) => setPostContent(e.target.value)}
                                    data-length="500"
                                    maxLength={500}
                                ></textarea>
                                <label htmlFor="postContent" className="active">What's happening?</label>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer grey darken-4">
                        <a href="#!" className="modal-close waves-effect btn red white-text">Cancel</a>
                        <button type="submit" className="btn waves-effect amber black-text" style={{ marginLeft: "12px" }}>
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPost;
