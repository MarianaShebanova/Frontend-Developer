import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "./axiosWithAuth";
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';

const defaultProfile = {
    firstname: "",
    lastname: "",
    username: "",
    primaryemail: "",
    profilepicture: "",
    age: "",
    location: "",
    arts: [],
}

const ProfilePage = (props) => {
    const [profileData, setProfileData] = useState(defaultProfile);
    const [editProfile, setEditProfile] = useState(defaultProfile);
    const [editing, setEditing] = useState(false);
    const [userID, setID] = useState("");
    const Dispatch = useDispatch();

    const clearLoggedInUser = () => {
        sessionStorage.removeItem('logged-user');
        Dispatch({ type: "SET_LOGGED", payload: ""});
    }
    
    // fetch the pofile data of the user when the component mounts
    // set the profile data to display the user's profile page

    const getProfileData = () => {
        axiosWithAuth().get(`https://als-artportfolio.herokuapp.com/users/users/`)
        .then(response => {
            console.log(response);
            const userInfo = response.data.filter(function (user) {return user.username === props.loggedInUser})[0];
            setProfileData({
                firstname: userInfo.firstname,
                lastname: userInfo.lastname,
                username: userInfo.username,
                primaryemail: userInfo.primaryemail,
                profilepicture: userInfo.profilepicture,
                age: userInfo.age,
                location: userInfo.location,
                arts: userInfo.arts,
            });
            setID(userInfo.userid);
        })
        .catch(error => {
        console.log(error);
        })
    }

    useEffect(() => {
        getProfileData();
    },[])

    console.log("This is the ID", userID);

    const LogOut = () => {
        clearLoggedInUser();
        sessionStorage.removeItem("token");
        props.history.push("/");
    }

    const deleteProfile = () => {
        clearLoggedInUser();
        sessionStorage.removeItem("token");

        // Delete request for profile
        axiosWithAuth().delete(`https://als-artportfolio.herokuapp.com/users/user/${userID}`)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
        
        // Return to home page
        props.history.push("/");
    }

    const editMode = () => {
        if (!editing) {
            setEditing(true);
            setEditProfile(profileData);
        } else {
            axiosWithAuth().put(`https://als-artportfolio.herokuapp.com/users/user/${userID}`,editProfile)
            .then(response => {
                console.log(response);
                getProfileData();
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
            <button onClick={() => editMode()}>{!editing ? 'Edit Profile' : 'Submit Edits'}</button>
            <h1>{profileData.firstname} {profileData.lastname}</h1>
            <input name='firstname' value={editProfile.firstname} style={editing ? {'display': 'inline-block'} : {'display': 'none'}} onChange={updateEdit}></input>
            <input name='lastname' value={editProfile.lastname} style={editing ? {'display': 'inline-block'} : {'display': 'none'}} onChange={updateEdit}></input>
            <h2>Username: {profileData.username}</h2>
            <input name='username' value={editProfile.username} style={editing ? {'display': 'inline-block'} : {'display': 'none'}} onChange={updateEdit}></input><br />
            <img src={profileData.profilepicture}></img><br />
            <input name='profilepicture' value={editProfile.profilepicture} style={editing ? {'display': 'inline-block'} : {'display': 'none'}} onChange={updateEdit}></input><br />
            <p>Email: {profileData.primaryemail}</p>
            <input name='primaryemail' value={editProfile.primaryemail} style={editing ? {'display': 'inline-block'} : {'display': 'none'}} onChange={updateEdit}></input><br />
            <p>Age: {profileData.age}</p>
            <input name='age' value={editProfile.age} style={editing ? {'display': 'inline-block'} : {'display': 'none'}} onChange={updateEdit}></input><br />
            <p>location: {profileData.location}</p>
            <input name='location' value={editProfile.location} style={editing ? {'display': 'inline-block'} : {'display': 'none'}} onChange={updateEdit}></input><br />
            <button>Add Art</button><br />
            <p>Your posts:</p>
            {profileData.arts.map(post => (
                <div>
                    <h2>{post.title}</h2>
                    <img src={post.img} style={{'width': '200px', 'height':'auto'}}></img>
                    <p>Posted on: {post.date}</p>
                    <p>Description: {post.description}</p>
                </div>
            ))}
            <button onClick={LogOut}>Log Out</button>
            <br /><br />
            <button onClick={deleteProfile} style={{'background-color':'red', 'color':'white'}}>Delete Profile</button>
        </div>
    );
};

const mapStateToProps = state => ({
    loggedInUser: state.loggedInUser,
});

export default connect(
    mapStateToProps,
)(ProfilePage);
