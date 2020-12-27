import React, {useState, useContext} from "react"
import {UnsplashContext} from "../UnsplashContext"
import LoadingAnimation from "./LoadingAnimation"

function ImageModal({photo, ...props}) {
	
	const {getPhoto, trackPhotoDownload} = useContext(UnsplashContext)
	const profileImg = photo.user.profile_image.small
	const name = photo.user.name
	const instagramUsername = photo.user.instagram_username
	const imgSource = photo.urls.regular
	const altDescription = photo.alt_description
	const description = photo.description
	const downloadUrl = photo.links.download
	const [isLoaded, setIsLoaded] = useState(false)
	
	function captureClick(event) {
		event.stopPropagation()
	}
	
	return (
		<div className="modal-container" onClick={() => props.toggleModal()}>
			<button className="close-button">+</button>
			<div className="modal-main" onClickCapture={captureClick}>
				
				<div className="modal-header">
					<img name="profile-image" src={profileImg} alt={name} />
					
					<div className="username-container">
						<h4 name="username">{name}</h4>
						<small name="instagram-username">@{instagramUsername}</small>
					</div>
					
					<a
						className="download-button"
						href={downloadUrl + "?force=true"}
						rel="nofollow"
						download
						target="_blank"
						onClickCapture={() => trackPhotoDownload(downloadUrl)}
					>
						Download
					</a>
				</div>
				
				<div className="image-container">
				{!isLoaded && <LoadingAnimation />}
					<img
						src={imgSource}
						alt={altDescription}
						onLoad={() => setIsLoaded(true)}
						style={{display: isLoaded? "block":"none"}}
					/>
				</div>
				<p name="description">{description}</p>
			</div>		
		</div>
	)
}

export default ImageModal