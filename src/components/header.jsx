import React, {useEffect, useRef} from "react";
import 'materialize-css/dist/css/materialize.min.css'; //importing Materialize CSS
import 'materialize-css/dist/js/materialize.min.js'; //importing Materialize's JS components
import { useNavigate } from "react-router-dom";
import "../../public/styles/header.css";
import M from "materialize-css";



const Header = () => {
    const navigate = useNavigate();
    const sidenavRef = useRef(null);
    useEffect(() => {
        M.Sidenav.init(sidenavRef.current, {edge: "left", draggable: true});
    }, []);
    const handleNav = (path) => {
        navigate(path);
        const sidenavInstance = M.Sidenav.getInstance(sidenavRef.current);
        sidenavInstance.close();
    }
    return(
        <>
        <div className="navbar-fixed">
        <nav>
            <div className="nav-wrapper customNavbar">
                <a onClick={() => navigate("/")} className="brand-logo rubik-semibold navbarLogo">BlogHive</a>
                <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                <ul className="right hide-on-med-and-down">
                    <li><a onClick={() => {navigate("/signup")}} className="rubik-regular">Sign Up</a></li>
                    <li><a onClick={() => {navigate("/login")}} className="rubik-regular">Log In</a></li>
                </ul>
            </div>
        </nav>
        </div>
        <ul className="sidenav customSidenavbar" id="mobile-demo" ref={sidenavRef}>
            <li><a onClick={() => {handleNav("/signup")}} className="rubik-regular customNavbar btn waves-effect waves-light">Sign Up</a></li>
            <li><a onClick={() => {handleNav("/login")}} className="rubik-regular customNavbar btn waves-effect waves-light">Log In</a></li>
        </ul>
        </>
    )
}

export default Header;