import React from "react";
import {Action} from "../../reducer/reducer";
import {Track} from "../../domain/track";
import {SelectedTrackCard} from "../card/track/selected";
import {Grid, Icon, IconButton} from "@material-ui/core";

interface SelectedTracksTabProps {
  dispatch: (action: Action) => void;
  selectedTracks?: Array<Track>;
}

export const SelectedTracksTab = (props: SelectedTracksTabProps): JSX.Element => {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="flex-start"
      spacing={3}
    >
      {
        (props.selectedTracks == null || props.selectedTracks.length == 0) ?
          <p>When you select tracks, show in here</p> : (
            <IconButton onClick={() => props.dispatch({ type: "clearSelected" })}>
              <Icon>clear</Icon>
            </IconButton>
          )
      }
      {
        props.selectedTracks?.map(track =>
          <SelectedTrackCard track={track} dispatch={props.dispatch} key={track.id} />
        )
      }
    </Grid>
  );
}