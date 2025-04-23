import React, {useState} from "react";
import axios from "axios";
import 'materialize-css/dist/css/materialize.min.css'; //importing Materialize CSS
import 'materialize-css/dist/js/materialize.min.js'; //importing Materialize's JS components
import "../../public/styles/loginForm.css"; //importing the custom CSS file for this component
import { useNavigate } from "react-router-dom";
import M from "materialize-css"; //importing what i need from materialize to make the popup message

const serverURL = "http://localhost:3000";

const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    
    const handleLogin = async (e) => {

        e.preventDefault();

        try {
            const response = await axios.post(serverURL + "/login", {
                email,
                password
            });
            if(response.data.success) {
                localStorage.setItem("token", response.data.token); //saving the token
                M.toast({html: response.data.message || "Correct!", classes: "red-darken-2"}).then(navigate("/home"));
                console.log(response.data.success);
            } else {
                M.toast({ html: response.data.message || 'Invalid credentials', classes: 'red darken-2' });
            }
        } catch (error) {
            console.error("Error: ", error);
        }

    }

    return(
        <div className="container">
            <form className="col s12" onSubmit={handleLogin}>
                <div className="row">
                    <div className="input-field col s12">
                        <input type="email" value={email} id="email" className="validate" onChange={(e) => setEmail(e.target.value)}/>
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input type={showPassword ? "text": "password"} name="password" value={password} id="password" onChange={(e) => setPassword(e.target.value)}/>
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
                        <button type="submit" className="btn-large waves-effect waves-light customButtons" id="submitButton">Log In</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;