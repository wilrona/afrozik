import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Helmet } from "react-helmet";
import Piste from '../../Components/Project/Piste';
import Album from './../../Components/Project/Album';
import Artiste from '../../Components/Project/Artiste';

import { toJS } from 'mobx';

import { inject, observer } from 'mobx-react';

@inject('artisteStore', 'albumStore', 'eventStore', 'pisteStore')
@observer
export default class ArtisteSingle extends Component {

  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);

    this.state = {
      disco : null,
      offsetDisco : 0,
      limitDisco : 10,
      piste: null,
      offsetPiste : 0,
      limitPiste : 10,
      event: null,
      offsetEvent : 0,
      limitEvent : 10
    }

  }

  UNSAFE_componentWillMount = () => {

    const { artisteStore, albumStore, eventStore, pisteStore} = this.props;

    artisteStore.setId(this.props.match.params.artiste_id)

    let value = {
      limit : this.state.limitDisco,
      artiste : this.props.match.params.artiste_id,
    }

    albumStore.fetch(value, (response) => {
      this.setState({
        disco : response
      })
    });

    value = {
      limit : this.state.limitEvent,
      artiste : this.props.match.params.artiste_id
    }

    eventStore.fetch(value, (response) => {
      this.setState({
        event : response
      })
    })

    
    value = {
      limit : this.state.limitPiste,
      artiste : this.props.match.params.artiste_id,
    }

    pisteStore.fetch(value, (response) => {
      this.setState({
        piste : response
      })
    });
    
  }

  PaginationDisco = () => {

      const { albumStore } = this.props;
      
      albumStore.initOffset(this.state.offset);

      this.setState({
          offset : this.state.offset + 1
      })

      let data = {
        limit : this.state.limit,
        artiste : this.props.match.params.artiste_id,
      }

      albumStore.fetch(data, (response) => {
          if(!response){
            this.setState({
              offset : 0
            })
          }else{
            this.setState({
                disco : [...this.state.disco, ...response]
            });
          }
      });
  }

  PaginationPiste = () => {

    const { pisteStore } = this.props;
    
    pisteStore.initOffset(this.state.offsetPiste);

    this.setState({
        offsetPiste : this.state.offsetPiste + 1
    })

    let data = {
      limit : this.state.limitPiste,
      sortie : this.props.match.params.artiste_id,
      playlist : '',
      by : '',
      direction : ''
    }

    pisteStore.fetch(data, (response) => {
        if(!response){
          this.setState({
            offsetPiste : 0
          })
        }else{
          this.setState({
              piste : [...this.state.piste, ...response]
          });
        }
    });
  }

  PaginationEvent = () => {

    const { eventStore } = this.props;
    
    eventStore.initOffset(this.state.offsetEvent);

    this.setState({
        offsetEvent : this.state.offsetEvent + 1
    })

    let data = {
      limit : this.state.limitEvent,
      sortie : this.props.match.params.artiste_id,
      playlist : '',
      by : '',
      direction : ''
    }

    eventStore.fetch(data, (response) => {
        if(!response){
          this.setState({
            offsetEvent : 0
          })
        }else{
          this.setState({
              event : [...this.state.event, ...response]
          });
        }
    });
}


  render() {

    const { artisteStore } = this.props;

    const data = toJS(artisteStore.singleData);

    console.log(data);

    return (

      <div>
            

        <div className="">
            <Helmet>
                    <title>{`Afrozik - ${ data.nom_artiste_public }`}</title>
            </Helmet>
          <div className="uk-grid-small uk-grid-match uk-padding" uk-grid=''>
            
            <div className="uk-width-1-1">
            <ul className="uk-breadcrumb ">
                <li><Link to="/artistes">Artistes</Link></li>
                <li><span>{data.nom_artiste_public}</span></li>
            </ul>

            </div>
            <div className="uk-width-1-4">
              <div className="">
                <div className="uk-position-relative uk-transition-toggle">

                  <div className="uk-inline-clip uk-light uk-height-medium uk-flex uk-flex-middle uk-flex-center">
                    <img src={data.photo_profil} className="uk-border-circle" alt="" />
                  </div>

                </div>
              </div>
            </div>
            <div className="uk-width-expand">
              <div className="uk-card uk-card-body uk-card-small uk-flex uk-flex-middle">

                <div>
                  <h1 className="uk-h2 uk-text-bold uk-margin-remove">{data.nom_artiste_public}</h1>
                  <div className="uk-h5 uk-margin-remove">
                    {data.nombre_fan} {data.nombre_fan > 1 ? 'fans' : 'fan'} 
                  </div>

                  <div className="uk-width-1-1 uk-margin-top">
                    <ul className="uk-subnav uk-margin-remove-top uk-margin-remove-bottom" uk-margin=''>
                      {/* <li><Link to="#" className="uk-button uk-button-primary uk-button-special uk-border-rounded"> <span uk-icon="play"></span> Mix</Link></li> */}
                      <li><Link to="#" className="uk-button uk-button-default uk-button-special  uk-border-rounded"> <span uk-icon="heart"></span> Ajoute</Link></li>
                      <li>
                        <button className="uk-button uk-button-secondary uk-button-special uk-border-rounded uk-button-empty"> <span uk-icon="more"></span> </button>
                        <div uk-dropdown="mode: hover; pos: right-center" className="uk-width-large uk-dropdown-block">
                          <ul className="uk-nav-default" uk-nav=''>
                            <li><Link to="#"><span className="uk-margin-small-right" uk-icon="social"></span> Partager</Link></li>
                            <li><Link to="#"><span className="uk-margin-small-right" uk-icon="warning"></span> Signaler un problème</Link></li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="uk-width-1-1">

            <div className="uk-container uk-artiste-menu">
              <ul uk-tab='connect: .component-tab-center; animation: uk-animation-fade'>
                <li className="uk-active"><Link to="#">Discographie</Link></li>
                <li><Link to="#">Top titre</Link></li>
                <li><Link to="#">Evenements</Link></li>
                {/* <li><Link to="#">Biographie</Link></li>
                <li><Link to="#">Artistes similaires</Link></li> */}
              </ul>
            </div>
          </div>
        </div>    




        <ul className="uk-switcher component-tab-center uk-padding">
            <li>

              {this.state.disco ? (
                  <div>
                    <div className="uk-child-width-1-5 uk-margin-bottom" uk-grid="true">
                    {this.state.disco.length > 0 && (

            
                      this.state.disco.map((data, index) => {
                          const currentData = toJS(data);
                          return(
                              <Album key={index} data={currentData}/>
                          )
                      })


                    )}
                    </div>
                    <button className="uk-button uk-button-afro" onClick={() => this.PaginationDisco()}>Charger plus...</button>
                  </div>
              ) : (
                <div>
                  <h3>Aucune Discographie disponible</h3>
                </div>
            )}               

            </li>
            <li>
              {this.state.piste ? (
                <Piste data={this.state.piste} pagination={() => this.PaginationPiste()}/>
              ) : (
                <div>
                  <h3>Aucun Titre disponible</h3>
                </div>
              )}
            </li>
            <li>
                {this.state.event ? (

                    <div>
                      <div className="uk-child-width-1-5 uk-margin-bottom" uk-grid="true">
                            {this.state.event.map((data, index) => {
                                const currentData = toJS(data);
                                return(
                                  
                                    <Album key={index} data={currentData} event={true}/>
                                )
                            })}
                          </div>
                          <button className="uk-button uk-button-afro" onClick={() => this.PaginationEvent()}>Charger plus...</button>
                    </div>
                  ): (
                      <div>
                        <h3>Aucun Evenements disponible</h3>
                      </div>
                  )}  
                
            </li>
            {/* <li>
                <p>lorem</p>
            </li>
            <li>
                <div className="uk-child-width-1-5 uk-margin-bottom" margin="uk-margin-top" uk-grid="true">
                        <Artiste />
                </div>
                <button className="uk-button uk-button-afro">Charger plus...</button>
            </li> */}
        </ul>

      </div>

    )
  }
}