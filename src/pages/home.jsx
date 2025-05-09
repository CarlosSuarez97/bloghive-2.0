//This is the page where everything from the user will be rendered once thet've logged in
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import Footer from "../components/footer";
import HeaderMainPage from '../components/headerMainPage';
import FAButton from '../components/FAButton';
import PostCard from '../components/postCard';
import { useNavigate } from 'react-router-dom';



const HomePage = () => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);
    const navigate = useNavigate();

    const fetchUserInfo = () => {
        const token = localStorage.getItem("token");

        if (token) {
            axios.get("http://localhost:3000/home", {
                headers: {
                    Authorization: `Bearer ${token}` // send the token
                }
            })
            .then(res => {
                if (res.data.success) {
                    setUser(res.data.user); // set user data
                    setPosts(res.data.postCount);
                } else {
                    console.error("Failed to fetch user info");
                }
            })
            .catch(err => {
                console.error("Error fetching user info:", err);
            });
        }
    }

    useEffect(() => {
        fetchUserInfo();
    }, []);

    useEffect(() => {
        if (user === null && localStorage.getItem("token")) {
            // Do nothing, waiting for token check
        } else if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    if (!user) return null;

    return (
        <>
        <HeaderMainPage/>
        {/*this is the card that will display the user's information*/}
        <div>
            <div className="row">
                <div className="col s12 m12 l12">
                    <div className="card amber lighten-2">
                        <div className="card-content black-text">
                            <div className="row">
                                <div className="col m12 s12 l12">
                                    <h3>Welcome, {user.user_first_name}</h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col l6 m6 s12">
                                    <h5>Posts: {posts}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <PostCard onUpdate={fetchUserInfo}/>
            </div>
        </div>
        <FAButton/>
        <Footer/>
        </>
    );
}

export default HomePage;