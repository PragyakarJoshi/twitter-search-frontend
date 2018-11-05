import React, {Component} from 'react';
import './App.css';
import './css/style.css';
import './css/pagination.css';
import Header from './components/header.js';
import Form from './components/form.js';
import TweetRow from './components/tweetRow.js';
import $ from 'jquery';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faSearch)


class App extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: '',
			errorMessage: '',
			rows: [],
			currentPage: 1,
			itemPerPage: 5,
			res: []
		}
		this.changePage = this.changePage.bind(this);
	}

	changePage(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
    }

	tweetLookup(searchKeyword) {
		console.log("Searching for " + searchKeyword);
		const urlString = "http://127.0.0.1:8888/api/tweets/" + searchKeyword;
		$.ajax({
			url: urlString,
			success: (searchResults) => {
				// console.log(JSON.parse(searchResults));
				const results = JSON.parse(searchResults).tweetList;
				console.log(results);
				let tweetRows = [];

				results.forEach((tweet) => {
					const tweetRow = <TweetRow tweet={tweet} />
					tweetRows.push(tweetRow);
				})
				this.setState({
					rows: tweetRows,
				})
			},
			error: (xhr, status, err) => {
				console.error("failed to get data");
			}
		})
	}

	validate(key) {
		let validity = true;
		if (key === '') {
			validity = false;
		}
		return validity;
	}

	onFormSubmit(searchKeyword) {
		let keyw = searchKeyword;
		this.setState({
			searchTerm: keyw
		});
		const valid = this.validate(keyw);
		if (valid) {
			this.setState({
				errorMessage: ''
			});
			this.tweetLookup(keyw);
		} else {
			this.setState({
				errorMessage: 'Enter some keywords first.'
			});
			console.log("Keywords Required");
		}
	}

	render() {
		const {rows, currentPage, itemPerPage} = this.state;
        
        const indexOfLastItem = currentPage * itemPerPage;
        const indexOfFirstItem = indexOfLastItem - itemPerPage;
        const currentTweets = rows.slice(indexOfFirstItem, indexOfLastItem);
        const renderRow = currentTweets.map((row, index) => {
            return <div key={index}>{row}</div>;
		}); 

		const pageNumbers = []
        for (let i = 1; i <= Math.ceil(rows.length / itemPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li key={number} id={number} onClick={this.changePage}>{number}</li>
            );
        });
		
		return ( 
			<div className = "App" >
				<Header title = "Tweet Lookup" / >
				<Form onFormSubmit = {searchKeyword => this.onFormSubmit(searchKeyword)} /> 
				<p className = "error-txt" > {this.state.errorMessage} </p> 
				<div className = "results-container"> 			
					{renderRow}					
					<ul className="page-number-box">
						{renderPageNumbers}
					</ul>
					
				</div> 
			</div>
		);
	}
}

export default App;