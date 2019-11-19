import React, { useState, useEffect } from "react";
import {axiosWithAuth} from "./axiosWithAuth";

const ProfilePage = (props) => {
    const [profileData, setProfileData] = useState({
        username: "",
        email: "",
        photo: "",
        age: "",
        location: "",
        posts: [],
    });
    // fetch the pofile data of the user when the component mounts
    // set the profile data to display the user's profile page

    useEffect(() => {
        axiosWithAuth().get(`http://localhost:5000/profile`)
        .then(response => {
        setProfileData({
            username: response.data.username,
            email: response.data.email,
            photo: response.data.photo,
            age: response.data.age,
            location: response.data.location,
            posts: response.data.posts,
        })
        })
        .catch(error => {
        console.log(error);
        })
    },[])

    

    const LogOut = () => {
        sessionStorage.removeItem("token");
        props.history.push("/");
    }

    return (
        <div className="profile-div">
            <h1>{profileData.username}</h1>
            <img src={profileData.photo}></img>
            <p>Email: {profileData.email}</p>
            <p>Age: {profileData.age}</p>
            <p>location: {profileData.location}</p>
            <p>Your posts:</p>
            {profileData.posts.map(post => (
                <div>
                    <h2>{post.title}</h2>
                    <img src={post.img} style={{'width': '200px', 'height':'auto'}}></img>
                    <p>Posted on: {post.date}</p>
                    <p>Description: {post.description}</p>
                </div>
            ))}
            <button onClick={LogOut}>Log Out</button>
        </div>
    );
};

export default ProfilePage;
