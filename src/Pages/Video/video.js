import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import Video from './../../Components/Project/Video';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';


@inject('videoStore')
@observer
class videoPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data : [],
            offsetData : 0
        }
        
    }

    UNSAFE_componentWillMount(){
    
        const { videoStore } = this.props   

        let data = {
            limit : 10,
            by: 'titre'
        }

        videoStore.fetch(data, (response) => {
            this.setState({
                data : response
            });
        });

    }

    PaginateData = () => {

        const { videoStore } = this.props

        videoStore.initOffset(this.state.offsetData);

        this.setState({
            offsetData : this.state.offsetData + 1
        })

        let data = {
            limit : 10,
            by: 'titre'
        }

        videoStore.fetch(data, (response) => {
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
                    <title>afrozik - Vidéos</title>
                </Helmet>

                <section className="uk-padding uk-padding-remove-horizontal uk-text-center" id="titreTop">
                    <h2>Vidéos</h2>
                    {/* <p className="">20 vidéo(s) dans votre liste</p> */}
                    <div className="uk-child-width-1-2 uk-grid uk-padding uk-padding-remove-vertical" uk-grid="">
                        <div>
                            <form>
                                <div className="">
                                    <select className="uk-select uk-border-rounded">
                                        <option>Trier par: Artiste</option>
                                        <option>Trier par: Genre</option>
                                        <option>Trier par: Date de sortie</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div>
                            <form className="uk-search uk-search-default uk-width-1-1">
                                <input className="uk-search-input uk-width-1-1 uk-border-rounded" type="search" placeholder="Recherche par nom ou artiste de la video..." />
                            </form>
                        </div>
                    </div>
                </section>

                <div className="uk-section uk-section-small">
                    <div className="uk-child-width-1-4 uk-margin-bottom" uk-grid="true" uk-height-match="target: > div  > .match">

                    {this.state.data.length > 0 && (
            
                            this.state.data.map((data, index) => {
                                const currentData = toJS(data);
                                return(
                                    <Video key={index} data={currentData}/>
                                )
                            })

                    )}
                    </div>
                    <button className="uk-button uk-button-afro" onClick={() => this.PaginateData()}>Charger plus...</button>
                </div>

                {/* <div className="uk-section uk-section-small">
                    <h2>Albums Similaires</h2>
                    <div className="uk-child-width-1-4 uk-margin-bottom" uk-grid="true">
                        <Video />
                        <Video />
                        <Video />
                        <Video />
                        <Video />
                        <Video />
                        <Video />
                    </div>
                    <button className="uk-button uk-button-afro">Charger plus...</button>
                </div> */}
                             
            </div>
        );
    }
}

export default videoPage;