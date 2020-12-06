import React from "react";
import {IAPIClient} from "../../usecase/client";
import {Playlist} from "../../domain/playlist";
import {Action} from "../../reducer/reducer";
import {Grid} from "@material-ui/core";
import {Track} from "../../domain/track";
import "./tracksGrid.scss";
import {TrackCard} from "../card/track/normal";

interface TracksGridProps {
  client: IAPIClient;
  playlist: Playlist;
  dispatch: (action: Action) => void;
}

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
      alignItems="flex-start"
      spacing={5}
    >
      {
        tracksList.map((tracks, index) => (
          <div className="playlistDetailCard" key={index}
          >{
            tracks.map((track, index) => (
              <TrackCard
                track={track}
                message="Delete"
                onClickEvent={() => {
                  props.client.deleteTrack(props.playlist, track).then(() => {
                    props.dispatch({type: "deleteTrack", track});
                  });
                }}
                key={index}
              />
            ))
          }</div>
        ))
      }
    </Grid>
  );
};