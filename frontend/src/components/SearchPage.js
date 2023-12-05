import { TimerSharp } from "@material-ui/icons";
import React, { Component } from "react";
import SearchBar from "./SearchBar"
import makeSmallCard from "./SongCard"

export default class SearchPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults: null,
			hasSearchResults: false,
		}
		this.getSearchResults = this.getSearchResults.bind(this);
		this.renderResults = this.renderResults.bind(this);
	}

	getSearchResults(data) {
		this.setState({
			hasSearchResults: data != null,
			searchResults: data,
		})
		this.props.pushSearchResults(data);
	}

	renderResults() {
		const songs = [];
		this.state.searchResults.forEach((item) => songs.push(makeSmallCard(item)))
		return (
			<div style={{'height': '450px', 'overflow-y': 'scroll'}}>
				{songs}
			</div>
		);
	}

	render() {
		return (
			<div>
				{<SearchBar pushSearchResults = {this.getSearchResults}/>}
				{this.state.hasSearchResults ? this.renderResults() : null}
			</div>
		);
	}
}