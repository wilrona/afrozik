import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import SimpleBlock from './SimpleBlock';

class CommonBlock extends Component {
    render() {

        const title = this.props.title;
        const link = this.props.link;

        return (
            <div>
                <div className="uk-container uk-section uk-section-small">
                    <h2>{title}</h2>
                    <div className="uk-child-width-1-4 uk-grid-small uk-grid-match uk-margin-bottom" uk-grid="true">
                        {this.props.data && (
                            this.props.data.map((data, index) => {
                                return(                                     
                                    <SimpleBlock key={index} link={link+"/"+(data.url ? data.url : data.iso)} name={data.libelle ? data.libelle : data.nicename}/>
                                )
                            })
                        )}
                    </div>
                    <Link className="uk-button uk-button-afro" to={link}>Charger plus...</Link>
                    
                </div>               
            </div>
        );
    }
}

export default CommonBlock;