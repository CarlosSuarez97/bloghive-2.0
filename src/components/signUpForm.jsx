import React, {useState} from "react";
import 'materialize-css/dist/css/materialize.min.css'; //importing Materialize CSS
import 'materialize-css/dist/js/materialize.min.js'; //importing Materialize's JS components
import "../../public/styles/signUpForm.css";
import axios from "axios";

const serverURL = "http://localhost:3000"; //URL of where the server's being hosted

const SignUpForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // this is for hiding the input of the password
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(serverURL + "/signup", {
                email,
                password,
                firstName,
                lastName
            });
            console.log(response.data);
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    return(
        <div className="container">
            <form onSubmit={handleSignUp} className="col s12">
                <div className="row">
                    <div className="input-field col s12 m6 l6">
                        <input type="text" value={firstName} id="firstName" className="validate" onChange={(e) => setFirstName(e.target.value)}/>
                        <label htmlFor="firstName">First name</label>
                    </div>
                    <div className="input-field col s12 m6 l6">
                        <input type="text" value={lastName} id="lastName" className="validate" onChange={(e) => setLastName(e.target.value)}/>
                        <label htmlFor="lastName">Last name</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input type="email" value={email} id="email" className="validate" onChange={(e) => setEmail(e.target.value)}/>
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input type={showPassword ? "text": "password"} value={password}  name="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
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