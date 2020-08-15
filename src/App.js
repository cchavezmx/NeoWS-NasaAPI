import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import  Asteroids  from './Containers/Asteroids/Asteroids';
import MainContainer from './Containers/MainContainer'

function App() {
  return (
    
      <BrowserRouter>
          <Switch>
            <Route exact path="/" component={MainContainer}></Route>
            <Route exact path="/asteroides" component={Asteroids}></Route>
          </Switch>  
      </BrowserRouter>
    
  );
}

export default App;
