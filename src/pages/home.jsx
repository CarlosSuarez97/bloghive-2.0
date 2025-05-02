//This is the page where everything from the user will be rendered once thet've logged in
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import Footer from "../components/footer";
import HeaderMainPage from '../components/headerMainPage';
import FAButton from '../components/FAButton';

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
        <div> {/*this is the card that will display the user's information*/}
            <div className="row">
                <div className="col s12 m12 l12">
                    <div className="card amber lighten-2">
                        <div className="card-content black-text">
                            <span className="card-title">Welcome, {user.user_first_name}</span>
                            <p>This is a simple placeholder text. All your posts will appear below this crad component</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <FAButton/>
        </>
    );
}

export default HomePage;