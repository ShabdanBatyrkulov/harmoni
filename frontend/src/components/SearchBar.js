import React, { Component, useTheme } from "react";
import {
  Grid,
  IconButton,
  Input,
  InputAdornment
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

export default class SearchBar extends Component {
  constructor(props) {
        super(props);
        this.state = { // warning: can overwrite pushSearchResults
            searchField: ""
        }
        this.renderSearchBar = this.renderSearchBar.bind(this);
        this.searchButtonPressed = this.searchButtonPressed.bind(this);
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
  }

  searchButtonPressed() {
    if (this.state.searchField != "") {
        fetch("/spotify/search-song" + "?song_name=" + this.state.searchField)
            .then((response) => {
                if (!response.ok) {
                    return {};
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                this.props.pushSearchResults(data);
            });   
    }
  }

  handleTextFieldChange(e) {
    this.setState({
        searchField: e.target.value,
    });
  }

  renderSearchBar() {
    return (
      <Grid container justifyContent="center" style={{ minHeight: '30vh', padding: '0, 20px' }}>
        {/* Search Bar */}
        <Grid item align="center">
          <Input
            placeholder="Search"
            startAdornment={
              <InputAdornment position="start">
                <IconButton onClick={() => this.searchButtonPressed()}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            style={{ width: '80%', maxWidth: '1000px', fontSize: '25px' }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                this.searchButtonPressed();
              }
            }}
            onChange={this.handleTextFieldChange}
          />
        </Grid>
      </Grid>
    );
  }

  render() {
    return this.renderSearchBar();
  }
}