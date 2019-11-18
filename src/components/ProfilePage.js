import React, { useState, useEffect } from "react";
import {axiosWithAuth} from "./axiosWithAuth";

const ProfilePage = (props) => {
    const [profileData, setProfileData] = useState({
        username: "",
        age: "",
        location: "",
        posts: [],
    });
    // fetch the pofile data of the user when the component mounts
    // set the profile data to display the user's profile page

    // useEffect(() => {
    //     axiosWithAuth().get(`http://localhost:5000/profile`)
    //     .then(response => {
    //     console.log(response);
    //     setColorList(response.data);
    //     })
    //     .catch(error => {
    //     console.log(error);
    //     })
    // },[])

    const LogOut = () => {
        sessionStorage.removeItem("token");
        props.history.push("/");
    }

    return (
        <div className="profile-div">
            <h1>Welcome to your profile!</h1>
            <button onClick={LogOut}>Log Out</button>
        </div>
    );
};

export default ProfilePage;
