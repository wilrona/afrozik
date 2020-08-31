import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import NavItem from '../Function/navLink';

// import { inject, observer } from 'mobx-react';


class SideBar extends Component {

  render() {

    return (

      <div className="main-sidebar">
        <aside id="sidebar-wrapper">
          <div className="sidebar-brand">
            <Link to="/">Easy Company</Link>
          </div>
          <div className="sidebar-brand sidebar-brand-sm">
            <Link to="/">EC</Link>
          </div>
          <ul className="sidebar-menu">
            <NavItem to='/' label='Tableau de bord' icon='fas fa-tachometer-alt' />            

          </ul>
        </aside>
      </div>

    );
  }
}

export default SideBar;
