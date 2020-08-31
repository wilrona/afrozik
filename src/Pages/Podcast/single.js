import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Piste from '../../Components/Project/Piste';

import { toJS } from 'mobx';

import moment from "moment";
import momentFR from 'moment/locale/fr';

import { inject, observer } from 'mobx-react';

@inject('albumStore', 'pisteStore')
@observer
export default class PodcastSingle extends Component {

  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);

    this.state = {
      piste : [],
      offset : 0,
      limit : 10
    }

  }

  UNSAFE_componentWillMount = () => {

    const { albumStore, pisteStore } = this.props;

    albumStore.setId(this.props.match.params.podcast_id)

   
    let value = {
      limit : this.state.limit,
      sortie : this.props.match.params.podcast_id,
      playlist : '',
      by : '',
      direction : ''
    }

    pisteStore.fetch(value, (response) => {
      this.setState({
        piste : response
      })
    });
    
  }

  PaginationPiste = () => {

        const { pisteStore } = this.props;
        
        pisteStore.initOffset(this.state.offset);

        this.setState({
            offset : this.state.offset + 1
        })

        let data = {
          limit : this.state.limit,
          sortie : this.props.match.params.podcast_id,
          playlist : '',
          by : '',
          direction : ''
        }

        pisteStore.fetch(data, (response) => {
            if(!response){
              this.setState({
                offset : 0
              })
            }else{
              this.setState({
                  piste : [...this.state.piste, ...response]
              });
            }
        });
  }



  AddPiste = () => {

    const { pisteStore } = this.props;

    this.state.piste.map((piste, index) => {
      pisteStore.setAction('add')
      pisteStore.setId(piste.idpiste)
    })
      
  }

  PlayPiste = () => {

    const { pisteStore } = this.props;

    pisteStore.data.map((piste, index) => {

      if(index === 0){
         pisteStore.setAction('play')
    
      }else{
        pisteStore.setAction('add')
      }

      pisteStore.setId(piste.idpiste)
    })
      
  }

  AddPiste = (event) => {

    event.preventDefault();

    const { pisteStore } = this.props;

    pisteStore.data.map((piste, index) => {
      pisteStore.setAction('add')
      pisteStore.setId(piste.idpiste)
    })
      
  }

  render() {

    const { albumStore, pisteStore } = this.props;

    const data = toJS(albumStore.singleData);
        
    moment.updateLocale('fr', momentFR);

    return (

      <div className="uk-container uk-margin-medium-top">

            <Helmet>
              <title>{`Afrozik - ${ data.titre_sortie }`}</title>
            </Helmet>
            <ul className="uk-breadcrumb">
                <li><Link to="/podcasts">Podcasts</Link></li>
                <li><span>{ data.titre_sortie }</span></li>
            </ul>

        <div className="">

          <div className="uk-grid-small uk-grid-match uk-margin-bottom" uk-grid="" uk-height-match="target: > div > .matchs">
            <div className="uk-width-1-4">
                <div className="uk-position-relative uk-transition-toggle macths">

                  <div className="uk-inline-clip uk-light">
                    <img src={data.pochette} className="uk-border-rounded" alt="" />
                  </div>
                  <div className="uk-margin-bottom uk-margin-left uk-visible@m uk-position-bottom-left">

                    <button className="uk-icon-button" uk-icon="play" onClick={() => this.PlayPiste()}></button>
                  </div>

                </div>
            </div>
            <div className="uk-width-expand">
              <div className="uk-card uk-card-body uk-card-small uk-position-relative matchs">
                <h1 className="uk-h2 uk-text-bold">{ data.titre_sortie }</h1>
                <div className="uk-h3 uk-margin-remove">
                  <span className="uk-icon uk-icon-image uk-icon-album uk-border-circle uk-box-shadow-medium uk-margin-small-right" style={{ backgroundImage: "url(../images/albums/album_1.jpg)" }}></span>
                  <Link to={"/artistes/"+data.idartiste} className="uk-link-reset">{data.nom_artiste}</Link>
                </div>

                <div className="uk-text-small uk-margin-top">
                  <div className="uk-margin-small-top">
                      <i uk-icon="heart"></i> {data.nombre_fan} 
                  </div>
                  <div className="uk-margin-small-top">
                      Sortie le : {moment(data.date_sortie_original).format('ll')}
                  </div>
                  <div className="uk-margin-small-top">
                    {data.nombre_piste} {data.nombre_piste > 1 ? 'titres' : 'titre'}
                  </div>
                </div>
              </div>
            </div>

            <div className="uk-width-1-1 uk-margin-top">
                    <div className="uk-card uk-card-default uk-card-body uk-card-small show-detail" hidden>
                        <p>{data.description_sortie}</p>
                    </div>
                </div>
          </div>

          <div className="uk-grid-small uk-grid-match" uk-grid="">

            <div className="uk-width-1-1">
              <ul className="uk-subnav uk-margin-remove-top uk-margin-remove-bottom" uk-margin="">
                <li><button  className="uk-button uk-button-primary uk-button-special uk-border-rounded uk-button-small" onClick={() => this.PlayPiste()}> <span uk-icon="play"></span> Ecouter</button></li>
                <li><Link to="#" className="uk-button uk-button-default uk-button-special uk-border-rounded uk-button-small"> <span uk-icon="heart"></span> Ajoute</Link></li>
                <li><button className="uk-button uk-button-primary uk-button-special uk-border-rounded uk-button-small" uk-toggle="target: .show-detail; animation: uk-animation-fade;"> <span uk-icon="list"></span> Details</button></li>
                <li>
                  <button className="uk-button uk-button-secondary uk-button-special uk-border-rounded uk-button-empty uk-button-small"> <span uk-icon="more"></span> </button>
                  <div uk-dropdown="mode: hover; pos: right-center" className="uk-width-large uk-dropdown-block">
                    <ul className="uk-nav-default" uk-nav="">
                      <li><Link to="#" onClick={(e) => this.AddPiste(e)}><span className="uk-margin-small-right" uk-icon="list"></span> Ajouter à la liste d'attente</Link></li>
                      <li><Link to="#"><span className="uk-margin-small-right" uk-icon="social"></span> Partager</Link></li>
                      <li><Link to="#"><span className="uk-margin-small-right" uk-icon="warning"></span> Signaler un problème</Link></li>
                    </ul>
                  </div>
                </li>
              </ul>
              <hr />

              <section className="uk-width-1-1 uk-margin-medium-bottom">
                <Piste 
                  data={this.state.piste} 
                  pagination={() => this.PaginationPiste()}
                />
              </section>
            </div>

          </div>


        </div>

      </div>

    )
  }
}