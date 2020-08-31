import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// import { inject, observer } from 'mobx-react';


export default class Video extends Component {

  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {

    const {data} = this.props;

    return (
      <div className="">

        <div className="match uk-position-relative uk-transition-toggle">

          <div className="uk-inline-clip uk-light uk-margin-small-bottom">
            <img src={data.pochette} className="uk-border-rounded uk-height-small uk-width-1-1" alt="" />

            <div className="uk-overlay-primary  uk-transition-fade uk-position-cover"></div>

            <div className="uk-transition-fade uk-position-cover uk-overlay uk-flex uk-flex-center uk-flex-middle">

              <button className="uk-icon-button uk-displa" uk-icon="play"></button>
              
            </div>
          </div>         

        </div>
        
        <div>
          
        <h5 className="uk-margin-remove title_video uk-text-truncate">
              <Link to={"/videos/"+data.code_video}>{data.titre}</Link>
          
          </h5>
          <small className="uk-margin-remove" >          
            par <Link to="#" className="uk-link-muted">{data.artiste[0].nom}</Link>
          </small>

        </div>

        
      </div>
    )
  }
}