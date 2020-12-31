import React, {useState, useEffect} from "react"
import {useHistory, useLocation} from "react-router-dom"

function SearchOptions() {
	const history = useHistory()
	const location = useLocation()
    const [query, setQuery] = useState("")
    const [orientation, setOrientation] = useState("")
    const [color, setColor] = useState("")
    
    const queryObject = {
        orientation: orientation,
        color: color
    }
	
	useEffect(() => {
		if (location.pathname === "/") {
			setQuery("")
			setOrientation("")
			setColor("")
		}
	}, [location])
	
	function colorPreview() {
		if (color === "")
			return {display: "none"}
		else return {backgroundColor: color}
		
	}
    
    function handleChange(event) {
		switch (event.target.name) {
            case "query":
                setQuery(event.target.value)
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
				<div className="main-options-container">
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
				
				{ location.pathname.includes("search") &&
				<div className="extra-options-container">
					<div>
						<select name="orientation" value={orientation} onChange={handleChange}>
							<option value="">Any orientation</option>
							<option value="portrait">Portrait</option>
							<option value="landscape">Landscape</option>
							<option value="square">Square</option>
						</select>
					</div>
					
					<div className="color-preview" style={colorPreview()}>
					</div>
				   
					<div>
						<select
							name="color"
							value={color}
							onChange={handleChange}
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
				}
			</div>
		</div>
	)
}

export default SearchOptions