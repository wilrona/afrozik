/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from 'react'


class Footer extends Component {

  render() {
    return (

      <footer className="main-footer">
        <div className="footer-left">
          Copyright &copy; {new Date().getFullYear()} <div className="bullet"></div> Design By <a href="https://aligodu.cm" target="_blank">Aligodu</a>
        </div>
        <div className="footer-right">
          2.3.0
          </div>
      </footer>

    );
  }
}

export default Footer