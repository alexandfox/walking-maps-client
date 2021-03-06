import React from 'react';
import './styles/scss/main.scss';
import { Switch, Route } from "react-router-dom";

import Nav from "./components/NavMain";
import Home from "./pages/Home";
import Create from "./pages/Create-Map"
import View from "./pages/View-Map"
import Signup from "./pages/SignupLogin"

function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props}/>} />
        <Route path="/create" render={(props) => <Create {...props}/>} />
        <Route path="/map/:id" render={(props) => <View {...props}/>} />
        <Route path="/login" render={(props) => <Signup {...props}/>} />
      </Switch>
    </div>
  );
}

export default App
