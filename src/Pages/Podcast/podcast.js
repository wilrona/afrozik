import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import Album from '../../Components/Project/Album';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';


@inject('albumStore')
@observer
class podcastPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data : [],
            offsetData : 0
        }
        
    }
    
    
    UNSAFE_componentWillMount(){
    
        const { albumStore } = this.props   

        let data = {
            limit : 10,
            type: 'podcast',
            genre: '',
            artiste :'',
            direction :'ASC',
            by: 'titre_sortie'
        }

        albumStore.fetch(data, (response) => {
            this.setState({
                data : response
            });
        });

    }

    PaginateData = () => {

        const { albumStore } = this.props

        albumStore.initOffset(this.state.offsetData);

        this.setState({
            offsetData : this.state.offsetData + 1
        })

        let data = {
            limit : 10,
            type: 'podcast',
            genre: '',
            artiste :'',
            direction :'ASC',
            by: 'titre_sortie'
        }

        albumStore.fetch(data, (response) => {

            if(response){

                this.setState({
                    data : [...this.state.data, ...response]
                });
            }
        });

    }


    render() {

        console.log(this.state.data)
        return (
            <div className="uk-container uk-section uk-section-small">

                <Helmet>
                    <title>afrozik - Podcasts</title>
                </Helmet>

                <section className="uk-padding uk-padding-remove-horizontal uk-text-center" id="titreTop">
                    <h2>Podcasts</h2>
                    <p className="">5 podcast(s) dans votre liste</p>
                    <div className="uk-child-width-1-3 uk-grid" uk-grid="">
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
                        <div className="uk-padding uk-padding-remove-vertical">
                            <form className="uk-search uk-search-default uk-width-1-1">
                                <input className="uk-search-input uk-width-1-1 uk-border-rounded" type="search" placeholder="Recherche par nom ou artiste..." />
                            </form>
                        </div>
                    </div>
                </section>

                <div className="uk-section uk-section-small">
                    <div className="uk-child-width-1-5 uk-margin-bottom" uk-grid="true" uk-height-match="target: > div  > .match">
                    {this.state.data.length > 0 && (

            
                        this.state.data.map((data, index) => {
                            const currentData = toJS(data);
                            return(
                                <Album key={index} data={currentData} podcast={true}/>
                            )
                        })


                    )}
                    </div>
                    <button className="uk-button uk-button-afro">Charger plus...</button>
                </div>

                {/* <div className="uk-section uk-section-small">
                    <h2>Podcasts Similaires</h2>
                    <div className="uk-child-width-1-5 uk-margin-bottom" uk-grid="true">
                    <Album />
                    <Album />
                    <Album />
                    <Album />
                    <Album />
                    </div>
                    <button className="uk-button uk-button-afro">Charger plus...</button>
                </div> */}
                             
            </div>
        );
    }
}

export default podcastPage;