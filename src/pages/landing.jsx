import React from "react";
import 'materialize-css/dist/css/materialize.min.css'; //importing Materialize CSS
import 'materialize-css/dist/js/materialize.min.js'; //importing Materialize's JS components
import '../../public/styles/landing.css'; //importing this page's custom styling
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; //importing application's brand's logo

const Landing = () => {
    const navigate = useNavigate();
    return(
        <>
        <div className="container">
                <div className="col s12 m4 l6">
                    <div className="row">
                        <img src={logo} alt="BlogHive" id="appLogo"/>
                    </div>
                    <div className="row">
                        <div className="row">
                            <button className="waves-effect waves-light btn-large customButtons" onClick={() => {navigate("/signup")}}>Sign Up</button>
                        </div>
                        <div className="row">
                            <button className="waves-effect waves-light btn-large customButtons2" onClick={() => {navigate("/login")}}>Log In</button>
                        </div>
                    </div>
                </div>
            <Footer/>
        </div>
        </>
    )
}

export default Landing;