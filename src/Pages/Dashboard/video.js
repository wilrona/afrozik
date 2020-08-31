import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react';

import Nav from './nav';
import CommonBlock from '../../Components/Project/CommonBlock';

import Slider from '../../Components/Project/Slider';
import Video from '../../Components/Project/Video';

import { toJS } from 'mobx';

@inject('genreStore', 'videoStore')
@observer
class VideoOnglet extends Component {

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
    
      const { genreStore } = this.props   

      let data = {
          limit : this.state.limitGenre
      }

      genreStore.fetch(data, (response) => {
          this.setState({
            genre : response
          });
      });

      const { videoStore } = this.props   

      data = {
          limit : this.state.limitNews,
          by: 'date_publication'
      }

      videoStore.fetch(data, (response) => {
          this.setState({
            news : response
          });
      });

    }

    PaginateNews = () => {

        const { videoStore } = this.props

        videoStore.initOffset(this.state.offsetNews);

        this.setState({
            offsetNews : this.state.offsetNews + 1
        })

        let data = {
            limit : this.state.limitNews,
            by: 'date_publication'
        }

        videoStore.fetch(data, (response) => {
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
              <title>Afrozik - Accueil - Videos</title>
            </Helmet>
    
            <Nav />

            <Slider video={true}/>
            {this.state.news !== false && (
              <div className="uk-container uk-section uk-section-small">
                  <h2>Nouvelles Videos</h2>
                  <div className="uk-child-width-1-4 uk-margin-bottom" uk-grid="true">
                  {this.state.news && this.state.news.length > 0 && (

                          this.state.news.map((data, index) => {
                              const currentData = toJS(data);
                              return(
                                  <Video key={index} data={currentData}/>
                              )
                          })

                  )}
                  </div>
                  <button className="uk-button uk-button-afro" onClick={() => {this.PaginateNews()}}>Charger plus...</button>
              </div>
            )}

            {/* <div className="uk-container uk-section uk-section-small">
                <h2>Videos recommandées</h2>
                <div className="uk-child-width-1-4 uk-margin-bottom" uk-grid="true">
                  <Video />
                </div>
                <button className="uk-button uk-button-afro">Charger plus...</button>
            </div> */}

            {/* <div className="uk-container uk-section uk-section-small">
                <h2>Toplist de la semaine</h2>
                <div className="uk-child-width-1-4 uk-margin-bottom" uk-grid="true">
                  <Video />
                </div>
            </div> */}
    
    
          </div >
        );
    }
}

export default VideoOnglet;