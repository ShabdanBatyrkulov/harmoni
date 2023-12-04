import React, { Component } from "react";

export default class SearchPage extends Component {
	constructor(props) {
		super(props);
	 	this.state = {
		    searchSong: "",
		    searchResults: null,
	    };
	    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);  
	    this.searchSongButtonPressed = this.searchSongButtonPressed.bind(this);
	}

	searchSongButtonPressed() {
		if (this.state.searchSong != "") {
			const requestOptions = {
				method: "GET",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					song_name: this.state.searchSong,
				}),
		    };
		    fetch("/spotify/search-song", requestOptions)
				.then((response) => response.json())
				.then((data) => {
					this.setState({
						searchResults: data
					})
				})
		}
	}

	handleTextFieldChange(e) {
		this.setState({
	     	searchSong: e.target.value,
	    });
	}

	renderSearchBar() {
		return (
			<Grid container spacing={1}>
				<Grid item xs={12} align="center">
		          <TextField fillWidth
		            label="Song"
		            placeholder="Enter a song name"
		            value={this.state.searchSong}	
		            variant="standard"
		            onChange={this.handleTextFieldChange}
		          />
		        </Grid>
		        <Grid item xs={12} align="center">
		          <Button
		            variant="contained"
		            color="primary"
		            onClick={this.searchSongButtonPressed}
		          >
		            Search
		          </Button>
		        </Grid>
			</Grid>
		);
	}
	renderResults() {
		
		results = []
		for song in this.state.searchResults:
			results.push(
				<ListItem>

				</ListItem>
			)
		return (
			<Grid item xs={12} md={6}>
				<List>
					{results}
				</List>
			</Grid>
		);
	}

	render() {
		return (
			<div>
				{this.renderSearchBar()}
				{this.state.searchResults != null ? renderResults() : null}
			</div>
		);
	}
}