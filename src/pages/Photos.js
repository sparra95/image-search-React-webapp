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
    const [search, setSearch] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [selectedPhoto, setSelectedPhoto] = useState(null)  
    const {photos, getPhotosList, searchPhotos, getNextPage, status} = useContext(UnsplashContext)
    
    // Detect route changes
    useEffect(() => {
        // If we're home, we  get latest photos from API
        if (location.pathname === "/") {
            setSearch({})
            getPhotosList()
        }
        // Otherwise we are in "/search", compare to previous search params and call new search if they are different
        else {
            // Create to separate query object to mutate 
            let newQueryObject = {...params}
            // If query parameters exist, add to object as key/value pairs
            if (location.search.length > 0) {
                let queryParams = location.search.replace(/\?/g, "").replace(/&|=/g, " ").split(" ")
                for (let i=0; i < queryParams.length;) 
                    newQueryObject[queryParams[i++]] = queryParams[i++]
            }
            
            let match = true
            // Compare number of keys of new searchObject and current searchObject
            if (Object.keys(newQueryObject).length === Object.keys(search).length) {
                // Compare each new searchObject key/value with current searchObject key/value
                for (const [key, value] of Object.entries(newQueryObject)) {
                    if (search[key] === null || search[key] === undefined || search[key] !== value) {
                        match = false
                        break
                    }
                }
            } else { match = false }
            
            // If key/values don't match, call for new search
            if (!match) {
                setSearch(newQueryObject)
                searchPhotos(newQueryObject)
            }
        }
        
    }, [location])
    
    useEffect(() => {
        window.addEventListener("scroll", handleScroll, true)
        return () => { window.removeEventListener("scroll", handleScroll, true) }
    })
    
    function handleScroll() {
        const bottom = window.pageYOffset + window.innerHeight === window.document.body.clientHeight
        if (bottom) {
            console.log("Bottom reached!")
            if (status === "success") getNextPage()
        }
    }
    
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
    
    function displayStatus() {
        if (status==="processing" || photos === []) return <LoadingAnimation />
        else if (status==="failure") return <p>No results found</p>
        else return null
    }
    
    return (
        <div className="PhotosComponentContainer">
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