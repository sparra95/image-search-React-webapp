import React from "react"
import {Link} from "react-router-dom"

function Header() {
        
    return (
        <header>
            <Link to="/"><h2>Photo Search</h2></Link>
        </header>
    )
}

export default Header