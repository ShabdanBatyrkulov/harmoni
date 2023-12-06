import React from "react";
import {
    Grid,
    Typography,
    Card,
    CardMedia,
    IconButton,
} from "@material-ui/core";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

export default function makeSmallCard(song) {
    const handleAddToQueuePressed = (song) => {
        const uri = "spotify:track:" + song.id;
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({'uri': uri})
        };
        fetch("/spotify/add-user-queue", requestOptions)
    };
    const min = Math.floor(song.duration_ms / 1000 / 60)
    let sec = Math.floor(song.duration_ms / 1000 % 60)
    if (sec < 10) {
        sec = "0" + sec.toString()
    }
    return (
        <Grid className="SongHover" item align="center" xs={11}>
            <Grid container alignItems="center" spacing={1} >
                {/* Column 1: Song Image */}
                <Grid item align="center" >
                    <img src={song.image_url} alt="Album Cover" />
                </Grid>
                {/* Column 2: Title and Artist Name */}
                <Grid item align="left" xs={9}>
                    <Typography component="h5" variant="h5" noWrap>
                        {song.title}
                    </Typography>
                    <Typography color="textSecondary" variant="subtitle1" noWrap>
                        {song.artist}
                    </Typography>
                </Grid>
                {/* Colum 3: add to queue button */}
                <Grid item align="center">
                    <IconButton onClick={() => handleAddToQueuePressed(song)}>
                        <PlaylistAddIcon />
                    </IconButton>
                </Grid>
                {/* Column 4: Duration */}
                <Grid item align="right">
                    <Typography component="h5" variant="h5">
                        {min}:{sec}
                    </Typography> 
                </Grid>
            </Grid>
        </Grid>
    );
}