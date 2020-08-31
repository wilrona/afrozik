import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom'
// import { inject, observer } from 'mobx-react';

import Nav from './nav';
import Album from './../../Components/Project/Album';

class EventOnglet extends Component {
    render() {
        return (
            <div>

            <Helmet>
              <title>Afrozik - Accueil - Evenements</title>
            </Helmet>
    
            <Nav />

           
            <div className="uk-container uk-section uk-section-small">
                <h2>Evenements recommandés</h2>
                <div className="uk-child-width-1-5 uk-margin-bottom" uk-grid="true">
                  {/* <Album event={true}/> */}
                </div>
                <button className="uk-button uk-button-afro">Charger plus...</button>
            </div>

            <div className="uk-container uk-section uk-section-small">
                <h2>Evenements de la semaine</h2>
                <div className="uk-child-width-1-5 uk-margin-bottom" uk-grid="true">
                    {/* <Album event={true}/> */}

                </div>
                <button className="uk-button uk-button-afro">Charger plus...</button>
            </div>

            <div className="uk-container uk-section uk-section-small">
                <h2>Evenements de ce week-end</h2>
                <div className="uk-child-width-1-5 uk-margin-bottom" uk-grid="true">
                    {/* <Album event={true}/> */}
                </div>
                <button className="uk-button uk-button-afro">Charger plus...</button>
            </div>  

            <div className="uk-container uk-section uk-section-small">
                <h2>Evenements à venir</h2>
                <div className="uk-child-width-1-5 uk-margin-bottom" uk-grid="true">
                    {/* <Album event={true}/> */}
                </div>
                <button className="uk-button uk-button-afro">Charger plus...</button>
            </div> 

            
    
          </div >
        );
    }
}

export default EventOnglet;