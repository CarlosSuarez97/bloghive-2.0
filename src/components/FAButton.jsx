import React, {useEffect} from "react";
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css'; // JS functionality like FAB init
import 'materialize-css/dist/js/materialize.min.js';
import PostComposition from "./postComposition";

const FAButton = () => {
    useEffect(() => {
        // Initialize FAB
        const elems = document.querySelectorAll('.fixed-action-btn');
        M.FloatingActionButton.init(elems, {
          direction: 'left',
          hoverEnabled: false
        });
        //Initialize modal trigger
        const modals = document.querySelectorAll('.modal');
        M.Modal.init(modals);
      }, []);

      return(
        <div>
            <PostComposition/>
            <div class="fixed-action-btn click-to-toggle">
                <a class="btn-floating btn-large red">
                    <i class="large material-icons">mode_edit</i>
                </a>
                <ul>
                    <li><a class="btn-floating green modal-trigger" href="#my-modal"><i class="material-icons">add</i></a></li>
                </ul>
            </div>
        </div>
      )
};

export default FAButton;