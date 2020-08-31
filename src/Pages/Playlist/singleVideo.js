import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Video from '../../Components/Project/Video';
import { toJS } from 'mobx';
// import Amplitude from 'amplitudejs'

import { inject, observer } from 'mobx-react';

@inject('playlistStore', 'videoStore')
@observer
export default class PlaylistVideoSingle extends Component {

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

    const { playlistStore, videoStore } = this.props;

    playlistStore.setId(this.props.match.params.playlist_id)

   
    let value = {
      limit : this.state.limit,
      playlist : this.props.match.params.playlist_id
    }

    videoStore.fetch(value, (response) => {
      this.setState({
        video : response
      })
    });
    
  }

  render() {

    const { playlistStore } = this.props;

    const data = toJS(playlistStore.singleData);

    console.log(this.state.video);

    return (

      <div className="uk-container uk-margin-medium-top">

            <Helmet>
                    <title>{`Afrozik - ${ data.titre_sortie }`}</title>
            </Helmet>

            <ul className="uk-breadcrumb">
                <li><Link to="/playlists">Playlists</Link></li>
                <li><span>{ data.titre_sortie }</span></li>
            </ul>

        <div className="">

          <div className="uk-grid-small uk-grid-match uk-margin-bottom" uk-grid="">
            <div className="uk-width-1-4">
                <div className="uk-position-relative uk-transition-toggle macths uk-flex uk-flex-middle uk-border-rounded" style={{"border":"1px solid #e5e5e5"}}>

                  <div className="uk-inline-clip uk-light">
                    <img src={data.pochette} className="uk-border-rounded" alt="" />
                  </div>

                </div>
            </div>
            <div className="uk-width-expand">
              <div className="uk-card uk-card-body uk-card-small uk-position-relative matchs">
                <h1 className="uk-h2 uk-text-bold">{ data.titre_sortie }</h1>

                <div className="uk-text-small uk-margin-top">
                  <div className="uk-margin-small-top">
                      <i uk-icon="heart"></i> {data.fan} 
                  </div>
                  <div className="uk-margin-small-top">
                      Crée le : {data.date_creation}
                  </div>
                  <div className="uk-margin-small-top">
                    {data.nombre_piste} {data.nombre_piste > 1 ? 'titres' : 'titre'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="uk-grid-small uk-grid-match" uk-grid="">

            <div className="uk-width-1-1">
              <ul className="uk-subnav uk-margin-remove-top uk-margin-remove-bottom" uk-margin="">
                <li><button  className="uk-button uk-button-primary uk-button-special uk-border-rounded uk-button-small"> <span uk-icon="play"></span> Lecture</button></li>
                <li><Link to="#" className="uk-button uk-button-default uk-button-special uk-border-rounded uk-button-small"> <span uk-icon="heart"></span> Ajoute</Link></li>
                <li>
                  <button className="uk-button uk-button-secondary uk-button-special uk-border-rounded uk-button-empty uk-button-small"> <span uk-icon="more"></span> </button>
                  <div uk-dropdown="mode: hover; pos: right-center" className="uk-width-large uk-dropdown-block">
                    <ul className="uk-nav-default" uk-nav="">                      
                      <li><Link to="#"><span className="uk-margin-small-right" uk-icon="social"></span> Partager</Link></li>
                      <li><Link to="#"><span className="uk-margin-small-right" uk-icon="warning"></span> Signaler un problème</Link></li>
                    </ul>
                  </div>
                </li>
              </ul>
              <hr />

              <section className="uk-width-1-1 uk-margin-medium-bottom">
                <div className="uk-child-width-1-4" uk-grid="true">
                  {/* <Video /> */}
                </div>
              </section>
            </div>

          </div>


        </div>

      </div>

    )
  }
}