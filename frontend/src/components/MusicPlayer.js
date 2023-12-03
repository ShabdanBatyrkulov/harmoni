import React, { Component } from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";

export default class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.renderSongCard = this.renderSongCard.bind(this);
    this.renderNoSongCard = this.renderNoSongCard.bind(this);
  }

  skipSong() {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    };
    fetch('/spotify/skip', requestOptions)
  }

  pauseSong() {
    const requestOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
    };
    fetch('/spotify/pause', requestOptions)
  }

  playSong() {
    const requestOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
    };
    fetch('/spotify/play', requestOptions)
  }

  renderNoSongCard() {
    return (
      <Card align="center">
        <Grid container alignItems="center" justifyContent="center" xs={8}>
          <Grid item align="center" xs="auto">
            <Typography component="h5" variant="h5">
              No song in progress!
            </Typography>
          </Grid>
          <Grid item align="center" xs="auto">
            <Typography component="body2" variant="body2">
              Play a song using host's Spotify account!
            </Typography>
          </Grid>
        </Grid>
      </Card>
    );
  }

  renderSongCard() {
    const songProgress = (this.props.time / this.props.duration) * 100;
    return (
      <Card>
        <Grid container alignItems="center">
          <Grid item align="center" xs={4}>
            <img src={this.props.image_url} height="100%" width="100%" />
          </Grid>
          <Grid item align="center" xs={8}>
            <Typography component="h5" variant="h5">
              {this.props.title}
            </Typography>
            <Typography color="textSecondary" variant="subtitle1">
              {this.props.artist}
            </Typography>
            <div>
              <IconButton onClick={ () => this.props.is_playing ? this.pauseSong() : this.playSong() }>
                {this.props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton onClick={ () => this.skipSong() }>
                {this.props.votes} / {this.props.votes_required}
                <SkipNextIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <LinearProgress variant="determinate" value={songProgress} />
      </Card>
    );
  }

  render() {
    return (
      this.props.title !== undefined ? this.renderSongCard() : this.renderNoSongCard()
    );
  }
}