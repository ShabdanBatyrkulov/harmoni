import React from "react";
import {
    Grid,
    Typography,
    Card,
} from "@material-ui/core";
  

export default function makeSmallCard(song) {
    const min = Math.floor(song.duration_ms / 1000 / 60)
    let sec = Math.floor(song.duration_ms / 1000 % 60)
    if (sec < 10) {
        sec = "0" + sec.toString()
    }
    return (
        <Card className="ExtraSmallSongCard">
            <Grid container alignItems="center" spacing={2} >
                {/* Column 1: Song Image */}
                <Grid item align="center" >
                    <img src={song.image_url} height="70px" width="70px" alt="Album Cover" />
                </Grid>
                {/* Column 2: Title and Artist Name */}
                <Grid item align="left" xs={10}>
                    <Typography component="h5" variant="h5" noWrap>
                        {song.title}
                    </Typography>
                    <Typography color="textSecondary" variant="subtitle1" noWrap>
                        {song.artist}
                    </Typography>
                </Grid>
                {/* Column 3: Duration */}
                <Grid item align="right">
                    <Typography component="h5" variant="h5" noWrap>
                        {min}:{sec}
                    </Typography> 
                </Grid>
            </Grid>
        </Card>
    );
}