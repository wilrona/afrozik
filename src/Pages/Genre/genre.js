import React, { Component } from 'react';

import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';


import Album from './../../Components/Project/Album';

import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';

@inject('genreStore', 'albumStore')
@observer
class genrePage extends Component {

    constructor(props){
        super(props);

        this.state = {
            data: null,
            offsetData : 0,
            genre : null,
            limitData : 10,
        }
    }

    UNSAFE_componentWillMount = () => {

        const { genreStore, albumStore } = this.props;

        const currentGenre = this.props.match.params.genre_id;
    
        if(currentGenre) genreStore.setId(currentGenre);

        let data = { }
    
        genreStore.fetch(data, (response) => {
            this.setState({
              genre : response
            });
        });

        let dataAlbum = {
            limit : this.state.limitData,
            genre: currentGenre
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
            genre: this.props.match.params.genre_id
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

    onChangeGenre = (event) => {
        this.props.history.push(`/home/genre/${event.target.value}`)
    }


    render() {

        const { genreStore } = this.props;

        const data = toJS(genreStore.singleData);

        return (
            <div>

                <Helmet>
                    <title>{`Afrozik - Accueil - ${ this.props.match.params.genre_id ? data.libelle : 'Tous les genres' }`}</title>
                </Helmet>

                <div className="uk-section uk-section-small uk-container">
                    <ul className="uk-breadcrumb">
                        <li><Link to="/home">Accueil</Link></li>
                        <li><span>Genre</span></li>
                        <li><span>{this.props.match.params.genre_id ? data.libelle : "Tous les genres"}</span></li>
                    </ul>
                    <div className="uk-width-1-4">
                        <div uk-form-custom="target: > * > span:first-child">
                            <select value={this.props.match.params.genre_id ? data.url : ""} onChange={(event) => this.onChangeGenre(event)}>
                                <option value="">Tous les genres</option>
                                {this.state.genre && (
                                    this.state.genre.map((data, index) => {
                                        return(
                                            <option value={data.url} key={index}>{data.libelle}</option>
                                        )
                                    })                                        
                                )}
                                
                            </select>
                            <button className="uk-button uk-button-default" type="button" tabIndex="-1">
                                <span>Votre genre</span>
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

export default genrePage;