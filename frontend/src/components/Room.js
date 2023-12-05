import React, { Component } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";
import SearchPage from "./SearchPage"

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      isHost: false,
      showSettings: false,
      hasSearchResults: false,
      spotifyAuthenticated: false,
      song: {},
    };
    this.roomCode = this.props.match.params.roomCode;
    this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
    this.updateShowSettings = this.updateShowSettings.bind(this);
    this.renderSettingsButton = this.renderSettingsButton.bind(this);
    this.renderSettings = this.renderSettings.bind(this);
    this.getRoomDetails = this.getRoomDetails.bind(this);
    this.authenticateSpotify = this.authenticateSpotify.bind(this);
    this.getCurrentSong = this.getCurrentSong.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
    this.getRoomDetails();
  }

  componentDidMount() {
    this.interval = setInterval(this.getCurrentSong, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getRoomDetails() {
    return fetch("/api/get-room" + "?code=" + this.roomCode)
      .then((response) => {
        if (!response.ok) {
          this.props.leaveRoomCallback();
          this.props.history.push("/");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
        if (this.state.isHost) {
          this.authenticateSpotify();
        }
      });
  }

  authenticateSpotify() {
    fetch("/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ spotifyAuthenticated: data.status });
        if (!data.status) {
          fetch("/spotify/get-auth-url")
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      });
  }

  getCurrentSong() {
    fetch("/spotify/current-song")
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      })
      .then((data) => {
        this.setState({ song: data });
      });
  }

  leaveButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then((_response) => {
      this.props.leaveRoomCallback();
      this.props.history.push("/");
    });
  }

  updateShowSettings(value) {
    this.setState({
      showSettings: value,
      hasSearchResults: false
    });
  }

  renderSettings() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateRoomPage
            update={true}
            votesToSkip={this.state.votesToSkip}
            guestCanPause={this.state.guestCanPause}
            roomCode={this.roomCode}
            updateCallback={this.getRoomDetails}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.updateShowSettings(false)}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    );
  }

  renderSettingsButton() {
    return (
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.updateShowSettings(true)}
        >
          Settings
        </Button>
      </Grid>
    );
  }

  getSearchResults(data) {
		this.setState({
			hasSearchResults: data != null
		})
	}

  render() {
    if (this.state.showSettings) {
      return this.renderSettings();
    }
    return (
      <Grid container>
      <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2} style={{ margin: '10px' }}>
        <Grid item xs={6} align="left">
          <Typography variant="h6" component="h4">
            Code: {this.roomCode}
          </Typography>
        </Grid>
        <Grid item xs={6} container direction="column" justifyContent="flex-start" alignItems="flex-end" spacing={2}>
          <Grid item xs={12} align="right">
            {this.state.isHost ? this.renderSettingsButton() : null}
          </Grid>
          <Grid item xs={12} align="right">
            <Button
              variant="contained"
              color="secondary"
              onClick={this.leaveButtonPressed}
            >
              Leave Room
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} align="center">
          <SearchPage pushSearchResults={this.getSearchResults}/>
        </Grid>
        { (!this.state.hasSearchResults) 
          ? 
            <Grid item xs={12} align="center">
              <MusicPlayer {...this.state.song} smallCard={false} />
            </Grid>
          :
            null
        }
        { (this.state.hasSearchResults) 
          ? 
            <Grid item xs={12} align="center">
              <MusicPlayer {...this.state.song} smallCard={true} />
            </Grid>
          :
            null
        }
      </Grid>
      </Grid>
    );
  }
}