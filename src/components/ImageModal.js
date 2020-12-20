import React, {useEffect, useContext} from "react"
import {UnsplashContext} from "../UnsplashContext"
import PropTypes from "prop-types"

function ImageModal({img, toggleModal, ...props}) {
	
	const {getPhoto, trackPhotoDownload} = useContext(UnsplashContext)
	const ID = img.id
	const NAME = img.user.name
	const ALT_DESCRIPTION = img.alt_description
	const DESCRIPTION = img.description
	const IMG_SOURCE = img.urls.regular
	const DOWNLOAD_URL = img.links.download || img.links.download_location
	
	// On mount, call API to get photo and all it's info
	// useEffect(function() { getPhoto(ID) }, [])
	
	function captureClick(event) {
		event.stopPropagation()
	}
	
	return (
		<div className="modal-container" onClick={() => toggleModal()}>
			<button className="close-button">+</button>
			<div className="modal-main" onClickCapture={captureClick}>
				
				<div className="modal-header">
					<img name="profile-image" src={img.user.profile_image.small} alt={NAME} />
					
					<div className="username-container">
						<h4 name="username">{NAME}</h4>
						<small name="instagram-username">@{img.user.instagram_username}</small>
					</div>
					
					<a
						className="download-button"
						href={DOWNLOAD_URL + "?force=true"}
						rel="nofollow"
						download
						target="_blank"
						onClickCapture={() => trackPhotoDownload(DOWNLOAD_URL)}
					>
						Download
					</a>
				</div>
				
				<div className="image-container">
					<img src={IMG_SOURCE} alt={ALT_DESCRIPTION} />
				</div>
				
				{DESCRIPTION && <small name="description">{DESCRIPTION}</small>}
			</div>		
		</div>
	)
}

ImageModal.propTypes = {
	toggleModal: PropTypes.func.isRequired,
	img: PropTypes.shape({
		id: PropTypes.string.isRequired,
		urls: PropTypes.object.isRequired,
		alt_description: PropTypes.string,
		description: PropTypes.string,
		color: PropTypes.string,
		links: PropTypes.shape({
			download: PropTypes.string
			}),
		user: PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string,
			bio: PropTypes.string,
			location: PropTypes.string
			}).isRequired
	}).isRequired
}

export default ImageModal