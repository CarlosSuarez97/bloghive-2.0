import React, {useEffect, useRef, useState} from "react";
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import "../../public/styles/loginForm.css";
import M from "materialize-css";

const PostComposition = () => {
    const modalRef = useRef(null);
    const [postTitle, setPostTitle] = useState(null);
    const [postContent, setPostContent] = useState(null);

    useEffect(() => {
        M.Modal.init(modalRef.current);
    }, []);

    return(
        <div>
            <div className="modal" id="my-modal" ref={modalRef}>
                <form>
                    <div className="modal-content">
                        <div className="row">
                            <div className="input-field col s12">
                                <input type="text" value={postTitle} name="title" id="postTitle" className="validate black-text" onChange={(e) => {setPostTitle(e.target.value)}}/>
                                <label htmlFor="postTitle">Title</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input type="text" value={postContent} name="content" id="postContent" className="validate black-text" onChange={(e) => {setPostContent(e.target.value)}}/>
                                <label htmlFor="postContent">What's happening?</label>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Close</a>
                        <button type="submit" className="btn-flat waves-effect waves-light">Post</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default PostComposition;