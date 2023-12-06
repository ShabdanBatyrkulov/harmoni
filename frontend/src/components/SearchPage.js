import { TimerSharp } from "@material-ui/icons";
import React, { Component } from "react";
import SearchBar from "./SearchBar"
import makeSmallCard from "./SongCard"
import {
    Grid
} from "@material-ui/core";
  
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
			<Grid container align="center" spacing={1} style={{
				'max-height': '400px',
				'overflow-y': 'scroll',
				'justify-content': 'space-evenly',
				'align-content': "flex-start",
			}}>
				{songs}
			</Grid>	
		);
	}

	render() {
		return (
			<Grid container justifyContent="center" spacing={2}>
				{<SearchBar pushSearchResults = {this.getSearchResults}/>}
				{this.state.hasSearchResults ? this.renderResults() : null}
			</Grid>
		);
	}
}