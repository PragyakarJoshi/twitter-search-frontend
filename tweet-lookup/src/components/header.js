import React, { Component } from 'react';

class Header extends Component {
    state = {  }
    render() { 
        return (
            <div className="header">
                <img src="twitter-logo.png" className="img-logo" alt="twitter" height="60px"/>
                <h2 className="txt-title">{this.props.title}</h2>
            </div> 
        );
    }
}
 
export default Header;