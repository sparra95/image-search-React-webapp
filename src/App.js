//import logo from './logo.svg';
//import './App.css';
import './styles.css'

import React from "react"
import {Switch, Route} from "react-router-dom"

import Header from "./components/Header"
import Cart from "./pages/Cart"
import Photos from "./pages/Photos"

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/">
          <Photos />
        </Route>
        
        <Route path="/cart">
          <Cart />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

// IMPROVEMENTS TODO:
// - Create fade-in, slide animation when pics appear
// - Pull photos from unsplash API (LAZY LOAD)
// - Save pictures to localStorage so they persist between refreshes
// - Clicking on pics opens modal with picture details
// - Add numbers to Cart icon in header
// - Add loading animation for fake order placing
// - Make grid/pictures bigger so it's not so small on bigger screens
// - Use React.memo() to prevent re-render of all images when you 'favorite' one or 'add to cart'
// - Create an "About this project" to document what you're using