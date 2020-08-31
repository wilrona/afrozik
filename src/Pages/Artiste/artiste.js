import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import Artiste from '../../Components/Project/Artiste';
import Suggest from '../../Components/Project/Suggest';
import { Link } from 'react-router-dom';

import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';


@inject('artisteStore')
@observer
class artistePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data : null,
            offset : 0, 
            limit : 10
        }
        
    }

    UNSAFE_componentWillMount(){
    
        const { artisteStore } = this.props   

        let data = {
            limit : this.state.limit,            
            direction :'ASC',
            by: 'nom_artiste_public'
        }

        artisteStore.fetch(data, (response) => {
            this.setState({
                data : response
            });
        });

    }

    PaginateData = () => {

        const { artisteStore } = this.props

        artisteStore.initOffset(this.state.offset);

        this.setState({
            offset : this.state.offset + 1
        })

        let data = {
            limit : this.state.limit,            
            direction :'ASC',
            by: 'nom_artiste_public'
        }

        artisteStore.fetch(data, (response) => {

            if(response){
                this.setState({
                    data : [...this.state.data, ...response]
                });
            }
        });

    }

    render() {
        return (
            <div className="uk-container uk-section uk-section-small">

                <Helmet>
                    <title>afrozik - Artistes</title>
                </Helmet>

                <section className="uk-padding uk-padding-remove-horizontal uk-text-center" id="titreTop">
                    <h2>Artistes</h2>
                    {/* <p className="">20 artistes(s) dans votre liste</p> */}
                    <div className="uk-child-width-1-2 uk-grid uk-padding uk-padding-remove-vertical" uk-grid="">
                        <div>
                            <form>
                                <div className="">
                                    <select className="uk-select uk-border-rounded">
                                        <option>Trier par: Artiste</option>
                                        <option>Trier par: Pays</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div>
                            <form className="uk-search uk-search-default uk-width-1-1">
                                <input className="uk-search-input uk-width-1-1 uk-border-rounded" type="search" placeholder="Recherche par nom artiste..." />
                            </form>
                        </div>
                    </div>
                </section>

                <div className="uk-section uk-section-small">

                    <div className="uk-child-width-1-5 uk-margin-bottom uk-grid-match" uk-margin="uk-margin-medium-top" uk-grid="true" uk-height-match="target: > div  > .match"> 
                    
                    {this.state.data && this.state.data.length > 0 && (

            
                        this.state.data.map((data, index) => {
                            const currentData = toJS(data);

                            return(
                                <Artiste key={index} data={currentData}/>
                            )
                        })


                    )}

                        
                    </div>
                    <button className="uk-button uk-button-afro" onClick={() => this.PaginateData()}>Charger plus...</button>
                </div>

                
                {/* <div className="uk-section uk-section-small">
                    <h2>Artistes similaires</h2>
                    <div className="uk-child-width-1-5 uk-margin-bottom" margin="uk-margin-top" uk-grid="true">
                        <Artiste />
                        <Artiste />
                        <Artiste />
                        <Artiste />
                        <Artiste />
                        <Artiste />
                    </div>
                    <button className="uk-button uk-button-afro">Charger plus...</button>
                </div>   */}
                             
            </div>
        );
    }
}

export default artistePage;