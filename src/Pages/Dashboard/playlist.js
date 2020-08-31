import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react';

import Nav from './nav';
import Album from './../../Components/Project/Album';
import { toJS } from 'mobx';

@inject('playlistStore')
@observer
class PlaylistOnglet extends Component {

    constructor(props){
        super(props);
  
        this.state = {
          newsAudio : null,
          limitNewsAudio : 10,
          offsetNewsAudio : 0,
          newsVideo : null,
          limitNewsVideo : 10,
          offsetNewsVideo : 0
        }
    }

    UNSAFE_componentWillMount(){
    
        const { playlistStore } = this.props; 

        let data = {
            limit : this.state.limitNewsAudio,
            type: 'audio',
            by: 'titre'
        }

        playlistStore.fetch(data, (response) => {
            this.setState({
                newsAudio : response
            });
        });

        data = {
            limit : this.state.limitNewsVideo,
            type: 'video',
            by: 'date_update'
        }

        playlistStore.fetch(data, (response) => {
            this.setState({
                newsVideo : response
            });
        });
  
    }

    PaginationAudio = () => {

        const { playlistStore } = this.props;
        
        playlistStore.initOffset(this.state.offsetNewsAudio);
    
        this.setState({
            offsetNewsAudio : this.state.offsetNewsAudio + 1
        })

        let data = {
            limit : this.state.limitNewsAudio,
            type: 'audio',
            by: 'date_update'
        }

        playlistStore.fetch(data, (response) => {
            if(!response){
                this.setState({
                    offsetNewsAudio : 0
                })
              }else{
                this.setState({
                    newsAudio : [...this.state.newsAudio, ...response]
                });
              }
        });
    }

    PaginationVideo = () => {

        const { playlistStore } = this.props;
        
        playlistStore.initOffset(this.state.offsetNewsVideo);
    
        this.setState({
            offsetNewsVideo : this.state.offsetNewsVideo + 1
        })

        let data = {
            limit : this.state.limitNewsVideo,
            type: 'video',
            by: 'titre'
        }

        playlistStore.fetch(data, (response) => {
            if(!response){
                this.setState({
                    offsetNewsVideo : 0
                })
              }else{
                this.setState({
                    newsVideo : [...this.state.newsVideo, ...response]
                });
              }
        });
    }


    render() {
        return (
            <div>

            <Helmet>
              <title>Afrozik - Accueil - Playlist</title>
            </Helmet>
    
            <Nav />
           
            {/* <div className="uk-container uk-section uk-section-small">
                <h2>Playlists audio recommandées</h2>
                <div className="uk-child-width-1-5 uk-margin-bottom" uk-grid="true">
                   <Album playlist={true}/>
                </div>
                <button className="uk-button uk-button-afro">Charger plus...</button>
            </div> */}

            {/* <div className="uk-container uk-section uk-section-small">
                <h2>Playlist vidéo recommandées</h2>
                <div className="uk-child-width-1-5 uk-margin-bottom" uk-grid="true">
                    <Album playlist={true}/>

                </div>
                <button className="uk-button uk-button-afro">Charger plus...</button>
            </div> */}

            {/* <div className="uk-container uk-section uk-section-small">
                <h2>Playlist audio les plus écoutées</h2>
                <div className="uk-child-width-1-5 uk-margin-bottom" uk-grid="true">
                    <Album playlist={true}/>
                </div>
                <button className="uk-button uk-button-afro">Charger plus...</button>
            </div>   */}

            {/* <div className="uk-container uk-section uk-section-small">
                <h2>Playlist vidéo les plus vues</h2>
                <div className="uk-child-width-1-5 uk-margin-bottom" uk-grid="true">
                     <Album playlist={true}/> 
                </div>
                <button className="uk-button uk-button-afro">Charger plus...</button>
            </div>  */}

            {this.state.newsAudio !== false && this.state.newsAudio !== null && (
                <div className="uk-container uk-section uk-section-small">
                    <h2>Audios</h2>
                    <div className="uk-child-width-1-5 uk-margin-bottom" uk-grid="true">
                    {this.state.newsAudio && this.state.newsAudio.length > 0 && (

                        this.state.newsAudio.map((data, index) => {
                                const currentData = toJS(data);
                                return(
                                    <Album key={index} data={currentData} playlist={true}/>
                                )
                        })

                    )}
                    </div>
                    <button className="uk-button uk-button-afro" onClick={() => {this.PaginationAudio()}}>Charger plus...</button>
                </div>
            )}
            
            {this.state.newsVideo !== false && this.state.newsVideo !== null && (
                <div className="uk-container uk-section uk-section-small">
                    <h2>Vidéos</h2>
                    <div className="uk-child-width-1-5 uk-margin-bottom" uk-grid="true">
                        {this.state.newsVideo && this.state.newsVideo.length > 0 && (
                            this.state.newsVideo.map((data, index) => {
                                const currentData = toJS(data);
                                return(
                                        <Album key={index} data={currentData} playlist={true} video={true}/>
                                )
                            })
                        )}
                    </div>
                    <button className="uk-button uk-button-afro" onClick={() => {this.PaginationVideo()}}>Charger plus...</button>
                </div> 
            )}
    
          </div >
        );
    }
}

export default PlaylistOnglet;