import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterCard from "./CharacterCard";

const Card = (props) => {
    const [character, setCharacter] = useState();
    useEffect(() => {
        const id = props.match.params.id;
        // change ^^^ that line and grab the id from the URL
        // You will NEED to add a dependency array to this effect hook
        
        axios
            .get(`http://als-artportfolio.herokuapp.com/users/user/${id}`)
            .then(response => {
                setCharacter(response.data);
            })
            .catch(error => {
                console.error(error);
            });

    }, []);

    if (!character) {
        return <div>Loading portfolio information...</div>;
    }
    return <div className="card">
    <CharacterCard character={character} />;
    </div>
}

export default Card;
