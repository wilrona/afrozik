import React from 'react';
import { Link, withRouter } from "react-router-dom";


class Player extends React.Component {

  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);

  }

  componentDidMount() {   
     
    window.Amplitude.init({
        "bindings": {
          37: 'prev',
          39: 'next',
          32: 'play_pause'
        }
      });


    /*
      Handles a click on the song played progress bar.
    */
    document.getElementById('song-played-progress').addEventListener('click', function (e) {
      var offset = this.getBoundingClientRect();
      var x = e.pageX - offset.left;

      window.Amplitude.setSongPlayedPercentage((parseFloat(x) / parseFloat(this.offsetWidth)) * 100);
    });

  }

  render() {

    return (
      <nav className="uk-navbar-transparent uk-padding uk-padding-remove-vertical uk-background-default uk-position-fixed uk-position-bottom uk-box-shadow-small" uk-navbar="mode: click">

        <div className="uk-navbar-left">

          <ul className="uk-navbar-nav">
            <li>
              <div className="amplitude-prev size-playeur" id="previous"></div>
            </li>
            <li className="play">
              <div className="amplitude-play-pause size-playeur" id="play-pause"></div>
            </li>
            <li>
              <div className="amplitude-next size-playeur" id="next"></div>
            </li>
          </ul>

        </div>

        <div className="uk-navbar-center uk-width-1-2">



          <div className="uk-grid-collapse uk-child-width-expand uk-width-1-1" uk-grid="true">
            <div className="uk-width-1-1 uk-flex uk-flex-middle">

              <div className="uk-padding-large uk-padding-remove-vertical uk-title-song">
                <Link to="" className=""><span data-amplitude-song-info="name" className="song-name"></span></Link> -
                <Link to="" className=""><span data-amplitude-song-info="artist"></span></Link>
              </div>

            </div>
            <div className="uk-flex uk-flex-center"><span className="amplitude-current-time time-container">00:00</span></div>
            <div className="uk-flex uk-flex-middle uk-width-5-6">
              <div className="uk-position-relative uk-width-1-1">
                <progress id="song-played-progress" className="amplitude-song-played-progress" value="0"></progress>
                <progress id="song-buffered-progress" className="amplitude-buffered-progress" value="0"></progress>
              </div>
            </div>
            <div className="uk-flex uk-flex-center"><span className="amplitude-duration-time time-container">00:00</span></div>
          </div>

        </div>

        <div className="uk-navbar-right">

          <ul className="uk-navbar-nav">
            <li>
              <div className="amplitude-shuffle amplitude-shuffle-off size-playeur" id="shuffle"></div>
            </li>
            <li>
              <div className="amplitude-repeat amplitude-repeat-off size-playeur" id="repeat"></div>
            </li>
            <li className="uk-flex uk-flex-middle">
              <div className="amplitude-volume size-playeur" id="volume"></div>
              <div className="uk-navbar-dropdown" uk-dropdown="pos: top">
                <ul className="uk-nav uk-navbar-dropdown-nav">
                  <li>
                    <div id="volume-container">
                      <input type="range" className="amplitude-volume-slider" step=".1" />
                    </div>

                  </li>
                </ul>
              </div>

            </li>
          </ul>


        </div>

      </nav>
    );

  }

}

export default withRouter(({ location, ...props }) => {
  // const isActive = location.pathname === props.to;
  return location.pathname !== '/' && location.pathname !== '/register' && location.pathname !== '/login' ? <Player {...props} /> : '';
});
