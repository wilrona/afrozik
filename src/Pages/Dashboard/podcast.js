import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react';

import Nav from './nav';
import Album from './../../Components/Project/Album';
import CommonBlock from '../../Components/Project/CommonBlock';
import Slider from '../../Components/Project/Slider';
import { toJS } from 'mobx';

@inject('genreStore', 'albumStore')
@observer
class PodcastOnglet extends Component {

    constructor(props){
      super(props);

      this.state = {
        genre : null,
        limitGenre : 8,
        news : null,
        limitNews : 10,
        offsetNews : 0
      }
    }

    UNSAFE_componentWillMount(){
    
      const { genreStore, albumStore } = this.props   
  
      let data = {
          limit : this.state.limitGenre
      }
  
      genreStore.fetch(data, (response) => {
          this.setState({
            genre : response
          });
      });

      data = {
        limit : this.state.limitNews,
        by : 'date_sortie_digitale',
        type: 'podcast'
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
          type: 'podcast',
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
              <title>Afrozik - Accueil - Podcasts</title>
            </Helmet>
    
            <Nav />
            
            <Slider />

            {this.state.news !== false && (
                <div className="uk-container uk-section uk-section-small">
                    <h2>Nouveaux Podcasts</h2>
                    <div className="uk-child-width-1-5 uk-margin-bottom" uk-grid="true">
                    {this.state.news && this.state.news.length > 0 && (

                    
                      this.state.news.map((data, index) => {
                          const currentData = toJS(data);
                          return(
                              <Album key={index} data={currentData} podcast={true}/>
                          )
                      })


                    )}
                    </div>
                    <button className="uk-button uk-button-afro" onClick={() => this.PaginateNews()}>Charger plus...</button>
                </div>
            )}

            {/* <div className="uk-container uk-section uk-section-small">
                <h2>Podcasts recommandés</h2>
                <div className="uk-child-width-1-5 uk-margin-bottom" uk-grid="true">
                  <Album />
                </div>
                <button className="uk-button uk-button-afro">Charger plus...</button>
            </div> */}

            <div className="uk-container uk-section uk-section-small">
                <h2>Top podcast</h2>
                <div className="uk-child-width-1-5 uk-margin-bottom" uk-grid="true">
                  {/* <Album /> */}
                </div>
            </div>
    
            {this.state.genre && (<CommonBlock filter="single" title="Genres" link="/home/genre" data={this.state.genre} /> )} 
    
          </div >
        );
    }
}

export default PodcastOnglet;