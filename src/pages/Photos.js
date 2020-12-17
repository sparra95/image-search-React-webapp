import React, {useState, useContext} from "react"

import Image from "../components/Image"
import {UnsplashContext} from "../UnsplashContext"
import {getClass} from "../utils"

function Photos() {
    const {photos, searchPhotos} = useContext(UnsplashContext)
    const [query, setQuery] = useState("")
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(20)
    const [orientation, setOrientation] = useState("")
    const [color, setColor] = useState("")
    
    const queryObject = {
        query: query,
        page: page,
        per_page: perPage,
        orientation: orientation,
        color: color
    }
    
    const unsplashImagesElements = photos.map((img, i) =>
        <Image key={img.id} img={img} className={getClass(i)} index={i} />
    )
    
    function handleChange(event) {
        switch (event.target.name) {
            case "query":
                setQuery(event.target.value)
                break;
            case "page":
                setPage(event.target.value)
                break;
            case "perPage":
                setPerPage(event.target.value)
                break;
            case "orientation":
                setOrientation(event.target.value)
                break;
            case "color":
                setColor(event.target.value)
                break;
            default:
                break;
        }
        
    }
    
    function handleSubmit() {
        let newQueryObject = {...queryObject}
        
        for (const [key, value] of Object.entries(newQueryObject)) {
            if (value === "") {
                delete newQueryObject[key]
            }
        }
        
        console.log(newQueryObject)
        searchPhotos(newQueryObject)
    }
    
    // TODO
    // - add consts to evaluate before return() (ex: color select style object, search button disabled boolean)
    // - change names of classes and in styles.css
    // - show/hide advanced search panel onClick
    // - extract SearchOptions logic to separate Component
    
    return (
        <div>
            <div className="searchContainer">
                <div className="mainSearchOptions">
                    <input 
                        type="text"
                        name="query"
                        className="searchInput"
                        value={query}
                        onChange={handleChange}
                        placeholder="Search Unsplash Photos"
                    />
                    <button
                        className="searchSubmit"
                        onClick={() => handleSubmit()}
                        disabled={query===""}
                    >
                        Search
                    </button>
                </div>
                <button name="advOptionsBtn">Advanced Options</button>
                <div className="advancedSearchOptions">
                    <div>
                        <label>Page</label>
                        <input type="number" min={1} max={100} name="page" value={page} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Pics Per Page</label>
                        <input type="number" min={1} max={100} name="perPage" value={perPage} onChange={handleChange} />
                    </div>
                    
                    <div>
                        <label>Orientation</label>
                        <select name="orientation" value={orientation} onChange={handleChange}>
                            <option value=""></option>
                            <option value="portrait">Portrait</option>
                            <option value="landscape">Landscape</option>
                        </select>
                    </div>
                   
                    <div>
                        <label>Color</label>
                        <select name="color" value={color} onChange={handleChange} style={{backgroundColor: color===""? "white":color}}>
                            <option value=""></option>
                            <option value="black_and_white">Black and White</option>
                            <option value="black">Black</option>
                            <option value="white">White</option>
                            <option value="yellow">Yellow</option>
                            <option value="orange">Orange</option>
                            <option value="red">Red</option>
                            <option value="purple">Purple</option>
                            <option value="magenta">Magenta</option>
                            <option value="green">Green</option>
                            <option value="teal">Teal</option>
                            <option value="blue">Blue</option>
                        </select>
                    </div>
                    
                </div>
            </div>
            
            <main className="photos">
                {unsplashImagesElements}
            </main>
        </div>
    )
}

export default Photos