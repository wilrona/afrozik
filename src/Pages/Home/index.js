import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

import Abonnement from '../../Components/Project/abonnement';
import NavBar from './../../Components/Layout/header';

class Home extends Component {

  render() {
    return (
      <div>

        <Helmet>
          <title>Afrozikbox</title>
        </Helmet>

        {/* <NavBar /> */}

        <div className="uk-container uk-container-small uk-margin uk-section uk-section-small">
            <div className="uk-text-center uk-margin-large-bottom">
                <p className="uk-text-lead">Pour les amateurs de musique africaine</p>
                <p>Votre plateforme de streaming musical 100 % Afro <br />
Toutes les musiques africaines que vous aimez, où que vous soyez et quand vous le souhaitez <br />
Vos albums et morceaux préférés à la fois en streaming et à l'achat <br /> <Link to="/" className="uk-margin uk-display-block">Accéder à l’AfroZikStore</Link>
</p>
            </div>

            <div className="uk-child-width-1-2 uk-child-width-expand@m uk-child-width-1-4@s uk-margin uk-margin-medium-top uk-margin-medium-bottom" uk-grid="true">
                <div>Singles</div>
                <div>Albums</div>
                <div>Vidéoclips</div>
                <div>Concerts</div>
                <div>Interviews</div>
                <div>Podcasts</div>
                <div>Événements</div>
            </div>

            <div className="uk-section uk-text-center uk-section-small">
                <Link to="#" style={{'borderRadius':'10px'}} className="uk-button uk-button-primary uk-button-large">Essayer AfroZikBox gratuitement</Link>
            </div>

            <div className="uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-3@m uk-margin-medium-top" uk-grid="true">
                <div className="uk-text-center">
                    <Link className="" style={{ "textDecoration": "none"}} to="#ecoutez" uk-toggle="true">
                        <img src="images/ecoutez.jpg" width="96" alt=""/>
                        <h4 style={{"color": "#1e87f0", "fontSize" : "17px" }} className="uk-margin-remove">
                            Écoutez de la musique en illimité, où et quand vous le souhaitez
                        </h4>
                    </Link>
                </div>
                <div className="uk-text-center">
                    <Link  style={{ "textDecoration": "none"}} to="#achetez" uk-toggle="true">
                        <img src="images/achetez.jpg" width="96" alt=""/>
                        <h4 style={{"color": "#1e87f0", "fontSize" : "17px" }} className="uk-margin-remove">Achetez et téléchargez vos albums et chansons préférés</h4>
                    </Link>
                </div>

                <div className="uk-text-center">
                    <Link className="" style={{ "textDecoration": "none"}} to="#gardez_artiste" uk-toggle="true">
                        <img src="images/gardez_artiste.jpg" width="96" alt=""/>
                        <h4 style={{"color": "#1e87f0", "fontSize" : "17px" }} className="uk-margin-remove">Gardez un contact permanent avec vos artistes préférés</h4>
                    </Link>
                </div>

                <div className="uk-text-center">
                    <Link className="" style={{ "textDecoration": "none"}} to="#ne_rLinktez" uk-toggle="true">
                        <img src="images/ne_ratez.jpg" width="96" alt=""/>
                        <h4 style={{"color": "#1e87f0", "fontSize" : "17px" }} className="uk-margin-remove">Ne ratez sous aucun prétexte un événement musical</h4>
                    </Link>
                </div>
                <div className="uk-text-center">
                    <Link className="" style={{ "textDecoration": "none"}} to="#suivez" uk-toggle="true">
                        <img src="images/suivez.jpg" width="96" alt=""/>
                        <h4 style={{"color": "#1e87f0", "fontSize" : "17px" }} className="uk-margin-remove">Découvrez les dernières news sur vos artistes préférés</h4>
                    </Link>
                </div>

                <div className="uk-text-center">
                    <Link className="" style={{ "textDecoration": "none"}} to="#differentes" uk-toggle="true">
                        <img src="images/differentes.jpg" width="96" alt=""/>
                        <h4 style={{"color": "#1e87f0", "fontSize" : "17px" }} className="uk-margin-remove">Multiples méthodes de paiement fiables et sécurisées</h4>
                    </Link>
                </div>
            </div>

            <Abonnement/>

        </div>

        

      </div >
    );
  }
}

export default Home;
