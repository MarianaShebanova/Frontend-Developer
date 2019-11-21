
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function CharacterCard(props) {
    console.log("DATA");
    console.log(props.character);
    return (
        <div className="characterCard" key={props.character.userid}>
            <Link to={`/character/${props.character.userid}`}>
                <h5>Name: {props.character.firstname} {props.character.lastname}</h5>
                <h5>Age: {props.character.age}</h5>
                <h5>Location: {props.character.location}</h5>
                <h5>Email: {props.character.primaryemail}</h5>
                <h6>UserName {props.character.username} </h6>
                <img src={props.character.profilepicture}/> 
            </Link>
        </div>
    );
}
