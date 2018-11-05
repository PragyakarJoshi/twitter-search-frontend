import React, { Component } from 'react';

class TweetRow extends Component {
    render() { 
        return (  
            <div className="result-box">
                <p className="txt-tweet">{this.props.tweet.tweet}</p>
                <p className="txt-user">by @{this.props.tweet.user}</p>
            </div>
        );
    }
}
 
export default TweetRow;