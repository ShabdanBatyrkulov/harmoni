import React, { Component } from "react";
import SearchBar from "./SearchBar"

export default class SearchPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults: null,
		}
		this.getSearchResults = this.getSearchResults.bind(this);
		this.renderResults = this.renderResults.bind(this);
	}

	getSearchResults(data) {
		this.setState({
			searchResults: data,
		})
	}

	renderResults() {
		const songs = [];
		this.state.searchResults.forEach((item) => songs.push(<h5>{item.title}</h5>))
		return (
			songs
		);
	}

	render() {
		return (
			<div>
				{<SearchBar pushSearchResults = {this.getSearchResults}/>}
				{this.state.searchResults != null ? this.renderResults() : null}
			</div>
		);
	}
}