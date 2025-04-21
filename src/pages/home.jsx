//This is the page where everything from the user will be rendered once thet've logged in

import React from 'react';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import Footer from "../components/footer";
//import for the custom CSS for the page goes here

const HomePage = () => {
    return(
        <>
        <h1>This is the landing page for the usr when they log in</h1>
        <Footer/>
        </>
    )
}

export default HomePage;