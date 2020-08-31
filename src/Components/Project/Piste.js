import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import { inject, observer } from 'mobx-react';

import moment from "moment";
import momentFR from 'moment/locale/fr';

@inject('pisteStore')
@observer
export default class Piste extends Component {

    PlayMusic = (piste_id) => {

        const { pisteStore } = this.props;
        pisteStore.setAction('play')
        pisteStore.setId(piste_id)

    }

    AddMusic = (piste_id, event) => {

        event.preventDefault();

        const { pisteStore } = this.props;
        pisteStore.setAction('add')
        pisteStore.setId(piste_id)
    
    }
    
    render() {

        const { data, pagination } = this.props;

        moment.updateLocale('fr', momentFR);
        
        return (
            <div>

                <table className="uk-table">
                    <thead>
                        <tr>
                            <th className="uk-table-shrink"></th>
                            <th></th>
                            <th></th>
                            <th className="uk-table-expand">Titre</th>
                            <th className="uk-table-shrink"></th>
                            <th className="uk-text-truncate">Artiste</th>
                            <th className="uk-table-shrink">Genre</th>
                            <th>Date de sortie</th>
                            <th className="uk-table-shrink">Durée</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {data && data.length > 0 && (

                        data.map((data, index) => {
                            return(
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><span uk-icon="icon: play-circle; ratio: 1" className="uk-button-afro" onClick={() => this.PlayMusic(data.idpiste)}></span></td>
                                <td><i className="fas fa-heart uk-fa"></i></td>
                                <td>
                                    {data.titre} <br />
                                    <Link to="#" className="uk-text-small">{data.album}</Link>
                                </td>
                                <td></td>
                                <td>
                                    {data.artistes.map((item, index_item) => 
                                        (
                                            <Link to="#" key={index_item}>{index_item !== 0 ? ',' : ''} {item.nom} </Link>
                                        )
                                    )}
                                </td>    
                                <td><Link to={"/home/genre/"+data.url_genre}>{data.libelle_genre}</Link></td>
                                <td>{moment(data.date_sortie_original).format('ll')}</td>
                                <td>{data.duree}</td>
                                <td>
                                    <Link to="" className="" uk-icon="icon: more-vertical; ratio: 1"></Link>
                                    <div uk-dropdown="mode: click; offset: 10; pos: bottom-justify" className="uk-width-large uk-dropdown-block">
                                    <ul className="uk-nav-default" uk-nav="">
                                        <li><Link to="#" onClick={(e) => this.AddMusic(data.idpiste, e)}><span className="uk-margin-small-right" uk-icon="list"></span> Ajouter à la liste d'attente</Link></li>
                                        <li><Link to="#"><span className="uk-margin-small-right" uk-icon="plus"></span> Ajouter à ma playlist</Link></li>
                                        <li><Link to="#"><span className="uk-margin-small-right" uk-icon="social"></span> Partager</Link></li>
                                    </ul>
                                    </div>
                                </td>
                            </tr>
                            )
                        })
                        
                    )}
                        
                    </tbody>
                </table>
                <button className="uk-button uk-button-afro" onClick={pagination}>Charger plus...</button>
                
            </div>
        );
    }
}

