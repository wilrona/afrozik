import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

import Video from '../../Components/Project/Video';
import QierPlayer from '../../Components/Project/QierPlayer';
import Suggest from '../../Components/Project/Suggest';
import { toJS } from 'mobx';
// import Amplitude from 'amplitudejs'

import { inject, observer } from 'mobx-react';

@inject('videoStore')
@observer
export default class VideoSingle extends Component {

  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);

    this.state = {
      video : [],
      offset : 0,
      limit : 10
    }

  }

  UNSAFE_componentWillMount = () => {

    const { videoStore } = this.props;

    videoStore.setId(this.props.match.params.video_id)  

    let data = {
        limit : 10,
        artiste :'',
        direction :'ASC',
        by: 'titre'
    }

    videoStore.fetch(data, (response) => {
        this.setState({
            video : response
        });
    });
    
  }

  Paginate = () => {

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
                video : [...this.state.data, ...response]
            });
        }
    });

}

  render() {

    const { videoStore, playlist } = this.props;

    const data = toJS(videoStore.singleData);

    const currentId = data.idvideo;

    console.log(data)

    return (

      <div className="uk-container uk-margin-medium-top">

            <Helmet>
                    <title>{`Afrozik - ${ data.titre }`}</title>
            </Helmet>
            <ul className="uk-breadcrumb">
                <li><Link to="/videos">Vidéos</Link></li>
                <li><span>{data.titre}</span></li>
            </ul>

        <div className="">

          <div className="uk-grid-small uk-margin-medium-bottom" uk-grid="">

                <div className="uk-width-expand uk-height-large">
                       
                       
                    <QierPlayer srcOrigin={data.fichier} language="fr" width="100%" height="100%"/>
                    

                    <div className="uk-section uk-section-small uk-position-relative uk-margin-top" uk-grid="true">
                        <div className="uk-flex uk-flex-middle uk-width-expand">
                            <div>
                                <h1 className="uk-h4 uk-text-bold uk-margin-remove">{data.titre}</h1>  
                                {playlist && (
                                  <Link to="#" className="uk-link-reset">Auteur de la playlist</Link>
                                )}               
                                
                            </div>
                        </div>

                        <div className="uk-text-small uk-width-1-3">
                            <div className="uk-margin-small-top">
                                <i uk-icon="heart"></i> 20
                            </div>
                            {playlist && (
                              <div>
                                <div className="uk-margin-small-top">
                                    Mise à jour : 30 Déc. 2019
                                </div>
                                <div className="uk-margin-small-top">
                                    20 titres
                                </div>
                              </div>
                            )}
                            
                        </div>
                    </div>

                </div>
                {playlist && (
                    <div className="uk-width-1-3 uk-height-large listing">
                    
                        <div className="js-wrapper">

                            <h1 className="uk-h5 uk-text-bold">Playlist : 
                            <small>Nom playlist</small> </h1>

                            <div uk-overflow-auto="selContainer: .listing; selContent: .js-wrapper">
                                <div className="uk-grid-small" uk-grid="">
                                    <Suggest play={true} current={true}/>
                                    <Suggest play={true}/>
                                    <Suggest play={true}/>
                                    <Suggest play={true}/>
                                    <Suggest play={true}/>
                                    <Suggest play={true}/>
                                    <Suggest play={true}/>
                                    <Suggest play={true}/>
                                    <Suggest play={true}/>
                                    <Suggest play={true}/>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                <div className="uk-width-1-1 uk-margin-large-top">
                    <div className="uk-card uk-card-default uk-card-body uk-card-small show-detail uk-margin-medium-top" hidden>
                        <p>Lorem ipsum sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </div> 
          </div>

          <div className="uk-grid-small uk-grid-match" uk-grid="">

            <div className="uk-width-1-1"> 

              <ul className="uk-subnav uk-margin-remove-bottom" uk-margin="">                
                <li><Link to="#" className="uk-button uk-button-default uk-button-special uk-border-rounded uk-button-small"> <span uk-icon="heart"></span> Ajoute</Link></li>
                <li><button className="uk-button uk-button-primary uk-button-special uk-border-rounded uk-button-small" uk-toggle="target: .show-detail; animation: uk-animation-fade;"> <span uk-icon="list"></span> Details</button></li>
                <li>
                  <button className="uk-button uk-button-secondary uk-button-special uk-border-rounded uk-button-empty uk-button-small"> <span uk-icon="more"></span> </button>
                  <div uk-dropdown="mode: hover; pos: right-center" className="uk-width-large uk-dropdown-block">
                    <ul className="uk-nav-default" uk-nav="">
                      {!playlist && (
                        <li><Link to="#"><span className="uk-margin-small-right" uk-icon="plus"></span> Ajouter à ma playlist</Link></li>
                      )}                      
                      <li><Link to="#"><span className="uk-margin-small-right" uk-icon="social"></span> Partager</Link></li>
                      <li><Link to="#"><span className="uk-margin-small-right" uk-icon="warning"></span> Signaler un problème</Link></li>
                    </ul>
                  </div>
                </li>
              </ul>
              
              <hr />       

              <section className="uk-width-1-1 uk-margin-medium-bottom">
                <div className="uk-child-width-1-4 uk-margin-bottom" uk-grid="true">
                  {this.state.video.length > 0 && (

                      this.state.video.map((data, index) => {
                          const currentData = toJS(data); 

                          if(currentData.idvideo !== currentId){
                            return(
                                <Video key={index} data={currentData}/>
                            )
                          }                             
                          
                      })
                  )}
                  
                </div>
                <button className="uk-button uk-button-afro" onClick={() => this.Paginate()}>Charger plus...</button>
              </section>

            </div>

          </div>


        </div>

      </div>

    )
  }
}