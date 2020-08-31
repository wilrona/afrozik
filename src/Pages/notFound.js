import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";


class notFound extends Component {


  render() {
    return (
      <section className="section">
        <Helmet>
          <title>afrozik - Erreur 404</title>
        </Helmet>
        <div className="container mt-5">
          <div className="page-error">
            <div className="page-inner">
              <h1>404</h1>
              <div className="page-description">
                Cette page n'existe pas
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

export default notFound