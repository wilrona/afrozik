import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import Album from './../../Components/Project/Album';
import Suggest from '../../Components/Project/Suggest';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';


@inject('playlistStore')
@observer
class playlistPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataAudio : [],
            limitAudio : 10,
            offsetAudio : 0,
            dataVideo : [],
            limitVideo : 10,
            offsetVideo : 0
        }
        
    }

    UNSAFE_componentWillMount(){
    
        const { playlistStore } = this.props   

        let data = {
            limit : this.state.limitAudio,
            type: 'audio',
            direction :'ASC',
            by: 'titre'
        }

        playlistStore.fetch(data, (response) => {
            this.setState({
                dataAudio : response
            });
        });

        data = {
            limit : this.state.limitVideo,
            type: 'video',
            direction :'ASC',
            by: 'titre'
        }

        playlistStore.fetch(data, (response) => {
            this.setState({
                dataVideo : response
            });
        });

    }

    PaginationAudio = () => {

        const { playlistStore } = this.props;
        
        playlistStore.initOffset(this.state.offsetAudio);
    
        this.setState({
            offsetAudio : this.state.offsetAudio + 1
        })

        let data = {
            limit : this.state.limitAudio,
            type: 'audio',
            membre :'',
            direction :'ASC',
            by: 'titre'
        }

        playlistStore.fetch(data, (response) => {
            if(!response){
                this.setState({
                  offsetAudio : 0
                })
              }else{
                this.setState({
                    dataAudio : [...this.state.dataAudio, ...response]
                });
              }
        });
      }


      PaginationVideo = () => {

        const { playlistStore } = this.props;
        
        playlistStore.initOffset(this.state.offsetVideo);
    
        this.setState({
            offsetVideo : this.state.offsetVideo + 1
        })

        let data = {
            limit : this.state.limitVideo,
            type: 'video',
            membre :'',
            direction :'ASC',
            by: 'titre'
        }

        playlistStore.fetch(data, (response) => {
            if(!response){
                this.setState({
                    offsetVideo : 0
                })
              }else{
                this.setState({
                    dataVideo : [...this.state.dataVideo, ...response]
                });
              }
        });
      }

    render() {

        console.log(this.state.dataVideo);
        return (
            <div className="uk-container uk-section uk-section-small">

                <Helmet>
                    <title>afrozik - Playlists</title>
                </Helmet>

                <section className="uk-padding uk-padding-remove-horizontal uk-text-center" id="titreTop">
                    <h2>Playlists</h2>
                    {/* <p className="">20 playlist(s) dans votre liste</p> */}
                    <div className="uk-child-width-1-2 uk-grid uk-padding uk-padding-remove-vertical" uk-grid="">
                        <div>
                            <form>
                                <div className="">
                                    <select className="uk-select uk-border-rounded">
                                        <option>Trier par: Nom du créateur</option>
                                        <option>Trier par: Date de création</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="">
                            <form className="uk-search uk-search-default uk-width-1-1">
                                <input className="uk-search-input uk-width-1-1 uk-border-rounded" type="search" placeholder="Recherche par nom..." />
                            </form>
                        </div>
                    </div>
                </section>


                <div className="uk-section uk-section-small">
                    <h2>Audio</h2>
                    <div className="uk-child-width-1-5 uk-margin-bottom uk-grid-match" uk-grid="true">
                    <div>
                        <div className="playBorder uk-flex uk-flex-center uk-flex-middle uk-height-small">
                            <Link to="#modal-example" title="Créer une playlist" uk-toggle="" className="uk-button uk-button-afro uk-icon" uk-icon="icon: plus"/>
                        </div>
                    </div>

                        {this.state.dataAudio && (
                                <div>
                                    {this.state.dataAudio.map((data, index) => {
                                            const currentData = toJS(data);
                                            return(
                                                 <Album key={index} data={currentData} playlist={true}/>
                                            )
                                    })}
                                </div>
                        )}

                    </div>
                    <button className="uk-button uk-button-afro" onClick={() => this.PaginationAudio()}>Charger plus...</button>
                </div>


                {this.state.dataVideo && (
                        <div className="uk-section uk-section-small">
                        <h2>Video</h2>
                        <div className="uk-child-width-1-5 uk-margin-bottom uk-grid-match" uk-grid="true">
                            {/* <div>
                                <div className="playBorder uk-flex uk-flex-center uk-flex-middle">
                                    <Link to="#modal-example" title="Créer une playlist" uk-toggle="" className="uk-button uk-button-afro uk-icon" uk-icon="icon: plus"></Link>
                                </div>
                            </div>   */}

                            {this.state.dataVideo.map((data, index) => {
                                const currentData = toJS(data);
                                return(
                                     <Album key={index} data={currentData} playlist={true} video={true}/>
                                )
                            })}
                        </div>
                        <button className="uk-button uk-button-afro" onClick={() => this.PaginationVideo()}>Charger plus...</button>
                    </div>
                )}

                

                {/* <div className="uk-section uk-section-small">
                    <h2>Morceaux similaires</h2>
                    <div className="uk-child-width-1-2 uk-margin-bottom" margin="uk-margin-top" uk-grid="true">
                        <Suggest explicite={true} play={true}/>
                        <Suggest play={true}/>
                        <Suggest play={true}/>
                        <Suggest play={true}/>
                        <Suggest play={true}/>
                        <Suggest play={true}/>
                    </div>
                    <button className="uk-button uk-button-afro">Charger plus...</button>
                </div>   */}
                             
            </div>
        );
    }
}

export default playlistPage;