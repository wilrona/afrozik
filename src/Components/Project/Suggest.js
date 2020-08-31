import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Suggest extends Component {
    render() {
        const explicite = this.props.explicite;
        const play = this.props.play;
        const current = this.props.current;

        return (
            <div className="">

                <div className={!current ? "uk-grid-small uk-child-width-auto uk-transition-toggle" : "uk-grid-small uk-child-width-auto uk-transition-toggle uk-background-muted"} uk-grid="true">
                    <div className="uk-width-1-5 uk-position-relative uk-inline-clip">
                        <div className="uk-cover-container uk-position-relative uk-width-1-1">
                            <img src="/images/albums/album_1.jpg" className="uk-border-rounded uk-with-small" alt=""/>
                            {play && (
                                <div className={!current ? "uk-transition-fade uk-position-cover uk-overlay uk-padding-remove uk-flex uk-flex-center uk-flex-middle" : "uk-position-cover uk-overlay uk-padding-remove uk-flex uk-flex-center uk-flex-middle"}>
                                        <div><button to="#" className="uk-icon-button" uk-icon="play"></button></div>
                                </div>
                            )}
                            
                        </div>
                    </div>
                    <div className="uk-text-truncate">
                        I’m on my way <br />
                        <Link to="#" className="uk-text-small uk-link-muted">King Saha</Link>
                    </div>
                    {explicite && (
                        <div className="uk-width-expand" >
                            <span className="uk-label uk-label-afro">explicite</span>
                        </div>
                    )}
                    
                </div>
                
            </div>
        );
    }
}

export default Suggest;