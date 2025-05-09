import React, {useEffect, useRef, useState} from "react";
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import "../../public/styles/loginForm.css";
import M from "materialize-css";
import axios from "axios";

const serverURL = "http://localhost:3000";

const PostComposition = () => {

    const modalRef = useRef(null);
    const [postTitle, setPostTitle] = useState(null);
    const [postContent, setPostContent] = useState(null);
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        M.Modal.init(modalRef.current);

        const textarea = document.getElementById("postContent");
        if(textarea) {
            M.CharacterCounter.init(textarea);
        }
    }, [rerender]);

    const handleNewPost = async () => {

        const token = localStorage.getItem("token");

        if(!token) {
            console.error("No token found");
            return;
        }

        try {
            await axios.post(serverURL + "/newPost", {
                postTitle,
                postContent
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setRerender(prev => !prev);
        } catch (error) {
            console.error("Something's gone wrong: ", error);
        }
    };

    return(
        <div>
            <div className="modal grey darken-4" id="composePost" ref={modalRef} style={{padding: "10px"}}>
                <h5 className="white-text">New Post</h5>
                <form onSubmit={handleNewPost}>
                    <div className="modal-content">
                        <div className="row">
                            <div className="input-field col s12">
                                <input type="text" value={postTitle} name="title" id="postTitle" className="validate white-text" onChange={(e) => {setPostTitle(e.target.value)}}/>
                                <label htmlFor="postTitle">Title</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea 
                                    type="text" 
                                    value={postContent || ""} 
                                    name="content" 
                                    id="postContent" 
                                    className="validate materialize-textarea" 
                                    onChange={(e) => {setPostContent(e.target.value)}}
                                    data-length="500"
                                    maxLength={500}
                                ></textarea>
                                <label htmlFor="postContent">What's happening?</label>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer grey darken-4">
                        <a href="#!" className="modal-close waves-effect waves-amber btn red white-text">Close</a>
                        <button type="submit" className="btn waves-effect waves-amber amber black-text modal-close" style={{marginLeft: "12px"}}>Post</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default PostComposition;