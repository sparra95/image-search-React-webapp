import React, {useState, useEffect} from "react"
import { createApi } from "unsplash-js";

const UnsplashContext = React.createContext()

function UnsplashContextProvider({children}) {
	const [photos, setPhotos] = useState([])
	
	const ACCESS_KEY = "bUjMIwmrI615OMtDrloYvWD454-JgyW0hzQhkUPbzNA"
	const API = createApi({ accessKey: ACCESS_KEY });
	
	useEffect(function() {
		API.search.getPhotos({ query: "dog", per_page: 30 })
		.then(result => {
			console.log(result.response.results)
			setPhotos(result.response.results)
		})
		.catch((result) => {
			console.log("something went wrong!");
			console.log(result.errors)
		});
	}, [])
	
	function searchPhotos(searchTerm) {
		API.search.getPhotos({ query: searchTerm, per_page: 30 })
		.then(result => {
			setPhotos(result.response.results)
		}).
		catch(result => {
			console.log("something went wrong!");
			console.log(result.errors)
		})
	}
	
	return (
		<UnsplashContext.Provider value={{photos, searchPhotos}}>
			{children}
		</UnsplashContext.Provider>
	)
}

export {UnsplashContextProvider, UnsplashContext}
