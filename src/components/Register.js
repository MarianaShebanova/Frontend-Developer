import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';

const Register = (props) => {
    const Dispatch = useDispatch();
    const [credentials, setCredentials] = useState({
        firstname: "",
        lastname: "",
        username: "",
        primaryemail: "",
        profilepicture: "",
        age: "",
        location: "",
    })

    const handleChange = e => {
        e.preventDefault();
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const register = e => {
        e.preventDefault();
        console.log(credentials);
        axios
        .post(`https://als-artportfolio.herokuapp.com/createnewuser/`, 
            credentials, 
            // {
            //     "profilepicture": "www.piicture.com",
            //     "username": "findme2",
            //     "password": "password",
            //     "primaryemail": "gmai5d45fl2@gmail.com",
            //     "firstname": "Albert",
            //     "lastname": "Yakubov",
            //     "age": 10,
            //     "location": "somewhere in the world"
            // },
            // {
            //     headers: {
            //         Authorization: `Basic ${btoa('lambda-client:lambda-secret')}`,
            //         'Content-Type': 'application/x-www-form-urlencoded'
            //     }
            // },
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

    const goToLogin = e => {
        e.preventDefault();
        props.history.push("/");
    }

    return (
    <div className="home-page">
        <h1>Please Register Below:</h1>
        <div className="registration-form">
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
                <div className="input-div">
                    <label htmlFor="primaryemail">Email:</label>
                    <input
                        type="email"
                        name="primaryemail"
                        value={credentials.primaryemail}
                        onChange={handleChange}
                    />
                </div>
                <br />
                <button onClick={register}>Register</button>
                <p>Already have an account?</p>
                <button onClick={goToLogin}>Click here to login</button>
            </form>
        </div>
    </div>
    );
}

const mapStateToProps = state => ({
    loggedInUser: state.loggedInUser,
  });


export default connect(
    mapStateToProps,
)(Register);
