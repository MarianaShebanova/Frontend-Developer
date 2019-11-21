import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import CharacterCard from "./CharacterCard";

// We create a mock list/array named Characters, from which display the list in our component.
const characters = [
    "Harry Potter",
    "Luna Lovegood",
    "Neville Longbottom",
    "Hermione Granger",
    "Ron Weasley",
    "Ginny Weasley",
    "Fred Weasley",
    "George Weasley",
    "Albus Dumbledore ",
    "Aberforth Dumbledore ",
    "Dudley Dursley ",
    "Petunia Dursley ",
    "Vernon Dursley",
    "Cornelius Fudge",
    "Rubeus Hagrid ",
    "Viktor Krum ",
    "Bellatrix Lestrange",
    "Narcissa Malfoy",
    "Draco Malfoy"
];
export default function Test(props) {
    // searchTerm will save the data from the search input on every occurance of the change event.
    const [searchTerm, setSearchTerm] = useState("");
    // searchResults is used to set the search result.
    const [searchResults, setSearchResults] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.
            get('https://rickandmortyapi.com/api/character/')
            .then(response => {
                setItems(response.data.results);
                console.log(response.data.results);
            });
        const results = items.filter(character =>
            character.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    }, [searchTerm]);
    // The handleChange method takes the event object as the arguement and sets the current value of the form to the searchTerm state using setSearchTerm
    const handleChange = e => {
        setSearchTerm(e.target.value);
    };
    return (
        <div className="App">
            <form>
                {/* We apply two-way data binding to the input field, which basically takes the value from the user and saves it into the state. */}
                {/* Two-way binding just means that:
        When properties in the model get updated, so does the UI.
        When UI elements get updated, the changes get propagated back to the model. */}
                <label htmlFor="name">Search:</label>
                <input
                    id="name"
                    type="text"
                    name="textfield"
                    placeholder="Search"
                    onChange={handleChange}
                    value={searchTerm}
                />
            </form>
            <div className="character-list">
                {searchResults.map(character => (
                    <CharacterCard character={character} />
                ))}
            </div>
        </div>
    );
}
