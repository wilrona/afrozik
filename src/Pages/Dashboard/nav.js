import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import NavItem from './../../Components/Function/navLink';
// import { inject, observer } from 'mobx-react';

class Nav extends Component {

  render() {
    return (
      <div className="uk-artiste-menu uk-container uk-margin-top">
              <ul className="uk-tab uk-flex-center">
                <NavItem to='/home' label='Singles'/>
                <NavItem to='/home/albums' label='Albums'/>
                <NavItem to='/home/videos' label='Vidéos'/>
                <NavItem to='/home/playlist' label='Playlists'/>
                <NavItem to='/home/podcast' label='Postcasts'/>
                <NavItem to='/home/event' label='Evénements'/>
              </ul>

      </div >
    );
  }
}

export default Nav;