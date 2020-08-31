import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react';

import Nav from './nav';
import Album from './../../Components/Project/Album';
import Suggest from './../../Components/Project/Suggest';
import CommonBlock from '../../Components/Project/CommonBlock';
import Slider from '../../Components/Project/Slider';

import { toJS } from 'mobx';


@inject('genreStore', 'paysStore', 'albumStore')
@observer
class SingleOnglet extends Component {

  constructor(props){
    super(props);

    this.state = {
      genre : null,
      limitGenre : 8,
      pays : null,
      limitPays: 8,
      news : null,
      limitNews : 10,
      offsetNews : 0
    }
  }

  UNSAFE_componentWillMount(){
    
    const { genreStore, paysStore, albumStore } = this.props   

    let data = {
        limit : this.state.limitGenre
    }

    genreStore.fetch(data, (response) => {
        this.setState({
          genre : response
        });
    });

    data = {
      limit : this.state.limitPays
    }

    paysStore.fetch(data, (response) => {
      this.setState({
        pays : response
      });
    });

    data = {
      limit : this.state.limitNews,
      by : 'date_sortie_digitale',
      type: 'Single'
    }

    albumStore.fetch(data, (response) => {
      this.setState({
        news : response
      });
    });

  }

  PaginateNews = () => {

    const { albumStore } = this.props

    albumStore.initOffset(this.state.offsetNews);

    this.setState({
      offsetNews : this.state.offsetNews + 1
    })

    let data = {
        type: 'Single',
        limit : this.state.limitNews,
        by : 'date_sortie_digitale'
    }

    albumStore.fetch(data, (response) => {

        if(response){

            if(this.state.news){
                this.setState({
                  news : [...this.state.news, ...response]
                });
            }else{
                this.setState({
                  news : response
                });
            }

            
        }
    });

}

  render() {   

    return (
      <div>

        <Helmet>
          <title>Afrozik - Accueil - Singles</title>
        </Helmet>

        <Nav />

        <Slider />

        {this.state.news !== false && (
        <div className="uk-container uk-margin-top uk-margin-bottom">
            <h2>Nouveaux Singles</h2>
            <div className="uk-child-width-1-5 uk-margin-bottom" uk-grid="true">
            {this.state.news && this.state.news.length > 0 && (

            
              this.state.news.map((data, index) => {
                  const currentData = toJS(data);
                  return(
                      <Album key={index} data={currentData}/>
                  )
              })


            )}
            </div>
            <button className="uk-button uk-button-afro" onClick={() => this.PaginateNews()}>Charger plus...</button>
        </div>
        )}


        {/* <div className="uk-container uk-section uk-section-small">
          <h2>Suggestions en fonction de votre historique</h2>
          <div className="uk-child-width-1-2 uk-margin-bottom" margin="uk-margin-top" uk-grid="true">
              <Suggest explicite="true"/>
              <Suggest />
              <Suggest />
              <Suggest />
              <Suggest />
              <Suggest />
          </div>
          <button className="uk-button uk-button-afro">Charger plus...</button>
        </div>   */}

        {this.state.genre && (<CommonBlock filter="single" title="Genres" link="/home/genre" data={this.state.genre} /> )} 

        {this.state.pays && (<CommonBlock filter="single" title="Pays" link="/home/pays" data={this.state.pays} /> )}     

      </div >
    );
  }
}

export default SingleOnglet;