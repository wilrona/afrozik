import React from 'react';
import { Link, withRouter } from "react-router-dom";
import NavItem from './../Function/navLink';


class NavLeft extends React.Component {

  // eslint-disable-next-line no-useless-constructor
  constructor(props, location) {
    super(props);
    // console.log(location);

  }

  render() {

    return (
      <div className="uk-width-auto uk-background-default uk-nav-left" uk-height-viewport="offset-top: true">

        <div className="conversion-banner uk-padding-small">
          <p className="conversion-banner-description uk-text-center">Pas d'abonnement en cours</p>
          <Link className="uk-button uk-button-primary uk-button-small uk-text-center uk-display-block" to="/">Choisir un abonnement</Link>
        </div>

        <div className="uk-padding-small uk-left-menu">
          <ul className="uk-nav uk-nav-default">

            <NavItem to='/morceaux' label='Morceaux' icon='Single' />
            <NavItem to='/albums' label='Albums' icon='Albums' />
            <NavItem to='/videos' label='Videos' icon='Vidéoclips' />            
            <NavItem to='/playlists' label='Playlists' icon='Playlists_'/>
            
            <NavItem to='/artistes' label='Artistes' icon='Artistes'/>
            <NavItem to='/podcasts' label='Podcasts' icon='Podcast'/>
            <NavItem to='/events' label='Evenements' icon='Evenements'/>

          </ul>
        </div>

      </div>
    );

  }

}

export default withRouter(({ location, ...props }) => {
  // const isActive = location.pathname === props.to;
  return location.pathname !== '/' && location.pathname !== '/register' && location.pathname !== '/login' ? <NavLeft {...props} /> : '';
});