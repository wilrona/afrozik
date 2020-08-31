import React, { Component } from 'react';

import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

import Album from '../../Components/Project/Album';

import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';

@inject('paysStore', 'albumStore')
@observer
class paysPage extends Component {

    constructor(props){
        super(props);

        this.state = {
            data: null,
            offsetData : 0,
            pays : null,
            limitData : 10,
        }
    }

    UNSAFE_componentWillMount = () => {

        const { paysStore, albumStore } = this.props;

        const currentGenre = this.props.match.params.pays_id;
    
        if(currentGenre) paysStore.setId(currentGenre);

        let data = { }
    
        paysStore.fetch(data, (response) => {
            this.setState({
              pays : response
            });
        });

        let dataAlbum = {
            limit : this.state.limitData,
            pays: currentGenre,
        }

        albumStore.fetch(dataAlbum, (response) => {

            if(response){
                if(this.state.data){
                    this.setState({
                        data : [...this.state.data, ...response]
                    });
                }else{
                    this.setState({
                        data : response
                    });
                }

                
            }
        });

    }

    PaginateData = () => {

        const { albumStore } = this.props

        albumStore.initOffset(this.state.offsetData);

        this.setState({
            offsetData : this.state.offsetData + 1
        })

        let data = {
            limit : this.state.limitData,
            pays: this.props.match.params.pays_id,
        }

        albumStore.fetch(data, (response) => {

            if(response){

                if(this.state.data){
                    this.setState({
                        data : [...this.state.data, ...response]
                    });
                }else{
                    this.setState({
                        data : response
                    });
                }

                
            }
        });

    }

    onChange = (event) => {
        this.props.history.push(`/home/pays/${event.target.value}`)
    }


    render() {

        const { paysStore } = this.props;

        const data = toJS(paysStore.singleData);

        return (
            <div>

                <Helmet>
                    <title>{`Afrozik - Accueil - ${ this.props.match.params.pays_id ? data.nicename : 'Tous les pays' }`}</title>
                </Helmet>

                <div className="uk-section uk-section-small uk-container">
                    <ul className="uk-breadcrumb">
                        <li><Link to="/home">Accueil</Link></li>
                        <li><span>Pays</span></li>
                        <li><span>{this.props.match.params.pays_id ? data.nicename : 'Tous les pays'}</span></li>
                        
                    </ul>
                    <div className="uk-width-1-4">
                        <div uk-form-custom="target: > * > span:first-child">
                            <select value={this.props.match.params.pays_id ? data.iso : ""} onChange={(event) => this.onChange(event)}>
                                <option value="">Tous les pays</option>
                                {this.state.pays && (
                                    this.state.pays.map((data, index) => {
                                        return(
                                            <option value={data.iso} key={index}>{data.nicename}</option>
                                        )
                                    })                                        
                                )}
                                
                            </select>
                            <button className="uk-button uk-button-default" type="button" tabIndex="-1">
                                <span>Votre pays</span>
                                <span uk-icon="icon: chevron-down"></span>
                            </button>
                        </div>
                    </div>

                    <div className="uk-margin-top">
                        <div className="uk-child-width-1-5 uk-margin-bottom" uk-grid="true">
                        {this.state.data && this.state.data.length > 0 && (
            
                            this.state.data.map((data, index) => {
                                const currentData = toJS(data);
                                return(
                                    <Album key={index} data={currentData}/>
                                )
                            })

                        )}
                        </div>
                        <button className="uk-button uk-button-afro" onClick={() => this.PaginateData()}>Charger plus...</button>
                    </div>
                            
                </div>
                
            </div>
        );
    }
}

export default paysPage;