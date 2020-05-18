import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchForm from "./SearchForm";

export default function CharacterList() {
    // TODO: Add useState to track data from useEffect
    const [items, setItems] = useState([]);
    useEffect(() => { 
        // TODO: Add API Request here - must run in `useEffect`
        //  Important: verify the 2nd `useEffect` 
        //  parameter: the dependancies array!
        axios.
            get('http://als-artportfolio.herokuapp.com/users/users/')
            .then(response => {
                console.log("calling items");
                setItems(response.data);
            })
    }, []);

    return (
        <section className="character-list">
            <SearchForm items = {items}/>
        </section>
    );
}