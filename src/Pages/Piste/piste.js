import React, { Component } from 'react';

import { Helmet } from "react-helmet";
import Piste from '../../Components/Project/Piste';
import Suggest from '../../Components/Project/Suggest';

import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';


@inject('pisteStore')
@observer
class singlePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data : [],
            offset : 0,
            limit : 10
        }
        
    }
    
    
    UNSAFE_componentWillMount(){
    
        const { pisteStore } = this.props;

        let data = {
            limit : this.state.limit,
            sortie : '',
            playlist : '',
            by : '',
            direction : ''
        }

        pisteStore.fetch(data, (response) => {
            this.setState({
                data : response
            });
        });

    }

    PaginationPiste = () => {

        const { pisteStore } = this.props;
        
        pisteStore.initOffset(this.state.offset);

        this.setState({
            offset : this.state.offset + 1
        })

        let data = {
          limit : this.state.limit,
          sortie : '',
          playlist : '',
          by : '',
          direction : ''
        }

        pisteStore.fetch(data, (response) => {
            if(!response){
              this.setState({
                offset : 0
              })
            }else{
              this.setState({
                  data : [...this.state.data, ...response]
              });
            }
        });
    }


    render() {
        return (
            <div className="uk-container uk-section uk-section-small">
                
                <Helmet>
                    <title>afrozik - Morceaux</title>
                </Helmet>

              <section className="uk-padding uk-padding-remove-horizontal uk-text-center" id="titreTop">
                    <h2>Morceaux</h2>
                    {/* <p className="">5 titre(s) dans votre liste</p> */}
                    <div className="uk-child-width-1-3 uk-grid uk-padding uk-padding-remove-vertical" uk-grid="">
                        <div className="uk-first-column">
                            <button className="uk-button uk-button-primary uk-border-rounded"><span uk-icon="icon: play; ratio: 1.5" className="uk-icon"><svg width="30" height="30" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="play"><polygon fill="none" stroke="#000" points="6.5,5 14.5,10 6.5,15"></polygon></svg></span> Lire tout</button>
                        </div>
                        <div>
                            <form>
                                <div className="">
                                    <select className="uk-select uk-border-rounded">
                                        <option>Trier par: Titre</option>
                                        <option>Trier par: Artiste</option>
                                        <option>Trier par: Album</option>
                                        <option>Trier par: Genre</option>
                                        <option>Trier par: Date de sortie</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div>
                            <form className="uk-search uk-search-default uk-width-1-1">
                                <input className="uk-search-input uk-width-1-1 uk-border-rounded" type="search" placeholder="Recherche par titre..." />
                            </form>
                        </div>
                    </div>
                </section>

                <div className="uk-section uk-section-small">                
                    <Piste 
                    data={this.state.data} 
                    pagination={() => this.PaginationPiste()}
                    />
                </div> 

                {/* <div className="uk-section uk-section-small">
                    <h2>Morceaux similaires</h2>
                    <div className="uk-child-width-1-2 uk-margin-bottom" margin="uk-margin-top" uk-grid="true">
                        <Suggest explicite="true" play={true}/>
                        <Suggest play={true}/>
                        <Suggest play={true}/>
                        <Suggest play={true}/>
                        <Suggest play={true}/>
                        <Suggest play={true}/>
                    </div>
                    <button className="uk-button uk-button-afro">Charger plus...</button>
                </div>   */}
            </div>
        );
    }
}

export default singlePage;