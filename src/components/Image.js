import React, {useContext} from "react"
import PropTypes from "prop-types"

import useHover from "../hooks/useHover"

function Image({className, img, index, toggleModal, ...props}) {
    const [hovered, ref] = useHover()
    
    const animationDelay = index*100
    const imgSource = img.urls.small
    const altDescription = img.alt_description
    
    return (
        <div ref={ref} className={`${className} image-container`}>
            <img
                src={imgSource}
                alt={altDescription}
                className="image-grid"
                style={{animationDelay: `${animationDelay}ms`}}
                onClick={() => toggleModal(img)}
            />
        </div>
    )
}

Image.propTypes = {
    className: PropTypes.string,
    img: PropTypes.shape({
        id: PropTypes.string.isRequired,
        urls: PropTypes.object.isRequired
    })
}

export default Image