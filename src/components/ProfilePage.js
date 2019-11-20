import React, { useState, useEffect } from "react";
import {axiosWithAuth} from "./axiosWithAuth";

const defaultProfile = {
    username: "",
    email: "",
    photo: "",
    age: "",
    location: "",
    posts: [],
}

const ProfilePage = (props) => {
    const [profileData, setProfileData] = useState(defaultProfile);
    const [editProfile, setEditProfile] = useState(defaultProfile);
    const [editing, setEditing] = useState(false);
    
    // fetch the pofile data of the user when the component mounts
    // set the profile data to display the user's profile page

    useEffect(() => {
        axiosWithAuth().get(`https://als-artportfolio.herokuapp.com/users/users`)
        .then(response => {
            console.log(response);
        // setProfileData({
        //     username: response.data.username,
        //     email: response.data.email,
        //     photo: response.data.photo,
        //     age: response.data.age,
        //     location: response.data.location,
        //     posts: response.data.posts,
        // })
        })
        .catch(error => {
        console.log(error);
        })
    },[])

    const LogOut = () => {
        sessionStorage.removeItem("token");
        props.history.push("/");
    }

    const editMode = () => {
        if (!editing) {
            setEditing(true);
            setEditProfile(profileData);
        } else {
            axiosWithAuth().put(`http://localhost:5000/profile`,editProfile)
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
            setEditing(false);
        }
    }

    const updateEdit = e => {
        e.preventDefault();
        setEditProfile({
            ...editProfile,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div className="profile-div" style={{'textAlign':'center'}}>
            <button onClick={() => editMode()}>{!editing ? 'Edit Profile' : 'Submit'}</button>
            <h1>{profileData.username}</h1>
            <input name='username' value={editProfile.username} style={editing ? {'display': 'inline-block'} : {'display': 'none'}} onChange={updateEdit}></input><br />
            <img src={profileData.photo}></img><br />
            <input name='photo' value={editProfile.photo} style={editing ? {'display': 'inline-block'} : {'display': 'none'}} onChange={updateEdit}></input><br />
            <p>Email: {profileData.email}</p>
            <input name='email' value={editProfile.email} style={editing ? {'display': 'inline-block'} : {'display': 'none'}} onChange={updateEdit}></input><br />
            <p>Age: {profileData.age}</p>
            <input name='age' value={editProfile.age} style={editing ? {'display': 'inline-block'} : {'display': 'none'}} onChange={updateEdit}></input><br />
            <p>location: {profileData.location}</p>
            <input name='location' value={editProfile.location} style={editing ? {'display': 'inline-block'} : {'display': 'none'}} onChange={updateEdit}></input><br />
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
