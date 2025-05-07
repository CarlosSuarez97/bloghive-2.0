import React, {useState} from "react";
import 'materialize-css/dist/css/materialize.min.css'; //importing Materialize CSS
import 'materialize-css/dist/js/materialize.min.js'; //importing Materialize's JS components
import "../../public/styles/signUpForm.css";
import axios from "axios";
import M from "materialize-css";
import { useNavigate } from "react-router-dom";

const serverURL = "http://localhost:3000"; //URL of where the server's being hosted

const SignUpForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // this is for hiding the input of the password
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(serverURL + "/signup", {
                email,
                password,
                firstName,
                lastName
            });
    
            const { success, message } = response.data;
    
            M.toast({
                html: message || (success ? "Account created" : "Something went wrong"),
                classes: "grey darken-4"
            });
    
            if (success) {
                setTimeout(() => navigate("/login"), 2000); // Delay navigation so toast shows
            }
    
        } catch (error) {
            M.toast({
                html: "Server error during signup",
                classes: "grey darken-4"
            });
            console.error("Error: ", error);
        }
    };

    return(
        <div className="container">
            <form onSubmit={handleSignUp} className="col s12">
                <div className="row">
                    <div className="input-field col s12 m6 l6">
                        <input type="text" value={firstName} id="firstName" className="validate" onChange={(e) => setFirstName(e.target.value)} required/>
                        <label htmlFor="firstName">First name</label>
                    </div>
                    <div className="input-field col s12 m6 l6">
                        <input type="text" value={lastName} id="lastName" className="validate" onChange={(e) => setLastName(e.target.value)} required/>
                        <label htmlFor="lastName">Last name</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input type="email" value={email} id="email" className="validate" onChange={(e) => setEmail(e.target.value)} required/>
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input type={showPassword ? "text": "password"} value={password}  name="password" id="password" onChange={(e) => setPassword(e.target.value)} required/>
                        <label htmlFor="password">Password</label>
                        <span
                        className="material-icons prefix"
                        style={{cursor: "pointer", position: "absolute", right: 10, top: 10}}
                        onClick={() => {setShowPassword(!showPassword)}}
                        >
                            {showPassword ? "visibility_off" : "visibility"}
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <button type="submit" className="btn-large waves-effect waves-light" id="signUpBtn">Sign Up</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignUpForm;