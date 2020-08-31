import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

import { toJS } from 'mobx';

import { inject, observer } from 'mobx-react';

import moment from "moment";
import momentFR from 'moment/locale/fr';

@inject('eventStore')
@observer
export default class EventSingle extends Component {

  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);

  }

  UNSAFE_componentWillMount = () => {

    const { eventStore } = this.props;

    eventStore.setId(this.props.match.params.event_id)
    
  }  

  render() {

    const { eventStore } = this.props;

    const data = toJS(eventStore.singleData);
    moment.updateLocale('fr', momentFR);

    console.log(data);

    return (

      <div className="uk-container uk-margin-medium-top">

            <Helmet>
              <title>{`Afrozik - ${ data.titre }`}</title>
            </Helmet>
            <ul className="uk-breadcrumb">
                <li><Link to="/events">Evenement</Link></li>
                <li><span>{ data.titre }</span></li>
            </ul>

            <div className="">

              <div className="uk-grid-small uk-grid-match uk-margin-bottom" uk-grid="" uk-height-match="target: > div > .matchs">
                  <div className="uk-width-1-4">
                      <div className="uk-position-relative uk-transition-toggle macths uk-flex uk-flex-middle">

                        <div className="uk-inline-clip uk-light">
                          <img src={data.affiche} className="uk-border-rounded" alt="" />
                        </div>

                      </div>
                  </div>
                  <div className="uk-width-expand">
                    <div className="uk-card uk-card-body uk-card-small uk-position-relative matchs">
                      <h1 className="uk-h2 uk-text-bold uk-margin-remove">{ data.titre }</h1>
                      <div className="uk-h5 uk-margin-remove">                        
                        Organisateur : { data.organisateur }
                      </div>
                      <div className=" uk-margin-top uk-margin-remove-bottom">                        
                        <strong className=""><i uk-icon="icon: calendar; ratio: 1"></i> :</strong> { moment(data.date_debut).format('ll') } {data.date_fin && (<span><strong>au</strong> {moment(data.date_fin).format('ll')} </span>)}
                      </div>
                      <div className=" uk-margin-top uk-margin-remove-bottom">                        
                        <strong className=""><i uk-icon="icon: clock; ratio: 1"></i> :</strong> { data.heure_debut } {data.heure_fin && (<span><strong>à</strong> {data.heure_fin}</span>)}
                      </div>
                      <div className=" uk-margin-top uk-margin-remove-bottom">
                        <strong className=""><i uk-icon="icon: location; ratio: 1"></i> :</strong> { data.lieu_event }
                      </div>
                      
                    </div>
                  </div>

              </div>

              <div className="uk-grid-small uk-grid-match" uk-grid="">

                <div className="uk-width-1-1">
                  <ul className="uk-subnav uk-margin-remove-top uk-margin-remove-bottom" uk-margin="">
                    
                    <li><Link to="#" className="uk-button uk-button-default uk-button-special uk-border-rounded uk-button-small"> <span uk-icon="heart"></span> Ajouter</Link></li>
                    <li><Link to="#" className="uk-button uk-button-default uk-button-special uk-border-rounded uk-button-small"> <span uk-icon="comment"></span> Commenter</Link></li>
                    <li><Link to="#" className="uk-button uk-button-default uk-button-special uk-border-rounded uk-button-small"> <span uk-icon="copy"></span> Participer</Link></li>
                    <li><Link to="#" className="uk-button uk-button-default uk-button-special uk-border-rounded uk-button-small"> <span uk-icon="album"></span> Reserver</Link></li>
                    <li>
                      <button className="uk-button uk-button-default uk-button-special uk-border-rounded uk-button-small"> <span uk-icon="more"></span> </button>
                      <div uk-dropdown="mode: hover" className="uk-width-large uk-dropdown-block">
                        <ul className="uk-nav-default" uk-nav="">                          
                          <li><Link to="#"><span className="uk-margin-small-right" uk-icon="social"></span> Partager</Link></li>
                          <li><Link to="#"><span className="uk-margin-small-right" uk-icon="warning"></span> Signaler un problème</Link></li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                  <hr />

                  <section className="uk-width-1-1 uk-margin-medium-bottom">

                    <div className="uk-grid-small uk-grid-match uk-margin-bottom" uk-grid="">

                          <div className="uk-width-2-3">
                              <div className="uk-margin-small-bottom uk-margin-small-top">
                                  {data.description_event}
                              </div> 
                              <div>
                                <h3>Plus de renseignement</h3>
                                <div>
                                  <strong>Numéro de téléphone : </strong> {data.contact_organisateur}<br/>
                                  <strong>Site de l'évènement : </strong> {data.url_site_event}
                                </div>
                              </div>                         
                          </div>
                          <div className="uk-width-1-3">
                            <h3 className="uk-margin-remove">Artistes participants</h3>
                            
                            <ul className="uk-list uk-list-divider">

                                {data.artiste_prin && (<li>{data.artiste_prin}</li>) }

                                {data.artiste_inv && (

                                  data.artiste_inv.split(";").map((arti, index) => {
                                      return (
                                        <li>{data.artiste_inv}</li>
                                      )
                                  })
                                  
                                )}
                            </ul>

                            <h3>Tarifs d'entrée</h3>
                            
                            <ul className="uk-list uk-list-divider">

                                {data.tarif1 && (<li>
                                  <li><strong>{data.categorie1} : </strong>{data.tarif1}{data.devise}</li>
                                </li>) }

                                {data.tarif2 && (<li>
                                  <li><strong>{data.categorie2} : </strong>{data.tarif2}{data.devise}</li>
                                </li>) }

                                {data.tarif3 && (<li>
                                  <li><strong>{data.categorie3} : </strong>{data.tarif3}{data.devise}</li>
                                </li>) }

                                {data.tarif4 && (<li>
                                  <li><strong>{data.categorie4} : </strong>{data.tarif4}{data.devise}</li>
                                </li>) }
                                
                            </ul>
                            
                          </div>

                    </div>

                  </section>
                </div>

              </div>
            </div>

      </div>

    )
  }
}