import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Artiste extends Component {

  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);

  }

  render() {

    const { data } = this.props;

    return (
      <div className="">
        <div className="match uk-position-relative uk-transition-toggle">

          <div className="uk-inline-clip uk-light uk-margin-small-bottom uk-height-small">
            <img src={data.photo_profil} className="uk-border-circle uk-height-small uk-width-1-1" alt="" />
          </div>

          <div className="uk-transition-fade uk-visible@m uk-position-cover uk-flex uk-flex-center uk-flex-bottom">        

            <div className="uk-margin-medium-bottom">

              <Link to="" className="uk-icon-button" uk-icon="heart"></Link>
              <button className="uk-icon-button" uk-icon="more"></button>
              <div uk-dropdown="mode: hover; pos: right-center"
                className="uk-dropdown-block">
                <ul className="uk-nav-default" uk-nav="">             
                  
                  <li><Link to="#"><span className="uk-margin-small-right" uk-icon="social"></span>
                    Partager</Link></li>

                  <li><Link to="#"><span className="uk-margin-small-right"
                    uk-icon="warning"></span> Signaler un problème</Link></li>                
                  
                </ul>
              </div>
            </div>
          </div>

          </div>
        <h3 className="uk-margin-remove title_video uk-text-center"><Link to={"/artistes/"+data.code_artiste}>{data.nom_artiste_public ? data.nom_artiste_public : 'Inconnu'}</Link></h3>
        <small className="uk-margin-remove uk-text-center uk-display-block">{data.nombre_fan} {data.nombre_fan > 1 ? 'fans' : 'fan'} </small>
      </div>
    )
  }
}