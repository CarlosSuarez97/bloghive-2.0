import React from "react";
import axios from "axios";
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
//import for the custom CSS for the page goes here

const postCard = () => {
    return(
        <>
        <div className="col s12 m7">
            {/* post's title */}
            <h2 className="header">This is a Placeholder Title</h2>
            <div className="card-horizontal">
                <div className="card-stacked">
                    <div className="card-content">
                        <p>This is some placeholder text</p>
                    </div>
                    <div className="card-action">
                        <a href="#">This is button or link that does something</a>
                        <a href="#">This is a second button or link that does some other thing</a>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default postCard;