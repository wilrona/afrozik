import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class SimpleBlock extends Component {
    render() {

        const link = this.props.link;

        

        return (
            <div>
                <Link to={link} className="borderGenre">{this.props.name}</Link>                
            </div>
        );
    }
}

export default SimpleBlock;