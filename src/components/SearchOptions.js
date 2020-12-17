import React, {useState, useContext} from "react"
import {UnsplashContext} from "../UnsplashContext"

function SearchOptions() {
	const {searchPhotos} = useContext(UnsplashContext)
	
    const [query, setQuery] = useState("")
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(20)
    const [orientation, setOrientation] = useState("")
    const [color, setColor] = useState("")  
    const [advOpts, setAdvOpts] = useState(false)
    
    const queryObject = {
        query: query,
        page: page,
        per_page: perPage,
        orientation: orientation,
        color: color
    }
	
	function colorBtnStyles() {
		let bgColor = "white"
		let fontColor = "white"
		// Change btn background color if color is selected
		if (color === "black_and_white") { bgColor = "black" }
		else if (color !== "") { bgColor = color }
		// Use lighter font color if selected color is dark
		if (color === "white" || color === "yellow") { fontColor = "black" }
		
		return ({
			backgroundColor: bgColor,
			color: fontColor
		})
	}
	
	function displayAdvOpts() {
		return (advOpts? "" : "hidden")
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
    
    function handleSubmit() {
        let newQueryObject = {...queryObject}
        
        for (const [key, value] of Object.entries(newQueryObject)) {
            if (value === "" || value === undefined || value === null) {
                delete newQueryObject[key]
            }
        }
        
        searchPhotos(newQueryObject)
    }
	
	return (
		<div className="searchOptionsContainer">
			<div className="mainSearchOptions">
				<input 
					type="text"
					name="query"
					value={query}
					onChange={handleChange}
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
			<button name="advOptionsBtn" onClick={() => setAdvOpts(prev => !prev)}>Advanced Options</button>
			<div className={`advancedSearchOptionsContainer ${displayAdvOpts()}`}>
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
						max={100}
						name="perPage"
						value={perPage}
						onChange={handleChange}
					/>
				</div>
				
				<div>
					<label>Orientation</label>
					<select name="orientation" value={orientation} onChange={handleChange}>
						<option value=""></option>
						<option value="portrait">Portrait</option>
						<option value="landscape">Landscape</option>
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
						<option value=""></option>
						<option value="black_and_white">Black and White</option>
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