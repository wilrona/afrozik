import React, { Component } from 'react';

import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

import Album from '../../Components/Project/Album';

class categoriePage extends Component {
    render() {

        return (
            <div>

                <Helmet>
                    <title>afrozik - Accueil - Genre</title>
                </Helmet>

                <div className="uk-section uk-section-small uk-container">
                    <ul className="uk-breadcrumb">
                        <li><Link to="/home">Accueil</Link></li>
                        <li><span>Filtre</span></li>
                        <li><span>Categorie</span></li>
                    </ul>
                    <div className="uk-width-1-4">
                        <div uk-form-custom="target: > * > span:first-child">
                            <select>
                                <option value="">Tous les categories</option>
                                <option value="1">Option 01</option>
                                <option value="2">Option 02</option>
                                <option value="3">Option 03</option>
                                <option value="4">Option 04</option>
                            </select>
                            <button className="uk-button uk-button-default" type="button" tabIndex="-1">
                                <span>Votre genre</span>
                                <span uk-icon="icon: chevron-down"></span>
                            </button>
                        </div>
                    </div>

                    <div className="uk-margin-top">
                        <div className="uk-child-width-1-5 uk-margin-bottom" uk-grid="true">
                            <Album />
                            <Album />
                            <Album />
                            <Album />
                            <Album />
                        </div>
                        <button className="uk-button uk-button-afro">Charger plus...</button>
                    </div>
                            
                </div>
                
            </div>
        );
    }
}

export default categoriePage;