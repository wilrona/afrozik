import React, { useEffect } from 'react';
import axios from 'axios';
// import { inject, observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


// import notFound from './Pages/notFound';

import Layout from "./Pages";
import Authorization from './Components/Function/authorization';


import Home from './Pages/Home';


import NavBar from './Components/Layout/header';
import NavLeft from './Components/Layout/navLeft';
import Player from './Components/Project/Player';

import Login from "./Pages/Login";
import SignIn from "./Pages/SignIn";

import { RouteHome } from "./Pages/Dashboard";
import { RouteGenre } from './Pages/Genre';
import { RoutePays } from './Pages/Pays';
import { RouteCategorie } from './Pages/Categorie';
import { RouteSingle } from './Pages/Piste';
import { RouteAlbum } from './Pages/Album';
import { RouteVideo } from './Pages/Video';
import { RoutePlaylist } from './Pages/Playlist';
import { RouteArtiste } from './Pages/Artiste';
import { RoutePodcast } from './Pages/Podcast';
import { RouteEvent } from './Pages/Event';

let routes = [];

// Ajout des routes du module administrateur
RouteHome.forEach((item) => {
  routes.push(item);
});

RouteGenre.forEach((item) => {
  routes.push(item);
});

RoutePays.forEach((item) => {
  routes.push(item);
});

RouteCategorie.forEach((item) => {
  routes.push(item);
});

RouteSingle.forEach((item) =>{
  routes.push(item);
});

RouteAlbum.forEach((item) => {
  routes.push(item);
});

RouteVideo.forEach((item) => {
  routes.push(item);
});

RoutePlaylist.forEach((item) => {
  routes.push(item);
});

RouteArtiste.forEach((item) => {
  routes.push(item)
});

RoutePodcast.forEach((item) => {
  routes.push(item);
});

RouteEvent.forEach((item) => {
  routes.push(item);
});


function RouteWithSubRoutes(route) {
  return (
    <div>
      <Layout
        path={route.path}
        exact={route.exact}
        strict={route.strict}
        component={Authorization(route.component, route.permission)}
      />
    </div>
    
  );
}


class App extends React.Component {

  render(){

    return(
      <Router>
        
        <div>

          <NavBar />       

          <div className="uk-grid-collapse uk-position-relative" uk-grid="true">

                <NavLeft />

                <div className="uk-width-expand" uk-height-viewport="offset-top: true">
                    <Switch>
                      <Route path="/" exact strict component={Home} />

                      {routes.map((route, i) => {
                        return (
                          <RouteWithSubRoutes key={i} {...route} />
                        )
                      })}
                      <Route path="/login" strict exact component={Login} />
                      <Route path="/register" strict exact component={SignIn} />
                      {/* <Route component={notFound} /> */}
                      
                    </Switch>
                </div>

                <Player />
              </div>
          </div>
          
      </Router>
    )
  }
}


export default App;
