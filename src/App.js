import './styles.css'

import React from "react"
import {Switch, Route} from "react-router-dom"

import Header from "./components/Header"
import Photos from "./pages/Photos"

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/search/:query">
          <Photos />
        </Route>
        <Route exact path="/">
          <Photos />
        </Route>
      </Switch>
    </div>
  );
}

export default App