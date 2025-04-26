//This is the page where everything from the user will be rendered once thet've logged in
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import Footer from "../components/footer";
import HeaderMainPage from '../components/headerMainPage';
//import for the custom CSS for the page goes here

const HomePage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            axios.get("http://localhost:3000/home", {
                headers: {
                    Authorization: `Bearer ${token}` // 🪪 send the token
                }
            })
            .then(res => {
                if (res.data.success) {
                    setUser(res.data.user); // 🧑 set user data
                } else {
                    console.error("Failed to fetch user info");
                }
            })
            .catch(err => {
                console.error("Error fetching user info:", err);
            });
        }
    }, []);

    if (!user) return <p>Loading...</p>;

    return (
        <>
        <HeaderMainPage/>
        <div className="container">
            <h4>Welcome, {user.user_first_name} {user.user_last_name}!</h4>
            <p>Email: {user.user_email}</p>
        </div>
        </>
    );
}

export default HomePage;