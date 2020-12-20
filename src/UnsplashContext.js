import React, {useState, useEffect} from "react"
import { createApi } from "unsplash-js";

const UnsplashContext = React.createContext()

function UnsplashContextProvider({children}) {
	const [photos, setPhotos] = useState([])
	
	const ACCESS_KEY = "bUjMIwmrI615OMtDrloYvWD454-JgyW0hzQhkUPbzNA"
	const API = createApi({ accessKey: ACCESS_KEY });
	
	useEffect(function() {
		API.photos.list({ per_page: 30 })
		.then(result => {
			console.log(result.response.results)
			setPhotos(result.response.results)
		})
		.catch((result) => {
			console.log("something went wrong!");
			console.log(result)
		});
	}, [])
	
	function searchPhotos(queryObject) {
		console.log(queryObject)
		
		API.search.getPhotos(queryObject)
		.then(result => {
			console.log(result.response.results)
			setPhotos(result.response.results)
		}).
		catch(result => {
			console.log("something went wrong!");
			console.log(result.errors)
		})
	}
	
	function getPhoto(id) {
		console.log("Getting photo by ID...")
		API.photos.get({ photoId: id }).then(result => {
			if (result.type === 'success') {
				console.log("Success!")
				const photo = result.response;
				console.log(photo)
				return photo
			}
		});
	}
	
	function trackPhotoDownload(url) {
		console.log("Tracking Download...")
		API.photos.trackDownload({
			downloadLocation: url,
		});
	}
	
	return (
		<UnsplashContext.Provider value={{photos, searchPhotos, getPhoto, trackPhotoDownload}}>
			{children}
		</UnsplashContext.Provider>
	)
}

export {UnsplashContextProvider, UnsplashContext}
