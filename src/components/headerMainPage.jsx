import React, {useEffect, useRef} from "react";
import 'materialize-css/dist/css/materialize.min.css'; //importing Materialize CSS
import 'materialize-css/dist/js/materialize.min.js'; //importing Materialize's JS components
import { useNavigate } from "react-router-dom";
import "../../public/styles/header.css";
import M from "materialize-css";



const HeaderMainPage = () => {

    const navigate = useNavigate();
    const sidenavRef = useRef(null);
    useEffect(() => {
        M.Sidenav.init(sidenavRef.current, {edge: "left", draggable: true});
    }, []);
    const handleLogout = () => {
        if(localStorage.getItem("token")) {
            localStorage.removeItem("token");
            navigate("/");
        } else if (!localStorage.getItem("token")) {
            console.log("There's no user logged in currently");
        }
    }
    return(
        <>
        <div className="navbar-fixed">
        <nav>
            <div className="nav-wrapper customNavbar">
                <a onClick={() => navigate("/")} className="brand-logo rubik-semibold navbarLogo">BlogHive</a>
                <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                <ul className="right hide-on-med-and-down">
                    <li><a onClick={handleLogout} className="rubik-regular">Log Out</a></li>
                </ul>
            </div>
        </nav>
        </div>
        <ul className="sidenav customSidenavbar" id="mobile-demo" ref={sidenavRef}>
            <li><a className="rubik-regular customNavbar btn waves-effect waves-light">Log Out</a></li>
        </ul>
        </>
    )
}

export default HeaderMainPage;