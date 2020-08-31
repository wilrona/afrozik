import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

import NavBar from './../../Components/Layout/header.js';
// import { inject, observer } from 'mobx-react';

import FacebookLogin from 'react-facebook-login';

import GoogleLogin from 'react-google-login';

import FormikLogin from './loginForm.js';
import { inject, observer } from 'mobx-react';


@inject('authStore')
@observer
class Login extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
    }
   
    UNSAFE_componentWillMount() {
        if (this.props.authStore.isAuth) {
          this.props.history.replace('/home');
        }
    }

    render() {

        const responseFacebook = (response) => {
            console.log(response);
        }
    
        const responseGoogle = (response) => {
            console.log(response);
        }

        if (this.props.authStore.isAuth) {
            setTimeout(() => {
                this.props.history.replace('/home');
            }, 1000);
        }

        return (           
            

            <div>

                <Helmet>
                    <title>Afrozikbox - Login</title>
                </Helmet>

                {/* <NavBar /> */}

                <div className="uk-section uk-flex uk-flex-center" uk-height-viewport="offset-top :true">
                    
                    <div className="uk-width-2-5">
                        <h1 className="uk-text-center">Connexion</h1>
                        <hr />
                        {/* <div className="uk-child-width-1-1 uk-grid-divider" uk-grid="true">

                            <div className='uk-flex uk-flex-center'>
                                <FacebookLogin
                                    appId="" //APP ID NOT CREATED YET
                                    fields="name,email,picture"
                                    callback={responseFacebook}
                                    textButton="CONNEXION FACEBOOK"
                                    size="small"
                                />
                            </div>

                            <div className=' uk-flex uk-flex-center uk-margin-medium-top'>
                                <GoogleLogin
                                    clientId="" //CLIENTID NOT CREATED YET
                                    buttonText="CONNEXION AVEC GOOGLE"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                />
                            </div> 
                        </div>
                        <hr className="uk-divider-icon" /> */}
                        <div className="uk-grid-divider uk-margin-remove-top uk-flex uk-flex-center" uk-grid="true">

                            <div className="uk-width-4-5">
                                
                                <FormikLogin />
                                
                            </div>                 


                        </div>
                    </div>

                </div>

            </div>
        )

    }

}

export default Login;