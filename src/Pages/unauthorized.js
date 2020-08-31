import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";



class Unauthorized extends Component {


  render() {
    return (
      <section className="section">
        <Helmet>
          <title>afrozik - Erreur 401</title>
        </Helmet>

        <div className="section-header">
          <h1>Erreur 401</h1>
        </div>

        <div className="section-body">

          <div className="page-error page-error-2">

            <div className="page-inner">
              <h1>401</h1>
              <div className="page-description">
                Vous n'avez pas les autorisations neccessaires pour consulter cette page. <br /> Contactez votre administrateur
                  </div>
              <div className="page-search">
                <div className="mt-3">
                  <Link to="/">Retour au tableau de bord</Link>
                </div>
              </div>
            </div>

          </div>


        </div>
      </section>

    );
  }
}

export default Unauthorized