import React from "react";
import {IAPIClient} from "../../usecase/client";
import {Playlist} from "../../domain/playlist";
import {Action} from "../../reducer/reducer";
import {Button, Card, CardActions, CardContent, Grid, Typography} from "@material-ui/core";
import {Track} from "../../domain/track";

interface TrackCardProps {
  client: IAPIClient;
  dispatch: (action: Action) => void;
  track: Track;
  playlist: Playlist;
}

interface TracksGridProps {
  client: IAPIClient;
  playlist: Playlist;
  dispatch: (action: Action) => void;
}

const TrackCard = (props: TrackCardProps): JSX.Element => {
  console.log(props.track);
  return (
    <Card key={props.track.id}>
      <CardContent>
        <Typography variant="h5" component="h4">{props.track.name}</Typography>
        <Typography variant="h6" component="p">Artist {props.track.artistName}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            props.client.deleteTrack(props.playlist, props.track).then(() => {
              props.dispatch({ type: "deleteTrack", track: props.track });
            });
          }}
        >Delete</Button>
      </CardActions>
    </Card>
  );
};

export const TracksGrid = (props: TracksGridProps): JSX.Element => {
  const tracksList: Array<Array<Track>> = [];
  props.playlist.tracks.forEach((track, index) => {
    if (index % 3 == 0) tracksList.push([]);
    tracksList[Math.floor(index / 3)].push(track);
  });
  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="center"
    >
      {
        tracksList.map((tracks, index) => (
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
            key={index}
          >{
            tracks.map((track, index) => (
              <TrackCard
                client={props.client}
                dispatch={props.dispatch}
                track={track}
                playlist={props.playlist}
                key={index}
              />
            ))
          }</Grid>
        ))
      }
    </Grid>
  );
};