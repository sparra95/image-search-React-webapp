import React, {useState, useEffect, useContext} from "react"
import {useParams, useLocation} from "react-router-dom"

import SearchOptions from "../components/SearchOptions"
import Image from "../components/Image"
import ImageModal from "../components/ImageModal"
import LoadingAnimation from "../components/LoadingAnimation"

import {UnsplashContext} from "../UnsplashContext"
import {getClass} from "../utils"

function Photos(props) {
    const params = useParams()
    const location = useLocation()
    const [query, setQuery] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [selectedPhoto, setSelectedPhoto] = useState(null)  
    const {photos, getPhotos, searchPhotos, getNextPage, status} = useContext(UnsplashContext)
    
    // Detect route changes
    useEffect(() => {
        // If route is home, we  get latest photos from API
        if (location.pathname === "/") {
            setQuery({})
            getPhotos()
        }
        // Otherwise route is "/search", compare to current state and call new query if not equal
        else {
            // Create to separate, mutable query object
            let newQueryObject = {...params}
            // If query parameters exist, add to object as key/value pairs
            if (location.search.length > 0) {
                // Parse query string and convert to array
                let queryParams = location.search.replace(/\?/g, "").replace(/&|=/g, " ").split(" ")
                // Use array to add to object as key/value pairs
                for (let i=0; i < queryParams.length;) 
                    newQueryObject[queryParams[i++]] = queryParams[i++]
            }
            
            let match = true
            // Compare number of keys of both query objects
            if (Object.keys(newQueryObject).length === Object.keys(query).length) {
                // Compare key/value pairs of both objects
                for (const [key, value] of Object.entries(newQueryObject)) {
                    if (query[key] === null || query[key] === undefined || query[key] !== value) {
                        match = false
                        break
                    }
                }
            } else { match = false }
            
            // If key/values don't match, call for new search
            if (!match) {
                setQuery(newQueryObject)
                searchPhotos(newQueryObject)
            }
        }
        
    }, [location])
    
    // Scroll event listening
    useEffect(() => {
        window.addEventListener("scroll", handleScroll, true)
        return () => { window.removeEventListener("scroll", handleScroll, true) }
    })
    
    // Call and load next page of search results when we've reached the bottom of the page
    function handleScroll() {
        const bottom = window.pageYOffset + window.innerHeight === window.document.body.clientHeight
        if (bottom) {
            if (status === "success") getNextPage()
        }
    }
    
    // Create React components from search results
    const unsplashPhotoElements = photos.map((photo, i) => 
        <Image
            key={photo.id}
            img={photo}
            className={getClass(i)}
            index={i}
            toggleModal={toggleModal}
        />
    )
    
    function toggleModal(photoObject) {
        // If arg is passed, assume we want modal to show
        if (photoObject) {
            setSelectedPhoto(photoObject)
            setShowModal(true)
        } else {
            setShowModal(false)
        }
    }
    
    function displayModal() {
        if (showModal)
            return <ImageModal toggleModal={toggleModal} photo={selectedPhoto} />
    }
    
    // Display loading animation
    function displayStatus() {
        if (status==="processing") return <LoadingAnimation />
        else if (status==="failure") return <p>No results found</p>
        else return null
    }
    
    return (
        <div>
            <SearchOptions />
            <main className="photos">
                {unsplashPhotoElements}
            </main>
            {displayStatus()}
            {displayModal()}
            
        </div>
    )
}

export default Photos