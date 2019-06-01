import React from 'react';
import './styles/scss/main.scss';
import { Switch, Route } from "react-router-dom";

import Nav from "./components/NavMain";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props}/>} />
      </Switch>
    </div>
  );
}

export default App;
