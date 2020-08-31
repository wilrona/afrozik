import React, { Component } from 'react'
import { toJS } from 'mobx';
// import { inject, observer } from 'mobx-react';

import Unauthorized from './../../Pages/unauthorized';

const Authorization = (WrappedComponent, allowedRoles) => {

  class WithAuthorization extends Component {

    render() {           

      if (allowedRoles.length > 0) {

        const arrayPermission = toJS(this.props.authStore.permission);

        if (arrayPermission.length > 0) {

          if (allowedRoles.some(item => arrayPermission.indexOf(item) !== -1)) {

            return <WrappedComponent {...this.props} />

          } else {

            return <Unauthorized {...this.props}/>

          }

        } else {

          return <div></div>;

        }

      } else {

        return <WrappedComponent {...this.props} />

      }
      
    }
  }

  return WithAuthorization
}

export default Authorization;
