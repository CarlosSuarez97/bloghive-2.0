import React, {useEffect, useRef, useState} from "react";
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import M from "materialize-css";
import axios from "axios";
import { text } from "body-parser";

const EditPost = (props) => {

    const modalRef = useRef(null);
    const [postTitle, setPostTitle] = useState(null);
    const [postContent, setPostContent] = useState(null);
    const [rerender, setRerender] = useState(null);

    useEffect(() => {
        M.modal.init(modalRef.current);

        const textarea = document.getElementById("postContent");
        if(textarea) {
            M.CharacterCounter.init(textarea);
        }
    }, [rerender]);

    const handleEdit = () => {
        const token = localStorage.getItem("token");

        if(!token) {
            console.error("No token found");
            return;
        }

        try {
            {/*Pause coding here until the endpoint for editing posts is created*/}
        } catch (err) {
            console.error("Error: ", err);
        }
    }
    

    return(
        <>
            
        </>
    )
}

export default EditPost;