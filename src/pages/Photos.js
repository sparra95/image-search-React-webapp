import React, {useState, useContext} from "react"

import {UnsplashContext} from "../UnsplashContext"
import SearchOptions from "../components/SearchOptions"
import Image from "../components/Image"
import ImageModal from "../components/ImageModal"
import {getClass} from "../utils"

function Photos() {
    const {photos} = useContext(UnsplashContext)
    const [showModal, setShowModal] = useState(false)
    const [selectedPhoto, setSelectedPhoto] = useState(null)
    
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
        setShowModal(prevBool => !prevBool)
        if (photoObject) setSelectedPhoto(photoObject)
    }
    
    return (
        <div className="PhotosComponentContainer">
            <SearchOptions />
            <main className="photos">
                {unsplashPhotoElements}
            </main>
            {showModal && <ImageModal toggleModal={toggleModal} img={selectedPhoto} />}
        </div>
    )
}

export default Photos