import React, { useState, useEffect } from "react";
import axios from 'axios';

const Login = (props) => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    })
    const [isLoggedIn, setLogged] = useState(false);

    const handleChange = e => {
        e.preventDefault();
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const login = e => {
        // post request to retrieve a token from the backend
        e.preventDefault();
        axios
        .post(
            "http://localhost:5000/login",
            credentials
        )
        .then(response => {
            console.log("response", response);
            const { data } = response;
            sessionStorage.setItem("token", data.payload);
            setLogged(true);
            // once token is handeled, navigate to profile page
            props.history.push("/profile-page");
        })
        .catch(err => {
            console.log("there was an error");
            console.log(err);
        })
    };

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
        setLogged(true);
        } else {
        setLogged(false);
        }
    },[]);

    return (
    <div className="home-page">
        <h1>Welcome to the Art Portfolio</h1>
        <div className="login-form">
            <h2>{isLoggedIn ? "LOGGED IN!" : "Please login"}</h2>
            <form onSubmit={login}>
                <div className="input-div">
                    <label htmlFor="username">Username:</label>
                    <input className="titleStyles"
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-div">
                    <label htmlFor="password">Password:</label>
                    <input className="titleStyles"
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                </div>
                <button className="postButton">Log in</button>
            </form>
        </div>
    </div>
    );
}


export default Login;
