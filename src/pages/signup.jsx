import React from "react";
import 'materialize-css/dist/css/materialize.min.css'; //importing Materialize CSS
import 'materialize-css/dist/js/materialize.min.js'; //importing Materialize's JS components
import Footer from "../components/footer";
import SignUpForm from "../components/signUpForm.jsx";
import logo from "../assets/logo.png";
import "../../public/styles/signup.css";
import Header from "../components/header.jsx";

const SignUp = () => {
    return(
        <>
        <Header/>
        <div className="container">
            <div className="row">
                <div className="col s12">
                    <img src={logo} alt="bloghive" id="logo"/>
                </div>
            </div>
            <div className="row">
                <h2 className="rubik-semibold">Create your account</h2>
            </div>
            <div className="row">
                <SignUpForm/>
            </div>
            <div className="row">
                <Footer/>
            </div>
        </div>
        </>
    )
}

export default SignUp;