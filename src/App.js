import "./App.css";
// import axios from "axios";
// import { useEffect, useState } from "react";
import Home from "./components/Home";
import { Route } from "react-router-dom";
import Character from "./components/Character";
import CharacterDetails from "./components/CharacterDetails";

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/character">
        <Character />
      </Route>
      <Route path="/characterDetails/:id" exact component={CharacterDetails} />
    </div>
  );
}

export default App;
