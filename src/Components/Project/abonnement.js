import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { inject, observer } from 'mobx-react';

class Abonnement extends Component {

  render() {

    return (
        <div className="uk-section uk-section-small">
            <div className="titreArti uk-section uk-section-xsmall uk-text-center uk-margin">
                <h1 className="uk-margin-remove" style={{ "color" : "#1e87f0" }}>Choisissez une offre et faites-vous Plaisir</h1>
            </div>

            <table className="uk-table uk-table-divider uk-table-middle">
                <thead className="uk-text-center">
                    <tr>
                        <td></td>
                        <td className="colorviolet">AfroZikBox Gratuit <br /> 0 XAF <br /> / mois</td>
                        <td className="colorviolet">AfroZikBox Classique <br /> 4.000 XAF <br /> / mois</td>
                        <td className="colorbleu">AfroZikBox Premium <br /> 5.000 XAF <br /> / mois</td>
                        <td className="colorviolet">AfroZikBox Famille <br /> 10.000 XAF <br /> / mois</td>
                        <td className="colorviolet">AfroZikBox Étudiant <br /> 2.500 XAF <br /> / mois</td>                        
                    </tr>
                </thead>
                <tbody className="uk-text-center">
                    <tr>
                        <td className="colorviolet">Écoute limitée</td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                    </tr>
                    <tr>
                        <td className="colorviolet">Lecture Playlist</td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                    </tr>
                    <tr>
                        <td className="colorviolet">Création Playlist</td>
                        <td><i className="fas fa-frown fa-2x" style={{ "color" : "#1e87f0" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                    </tr>
                    <tr>
                        <td className="colorviolet">Partage Playlist</td>
                        <td><i className="fas fa-frown fa-2x" style={{ "color" : "#1e87f0" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                    </tr>
                    <tr>
                        <td className="colorviolet">Accès à tous les titres</td>
                        <td><i className="fas fa-frown fa-2x" style={{ "color" : "#1e87f0" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                    </tr>
                    <tr>
                        <td className="colorviolet">Sans publicité</td>
                        <td><i className="fas fa-frown fa-2x" style={{ "color" : "#1e87f0" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                    </tr>
                    <tr>
                        <td className="colorviolet">Zapping illimité</td>
                        <td><i className="fas fa-frown fa-2x" style={{ "color" : "#1e87f0" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                    </tr>
                    <tr>
                        <td className="colorviolet">Mode hors connexion</td>
                        <td><i className="fas fa-frown fa-2x" style={{ "color" : "#1e87f0" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                    </tr>
                    <tr>
                        <td className="colorviolet">Mode Hi-fi</td>
                        <td><i className="fas fa-frown fa-2x" style={{ "color" : "#1e87f0" }}></i></td>
                        <td><i className="fas fa-frown fa-2x" style={{ "color" : "#1e87f0" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                        <td><i className="fas fa-smile fa-2x" style={{ "color" : "#674392" }}></i></td>
                    </tr>
                </tbody>
                <tfoot className="uk-text-center">
                    <tr>
                        <td></td>
                        <td className="colorbleu"> 
                            Lecture aléatoire <br /> <br />
                            <Link to="#" className="uk-button uk-button-afro">Inscrivez vous <br /> AfroZikBox Gratuit</Link>
                        </td>
                        <td className="colorbleu"> 
                            30 jours gratuits <br /> <br />
                            <Link to="#" className="uk-button uk-button-afro">Essayez <br /> AfroZikBox classique</Link>
                        </td>
                        <td className="colorviolet"> 
                            30 jours gratuits <br /> <br />
                            <Link to="#" className="uk-button uk-button-afroBlue">Essayez <br /> AfroZikBox Premium</Link>
                        </td>
                        <td className="colorbleu"> 
                            Jusqu'à 6 profils <br /> <br />
                            <Link to="#" className="uk-button uk-button-afro">Abonnez vous <br /> AfroZikBox Famille</Link>
                        </td>
                        <td className="colorbleu"> 
                            Économisez 50% <br /> <br />
                            <Link to="#" className="uk-button uk-button-afro">Abonnez vous <br /> AfroZikBox Étudiant</Link>
                        </td>
                        
                    </tr>
                </tfoot>
            </table>
        </div>
    )
  }
}

export default Abonnement;