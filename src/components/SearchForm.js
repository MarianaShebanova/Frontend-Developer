import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import CharacterCard from "./CharacterCard";

 export default function SearchForm(props) {
    // searchTerm will save the data from the search input on every occurance of the change event.
    const [searchTerm, setSearchTerm] = useState("");
    // searchResults is used to set the search result.
    const [searchResults, setSearchResults] = useState([]);
    console.log(props.items);
    useEffect(() => {
        console.log("called");
        const results = props.items.filter(character => character.username.toLowerCase().includes(searchTerm.toLowerCase()));
        setSearchResults(results);
    }, [searchTerm, props.items]);

    const handleChange = e => {
        setSearchTerm(e.target.value);
    };
    const [nameClass, setClass] = useState("");

     function handleClick(e) {
         e.preventDefault();
         if (e.target.name === "grid") {
             setClass("grid-view");    
         } else {
             setClass("column-view");    
         }
     }
    return (
        <div className="App">
            <form>
                <div className="search">
                <label htmlFor="name">Search:</label>
                <input
                    id="name"
                    type="text"
                    name="textfield"
                    placeholder="Search username"
                    onChange={handleChange}
                    value={searchTerm}
                />
                </div>
                <button type="submit" className="grid" name="grid" onClick={handleClick}>Grid</button>
                <button type="submit" className="column" name="column" onClick={handleClick}>Column</button>
            </form>
            <div className={nameClass}>
                {searchResults.map(character => (
                    <CharacterCard character={character} />
                ))}
            </div>
        </div>
    );
}

