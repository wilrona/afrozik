import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { inject, observer } from 'mobx-react';
import moment from "moment";
import momentFR from 'moment/locale/fr';


@inject('pisteStore')
@observer
export default class Album extends Component {

  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  PlayPiste = (album_id) => {

    const { pisteStore } = this.props;

    const values = {
      limit: '',
      offset: '', 
      by: 'titre', 
      direction: 'ASC', 
      sortie: album_id, 
      playlist: ''
    }

    pisteStore.getAll(values, (errors) => {

      if (typeof errors === 'object' && errors.status === 200) {

          const data = errors.data;

          data.map((piste, index) => {

            if(index === 0){
               pisteStore.setAction('play')
          
            }else{
              pisteStore.setAction('add')
            }

            pisteStore.setId(piste.idpiste)
          })
      }    

    })    

  }

  render() {

    const {data} = this.props;
    moment.updateLocale('fr', momentFR);
    
    return (
      <div className="">
        <div className="match uk-position-relative uk-transition-toggle uk-border-rounded" style={{"border":"1px solid #e5e5e5"}}>

          <div className="uk-inline-clip uk-light uk-height-small">
            <img src={this.props.event ? data.affiche : data.pochette} className="uk-border-rounded uk-height-small uk-width-1-1" alt="" />
          </div>

          <div className="uk-margin-bottom uk-margin-left uk-visible@m uk-position-bottom-left">

            {(!this.props.event) && (
              <button to="#" onClick={() => this.PlayPiste(data.code_sortie)} className="uk-icon-button" uk-icon="play"></button>
            )}            

            <div className="uk-transition-slide-bottom-small uk-display-inline">

              <Link to="" className="uk-icon-button" uk-icon="heart"></Link>
              <button className="uk-icon-button" uk-icon="more"></button>
              <div uk-dropdown="mode: hover; pos: right-center"
                className="uk-width-large uk-dropdown-block">
                <ul className="uk-nav-default" uk-nav="">

                  {!this.props.event || this.props.playlist && (
                    <li><Link to="#"><span className="uk-margin-small-right" uk-icon="list"></span>
                    Ajouter à la liste d'attente</Link></li>                    
                  )}

                  {!this.props.event || !this.props.playlist && (
                    <li><Link to="#"><span className="uk-margin-small-right" uk-icon="plus"></span>
                    Ajouter à ma playlist</Link></li>                    
                  )}                  
                  
                  <li><Link to="#"><span className="uk-margin-small-right" uk-icon="social"></span>
                    Partager</Link></li>


                  {(!this.props.event) && (
                    <li><Link to="#"><span className="uk-margin-small-right"
                    uk-icon="warning"></span> Signaler un problème</Link></li>
                  )}
                  
                </ul>
              </div>
            </div>
          </div>

        </div>
        {!this.props.playlist && !this.props.event && (

            <div className="uk-margin-small-top">

              <h5 className="uk-margin-remove uk-text-truncate">

                {!this.props.podcast ? (
                  <Link to={"/albums/"+data.code_sortie}>{data.titre_sortie}</Link>
                ) : (
                  <Link to={"/podcasts/"+data.code_sortie}>{data.titre_sortie}</Link>
                )}
                
              </h5>
              <small className="uk-margin-remove" >
                par <Link className="uk-link-muted" to={"/artistes/"+data.idartiste}>{data.nom_artiste}</Link>
              </small>
    
            </div>

        )}

        {this.props.playlist && (
            <div className="uk-margin-small-top">

              <h5 className="uk-margin-remove uk-text-truncate">                
                {!this.props.video ? (
                    <Link to={"/playlists-audio/"+data.codeplaylist}>{data.titre_sortie}</Link>
                ): (
                  <Link to={"/playlists-video/"+data.codeplaylist}>{data.titre_sortie}</Link>
                )}
              </h5>
              <small className="uk-margin-remove uk-text-small" style={{"color": "#452169"}}>
                <i uk-icon="heart"></i> {data.fan}
              </small>
    
            </div>
        )}

        {this.props.event && (
            <div className="uk-text-center uk-margin-small-top">
                <h6 className="uk-text-danger uk-margin-remove uk-text-center">{moment(data.date_debut).format('ll')} {data.heure_debut}</h6>
                <h5 className="uk-margin-remove uk-text-truncate uk-text-center">
                  <Link to={"/events/"+data.code_event}>{data.titre}</Link>
                </h5>
                <small className="uk-margin-remove uk-text-small uk-text-center">
                  {data.lieu_event}
                </small>
            </div>
        )}
        
      </div>
    )
  }
}