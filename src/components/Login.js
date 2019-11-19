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
        .get("https://als-artportfolio.herokuapp.com/login",
            credentials
        )
        .then(response => {
            console.log(credentials);
            console.log("response", response);
            // const { data } = response;
            // sessionStorage.setItem("token", data.payload);
            // setLogged(true);
            // // once token is handeled, navigate to profile page
            // props.history.push("/profile-page");
        })
        .catch(err => {
            console.log(credentials);
            console.log("there was an error");
            console.log(err);
        })
    };

    const register = e => {
        e.preventDefault();
        axios
        .post("https://als-artportfolio.herokuapp.com/createnewuser", 
            credentials
        )
        .then(response => {
            console.log("response", response);
            // const { data } = response;
            // sessionStorage.setItem("token", data.payload);
            // setLogged(true);
            // // once token is handeled, navigate to profile page
            // props.history.push("/profile-page");
        })
        .catch(err => {
            console.log("there was an error");
            console.log(err);
        })
    }

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
            <form>
                <div className="input-div">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-div">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                </div>
                <button onClick={login}>Log in</button>
                <button onClick={register}>Register</button>
            </form>
        </div>
    </div>
    );
}


export default Login;
