import React, {useState, useEffect, useContext} from "react"
import {useHistory, useLocation} from "react-router-dom"
import {UnsplashContext} from "../UnsplashContext"

function SearchOptions() {
	const {searchPhotos} = useContext(UnsplashContext)
	
	const history = useHistory()
	const location = useLocation()
    const [query, setQuery] = useState("")
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [orientation, setOrientation] = useState("")
    const [color, setColor] = useState("")  
    const [extraOpts, setExtraOpts] = useState(true)
    
    const queryObject = {
        page: page,
        per_page: perPage,
        orientation: orientation,
        color: color
    }
	
	useEffect(() => {
		if (location.pathname === "/") {
			setQuery("")
			setPage(1)
			setPerPage(10)
			setOrientation("")
			setColor("")
		}
	}, [location])
	
	function colorBtnStyles() {
		let bgColor = "white"
		let fontColor = "white"
		
		if (color === "") {fontColor = "black"}
		// If color is selected, change button background color
		if (color !== "") { bgColor = color }
		// If color is light, use dark font color
		if (color === "white" || color === "yellow") { fontColor = "black" }
		
		return ({
			backgroundColor: bgColor,
			color: fontColor
		})
	}
	
	function displayExtraOpts() {
		return (extraOpts? "" : "hidden")
	}
    
    function handleChange(event) {
		switch (event.target.name) {
            case "query":
                setQuery(event.target.value)
                break;
            case "page":
                setPage(event.target.value)
                break;
            case "perPage":
                setPerPage(event.target.value)
                break;
            case "orientation":
                setOrientation(event.target.value)
                break;
            case "color":
                setColor(event.target.value)
                break;
            default:
                break;
        }
        
    }
	
	function checkEnter(event) {
		if (event.key === "Enter") handleSubmit()
	}
    
    function handleSubmit() {
		let newQueryObject = {...queryObject}
        let queryString = ""
		
		// Remove keys without values
        for (const [key, value] of Object.entries(newQueryObject)) {
            if (value === "" || value === undefined || value === null)
                delete newQueryObject[key]
        }
		
		// If any keys remaining, build query string
		if (Object.keys(newQueryObject).length > 0) {
			let keysRemaining = Object.keys(newQueryObject).length
			
			queryString = queryString.concat("?")
			for (const [key, value] of Object.entries(newQueryObject)) {
				queryString = queryString.concat(key + "=" + value)
				// If more keys remaining, add "&" to separate key/value pairs
				if (--keysRemaining !== 0)
					queryString = queryString.concat("&")
			}
		}
		
		// Change route to reflect submitted search query
		history.push(`/search/${query}${queryString}`)
    }
	
	return (
		<div className="search-options-container">
			<div className="main-search-options">
				<input 
					type="text"
					autoFocus
					name="query"
					value={query}
					onChange={handleChange}
					onKeyDown={checkEnter}
					placeholder="Search Unsplash Photos"
				/>
				<button
					name="searchSubmit"
					onClick={() => handleSubmit()}
					disabled={query===""}
				>
					Search
				</button>
			</div>
			<button name="extraOptionsBtn" onClick={() => setExtraOpts(prev => !prev)}>
				{extraOpts? "Hide":"Show"} Extra Options
			</button>
			<div className={`advanced-search-options-container ${displayExtraOpts()}`}>
				<div>
					<label>Page</label>
					<input
						type="number"
						min={1}
						max={100}
						name="page"
						value={page}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label>Pics Per Page</label>
					<input
						type="number"
						min={1}
						max={25}
						name="perPage"
						value={perPage}
						onChange={handleChange}
					/>
				</div>
				
				<div>
					<label>Orientation</label>
					<select name="orientation" value={orientation} onChange={handleChange}>
						<option value="">Any orientation</option>
						<option value="portrait">Portrait</option>
						<option value="landscape">Landscape</option>
						<option value="square">Square</option>
					</select>
				</div>
			   
				<div>
					<label>Color</label>
					<select
						name="color"
						value={color}
						onChange={handleChange}
						style={colorBtnStyles()}
					>
						<option value="">Any color</option>
						<option value="black">Black</option>
						<option value="white">White</option>
						<option value="yellow">Yellow</option>
						<option value="orange">Orange</option>
						<option value="red">Red</option>
						<option value="purple">Purple</option>
						<option value="magenta">Magenta</option>
						<option value="green">Green</option>
						<option value="teal">Teal</option>
						<option value="blue">Blue</option>
					</select>
				</div>
				
			</div>
		</div>
	)
}

export default SearchOptions