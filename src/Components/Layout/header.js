import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';

@inject('authStore')
@observer
class NavBar extends Component {

  // eslint-disable-next-line no-useless-constructor
  constructor(props){
      super(props);
  }

  render() {

      const { authStore } = this.props;

      return (
        <nav className="uk-padding-large uk-padding-remove-vertical uk-bg-color-afro" uk-navbar="true">
            <div className="uk-navbar-left">
                <Link className="uk-navbar-item uk-logo" to="/">
                  <img src="/images/logo_afrozikbox.jpg" width ="180" alt="logo afrozikbox" />
                </Link>
            </div>

            <div className="uk-navbar-center">
                <ul className="uk-navbar-nav">
                    <li className=""><Link  to="/home">Accueil</Link></li>
                    <li className=""><Link  to="/">AfroZikStore</Link></li>
                </ul>
            </div>
            
            <div className="uk-navbar-right">

              {!authStore.isAuth && (
                <div>
                    <Link to="/register"  className="uk-button-small uk-button uk-button-default uk-margin-small-right">Créer un compte</Link>
                    <Link to="/login"  className="uk-button-small uk-button uk-button-default">Connexion</Link>
                </div>
              )}

              {authStore.isAuth && (

                <ul className="uk-navbar-nav">
                    <li>
                        <a href="#">{authStore.user.nom}</a>
                        <div className="uk-navbar-dropdown">
                            <ul className="uk-nav uk-navbar-dropdown-nav">
                                <li><a href="#">Parametre</a></li>
                                <li><a href="#" onClick={() => authStore.logout()}>Deconnexion</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
              )}
                
            </div>
        </nav>
    )
  }
}

export default NavBar;
