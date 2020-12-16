import React, {useState, useContext} from "react"

import Image from "../components/Image"
import {UnsplashContext} from "../UnsplashContext"
import {getClass} from "../utils"

function Photos() {
    const {photos, searchPhotos} = useContext(UnsplashContext)
    const [searchText, setSearchText] = useState("")
    
    const unsplashImagesElements = photos.map((img, i) =>
        <Image key={img.id} img={img} className={getClass(i)} />
    )
    
    function handleChange(event) {
        setSearchText(event.target.value)
    }
    
    function handleSubmit(query) {
        searchPhotos(query)
        setSearchText("")
    }
    
    return (
        <div>
            <div className="searchContainer">
                <input 
                    type="text"
                    name="search"
                    className="searchInput"
                    value={searchText}
                    onChange={handleChange}
                    placeholder="Search Unsplash Photos"
                />
                <button
                    className="searchSubmit"
                    onClick={() => handleSubmit(searchText)}
                    disabled={searchText===""}
                >
                    Search
                </button>
            </div>
            
            <main className="photos">
                {unsplashImagesElements}
            </main>
        </div>
    )
}

export default Photos