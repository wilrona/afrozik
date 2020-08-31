import React, { useEffect } from 'react';
// import { inject, observer } from 'mobx-react';
import { Route } from 'react-router-dom'


import NavBar from '../Components/Layout/header';
import NavLeft from '../Components/Layout/navLeft';
import Player from '../Components/Project/Player';

const Layout = ({component : Component, ...rest}) =>  {

  return (

    <Route {...rest} render= { matchProps => (      

        <div className="uk-width-expand" uk-height-viewport="offset-top: true">                

            <section className="uk-margin-large-bottom">
                <Component {...matchProps} />
            </section>

        </div>             

    )} />


  );
}


export default Layout;
