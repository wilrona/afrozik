import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Slider extends Component {
    render() {

        const video = this.props.video;

        return (

                <div className="uk-margin-left uk-margin-right" uk-slider="center: true; autoplay: true">

                    <div className="uk-position-relative uk-visible-toggle uk-light uk-margin-top" tabIndex="-1" >



                    <ul className="uk-slider-items uk-grid uk-grid-match uk-height-large">
                        <li className="uk-width-2-3 uk-custom-slider uk-inline-clip uk-transition-toggle">
                            <div className="uk-cover-container uk-position-relative uk-height-1-1">
                                <img src="/images/event/event_image_1.jpg" alt="" uk-cover="true" />
                                <div className="uk-overlay-custom uk-position-bottom">
                                    <div className="uk-card-small uk-grid-collapse" uk-grid="true">
                                        <div className="uk-flex-last uk-card-media-right uk-cover-container uk-width-1-6 uk-padding-small uk-padding-remove-vertical">
                                            <img hidden={video} src="/images/albums/album_1.jpg" alt="" className="uk-border-rounded uk-margin-small-top uk-margin-small-bottom" />
                                            <div className="uk-transition-fade uk-position-cover uk-overlay uk-flex uk-flex-center uk-flex-middle">
                                                <button to="#" className="uk-icon-button" uk-icon="play"></button>
                                            </div>
                                        </div>
                                        <div className="uk-width-expand uk-flex uk-flex-middle">
                                            <div className="uk-card-body">
                                                <p>Nom artiste - Titre du single</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="uk-width-2-3 uk-custom-slider uk-inline-clip uk-transition-toggle">
                            <div className="uk-cover-container uk-position-relative uk-height-1-1">
                                <img src="/images/event/event_image_1.jpg" alt="" uk-cover="true" />
                                <div className="uk-overlay-custom uk-position-bottom">
                                    <div className="uk-card-small uk-grid-collapse" uk-grid="true">
                                        <div className="uk-flex-last uk-card-media-right uk-cover-container uk-width-1-6 uk-padding-small uk-padding-remove-vertical">
                                            <img hidden={video} src="/images/albums/album_1.jpg" alt="" className="uk-border-rounded uk-margin-small-top uk-margin-small-bottom" />
                                            <div className="uk-transition-fade uk-position-cover uk-overlay uk-flex uk-flex-center uk-flex-middle">
                                            <button to="#" className="uk-icon-button" uk-icon="play"></button>
                                            </div>
                                        </div>
                                        <div className="uk-width-expand uk-flex uk-flex-middle">
                                            <div className="uk-card-body">
                                                <p>Nom artiste - Titre du single</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="uk-width-2-3 uk-custom-slider uk-inline-clip uk-transition-toggle">
                            <div className="uk-cover-container uk-position-relative uk-height-1-1">
                                <img src="/images/event/event_image_1.jpg" alt="" uk-cover="true" />
                                <div className="uk-overlay-custom uk-position-bottom">
                                    <div className="uk-card-small uk-grid-collapse" uk-grid="true">
                                        <div className="uk-flex-last uk-card-media-right uk-cover-container uk-width-1-6 uk-padding-small uk-padding-remove-vertical">
                                            <img hidden={video} src="/images/albums/album_1.jpg" alt="" className="uk-border-rounded uk-margin-small-top uk-margin-small-bottom" />
                                            <div className="uk-transition-fade uk-position-cover uk-overlay uk-flex uk-flex-center uk-flex-middle">
                                                <button to="#" className="uk-icon-button" uk-icon="play"></button>
                                            </div>
                                        </div>
                                        <div className="uk-width-expand uk-flex uk-flex-middle">
                                            <div className="uk-card-body">
                                                <p>Nom artiste - Titre du single</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="uk-width-2-3 uk-custom-slider uk-inline-clip uk-transition-toggle">
                            <div className="uk-cover-container uk-position-relative uk-height-1-1">
                                <img src="/images/event/event_image_1.jpg" alt="" uk-cover="true" />
                                <div className="uk-overlay-custom uk-position-bottom">
                                    <div className="uk-card-small uk-grid-collapse" uk-grid="true">
                                        <div className="uk-flex-last uk-card-media-right uk-cover-container uk-width-1-6 uk-padding-small uk-padding-remove-vertical">
                                            <img hidden={video} src="/images/albums/album_1.jpg" alt="" className="uk-border-rounded uk-margin-small-top uk-margin-small-bottom" />
                                            <div className="uk-transition-fade uk-position-cover uk-overlay uk-flex uk-flex-center uk-flex-middle">
                                            <button to="#" className="uk-icon-button" uk-icon="play"></button>
                                            </div>
                                        </div>
                                        <div className="uk-width-expand uk-flex uk-flex-middle">
                                            <div className="uk-card-body">
                                                <p>Nom artiste - Titre du single</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <Link className="uk-position-center-left uk-position-small uk-hidden-hover" to="#" uk-slidenav-previous="true" uk-slider-item="previous"></Link>
                    <Link className="uk-position-center-right uk-position-small uk-hidden-hover" to="#" uk-slidenav-next="true" uk-slider-item="next"></Link>
                    
                    </div>

                    <ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>

                </div>

            
        );
    }
}

export default Slider;