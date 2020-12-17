import React, {useContext} from "react"

import SearchOptions from "../components/SearchOptions"
import Image from "../components/Image"
import {getClass} from "../utils"

import {UnsplashContext} from "../UnsplashContext"

function Photos() {
    const {photos} = useContext(UnsplashContext)
    
    const unsplashImagesElements = photos.map((img, i) =>
        <Image key={img.id} img={img} className={getClass(i)} index={i} />
    )
    
    return (
        <div className="PhotosComponentContainer">
            <SearchOptions />
            <main className="photos">
                {unsplashImagesElements}
            </main>
        </div>
    )
}

export default Photos