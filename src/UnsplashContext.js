import React, {useState} from "react"
import { createApi } from "unsplash-js";

const UnsplashContext = React.createContext()

function UnsplashContextProvider({children}) {
	const [photos, setPhotos] = useState([])
	const [status, setStatus] = useState("success") // "success", "processing", "failure"
	const [nextPage, setNextPage] = useState(1)
	const [query, setQuery] = useState({})
	const [totalResults, setTotalResults] = useState()
	const perPage = window.innerWidth > 1400? 25 : 10
	
	const DEBUG = false
	const ACCESS_KEY = "bUjMIwmrI615OMtDrloYvWD454-JgyW0hzQhkUPbzNA"
	const API = createApi({ accessKey: ACCESS_KEY })
	
	const context = {
		photos,
		getPhotos,
		searchPhotos,
		getNextPage,
		getPhoto,
		trackPhotoDownload,
		status
	}
	
	function getPhotos() {
		if (DEBUG) console.log("Photos list...")
		
		// New search: reset state
		setStatus("processing")
		setQuery({})
		setNextPage(1)
		setPhotos([])
		
		API.photos.list({page: 1, perPage: perPage})
		.then(result => {
			if (DEBUG) console.log("Response: ", result.response)
			if (DEBUG) console.log("From list: ", result.response.results)
			
			// Success: save new data to state
			setTotalResults(result.response.total)
			setPhotos(result.response.results)
			setNextPage(prev => prev + 1)
			setStatus("success")
		})
		.catch((result) => {
			// Failure: show error
			console.log("From list: something went wrong! ", result)
			setStatus("failure")
		})
	}
	
	function searchPhotos(queryObject) {
		queryObject["per_page"] = perPage
		
		if (DEBUG) console.log("Searching photos: ", queryObject)
		
		// New search: reset state and set query
		setStatus("processing")
		setQuery(queryObject)
		setNextPage(1)
		setPhotos([])
		
		API.search.getPhotos(queryObject)
		.then(result => {
			if (DEBUG) console.log("Response: ", result.response)
			if (DEBUG) console.log("From search: ", result.response.results)
			
			// Success: save new data to state
			setTotalResults(result.response.total)
			setPhotos(result.response.results)
			setNextPage(prev => prev + 1)
			setStatus("success")
		})
		.catch(result => {
			// Failure: show error
			console.log("From search: something went wrong! ", result)
			setStatus("failure")
		})
	}
	
	function getNextPage() {
		// If all matches are already retrieved for this query, return immediately
		if (photos.length === totalResults) {
			if (DEBUG) console.log("No more results for this query: ", query)
			return
		}
		
		// If query is empty, get the next page from the list of photos
		if (Object.keys(query).length === 0) {
			if (DEBUG) console.log(`Getting next page (${nextPage}) of List...`)
			setStatus("processing")
			
			API.photos.list({page: nextPage, perPage: perPage})
			.then(result => {
				if (DEBUG) console.log("Next page from list: ", result.response.results)
				
				// Success: append results to current array of photos
				setPhotos(prev => [...prev, ...result.response.results])
				setStatus("success")
			})
			.catch((result) => {
				// Failure: show error
				console.log("From list: something went wrong! ", result)
				setStatus("failure")
			})
		}
		// If query is not empty, get the next page from the last search
		else {
			setStatus("processing")
			const nextPageQuery = {...query, page: nextPage, perPage: perPage}
			
			if (DEBUG) console.log(`Getting next page (${nextPage}) of Search...`)
			if (DEBUG) console.log("Query: ", nextPageQuery)
			
			API.search.getPhotos(nextPageQuery)
			.then(result => {
				if (DEBUG) console.log("Next page from search: ", result.response.results)
				
				// Success: append results to current array of photos
				setPhotos(prev => [...prev, ...result.response.results])
				setStatus("success")
			})
			.catch(result => {
				// Failure: show error
				console.log("From search: something went wrong! ", result)
				setStatus("failure")
			})
		}
		// Set to next page
		setNextPage(prev => prev + 1)
	}
	
	// Returns all data on a specific photo by id
	function getPhoto(id) {
		if (DEBUG) console.log(`Getting photo: ${id}`)
		setStatus("processing")
		API.photos.get({ photoId: id }).then(result => {
			// Success: return photo object
			if (result.type === 'success') {
				if (DEBUG) console.log(`From photo ${id}: `, result.response)
				
				setStatus("success")
				return result.response
			}
			// Failure: return null, show error
			else {
				console.log(`From photo ${id}: something went wrong!`, result)
				setStatus("failure")
				return null
			}
		});
	}
	
	// Notifies Unsplash that a photo was downloaded
	function trackPhotoDownload(url) {
		if (DEBUG) console.log("tracking Download: ", url)
		API.photos.trackDownload({ downloadLocation: url });
	}
	
	return (
		<UnsplashContext.Provider value={context}>
			{children}
		</UnsplashContext.Provider>
	)
}

export {UnsplashContextProvider, UnsplashContext}
