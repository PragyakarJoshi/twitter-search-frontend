import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Form extends Component {
    state = { 
        searchTerm: ''
    }

    validate(){

    }
    onFormSubmit = e => {
        e.preventDefault();
        this.props.onFormSubmit(this.state.searchTerm);
    }

    render() { 
        return (
            <div className="input-container">
                <form>
                    <input value={this.state.searchTerm}
                        className="search-box"
                        placeholder="What would you like to search?"  
                        onChange={e => this.setState({ searchTerm: e.target.value})} 
                         />
                    <button onClick={e => this.onFormSubmit(e)} className="btn-submit">
                        <FontAwesomeIcon icon="search" />
                    </button>
                </form>
            </div>
        );
    }
}
 
export default Form;
