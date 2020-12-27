import React, {useState} from "react"
import { createApi } from "unsplash-js";

const UnsplashContext = React.createContext()

function UnsplashContextProvider({children}) {
	const [photos, setPhotos] = useState([])
	const [status, setStatus] = useState("processing") // "success", "processing", "failure"
	const [nextPage, setNextPage] = useState(1)
	const [query, setQuery] = useState({})
	const [totalResults, setTotalResults] = useState()
	
	const ACCESS_KEY = "bUjMIwmrI615OMtDrloYvWD454-JgyW0hzQhkUPbzNA"
	const API = createApi({ accessKey: ACCESS_KEY })
	
	const context = {
		photos,
		getPhotosList,
		searchPhotos,
		getNextPage,
		getPhoto,
		trackPhotoDownload,
		status
	}
	
	function getPhotosList() {
		console.log("Photos list...")
		setStatus("processing")
		setQuery({})
		setNextPage(1)
		setPhotos([])
		API.photos.list()
		.then(result => {
			console.log("Response: ", result.response)
			console.log("From list: ", result.response.results)
			setTotalResults(result.response.total)
			setPhotos(result.response.results)
			setNextPage(prev => prev + 1)
			setStatus("success")
		})
		.catch((result) => {
			console.log("From list: something went wrong! ", result)
			setStatus("failure")
		})
	}
	
	function searchPhotos(queryObject) {
		console.log("Searching photos: ", queryObject)
		setStatus("processing")
		setQuery(queryObject)
		setNextPage(1)
		setPhotos([])
		API.search.getPhotos(queryObject)
		.then(result => {
			console.log("From search: ", result.response.results)
			setTotalResults(result.response.total)
			setPhotos(result.response.results)
			setNextPage(prev => prev + 1)
			setStatus("success")
		})
		.catch(result => {
			console.log("From search: something went wrong! ", result)
			setStatus("failure")
		})
	}
	
	function getNextPage() {
		if (photos.length === totalResults) {
			console.log("No more results for this query: ", query)
			return
		}
		
		// If query is empty, get the next page from the list of photos
		if (Object.keys(query).length === 0) {
			console.log(`Getting next page (${nextPage}) of List...`)
			setStatus("processing")
			API.photos.list({page: nextPage})
			.then(result => {
				// Append results to current array of photos
				console.log("Next page from list: ", result.response.results)
				setPhotos(prev => [...prev, ...result.response.results])
				setStatus("success")
			})
			.catch((result) => {
				console.log("From list: something went wrong! ", result)
				setStatus("failure")
			})
		}
		
		// If query is not empty, get the next page from the last search
		else {
			console.log(`Getting next page (${nextPage}) of Search...`)
			setStatus("processing")
			const nextPageQuery = {...query, page: nextPage}
			console.log("Query: ", nextPageQuery)
			API.search.getPhotos(nextPageQuery)
			.then(result => {
				// Append results to current array of photos
				console.log("Next page from search: ", result.response.results)
				setPhotos(prev => [...prev, ...result.response.results])
				setStatus("success")
			})
			.catch(result => {
				console.log("From search: something went wrong! ", result)
				setStatus("failure")
			})
		}
		// Set to next page
		setNextPage(prev => prev + 1)
	}
	
	function getPhoto(id) {
		console.log(`Getting photo: ${id}`)
		setStatus("processing")
		API.photos.get({ photoId: id }).then(result => {
			if (result.type === 'success') {
				setStatus("success")
				console.log(`From photo ${id}: `, result.response)
				return result.response
			} else {
				console.log(`From photo ${id}: something went wrong!`, result)
				setStatus("failure")
				return null
			}
		});
	}
	
	function trackPhotoDownload(url) {
		console.log("tracking Download: ", url)
		API.photos.trackDownload({ downloadLocation: url });
	}
	
	return (
		<UnsplashContext.Provider value={context}>
			{children}
		</UnsplashContext.Provider>
	)
}

export {UnsplashContextProvider, UnsplashContext}
