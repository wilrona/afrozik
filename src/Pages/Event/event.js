import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import Album from './../../Components/Project/Album';
import { Link } from 'react-router-dom';

import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';


@inject('eventStore')
@observer
class eventPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data : [],
            limit : 10,
            offset : 0
        }
        
    }

    UNSAFE_componentWillMount(){
    
        const { eventStore } = this.props   

        let data = {
            limit : 10,
            artiste :'',
            direction :'ASC',
            by: 'titre_event'
        }

        eventStore.fetch(data, (response) => {
            this.setState({
                data : response
            });
        });

    }

    PaginationEvent = () => {

        const { eventStore } = this.props;
        
        eventStore.initOffset(this.state.offset);

        this.setState({
            offset : this.state.offset + 1
        })

        let data = {
          limit : this.state.limit,
          artiste :'',
            direction :'ASC',
            by: 'titre_event'
        }

        eventStore.fetch(data, (response) => {
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

        console.log(this.state.data)
        
        return (
            <div className="uk-container uk-section uk-section-small">

                <Helmet>
                    <title>afrozik - Evenements</title>
                </Helmet>

                <section className="uk-padding uk-padding-remove-horizontal uk-text-center" id="titreTop">
                    <h2>Evenements</h2>
                    {/* <p className="">20 evenement(s) dans votre liste</p> */}
                    <div className="uk-child-width-1-2 uk-grid uk-padding uk-padding-remove-vertical" uk-grid="">
                        <div>
                            <form>
                                <div className="">
                                    <select className="uk-select uk-border-rounded">
                                        <option>Trier par: Date</option>
                                        <option>Trier par: Lieu</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="">
                            <form className="uk-search uk-search-default uk-width-1-1">
                                <input className="uk-search-input uk-width-1-1 uk-border-rounded" type="search" placeholder="Recherche par nom de lieu. titre..." />
                            </form>
                        </div>
                    </div>
                </section>
                {this.state.data.length > 0 && (
                    <div className="uk-container uk-section uk-section-small">
                        <div className="uk-child-width-1-5 uk-margin-bottom" uk-grid="true" uk-height-match="target: > div  > .match">  

                                {this.state.data.map((data, index) => {
                                    const currentData = toJS(data);
                                    return(
                                        <Album key={index} data={currentData} event={true}/>
                                    )
                                })}
                        
                        </div>
                        <button className="uk-button uk-button-afro" onClick={() => this.PaginationEvent()}>Charger plus...</button>
                    </div>  
                )}             
                             
            </div>
        );
    }
}

export default eventPage;